"""
Image Statistics Scanner
Usage: python image_stats.py [directory] [--pixel-stats]
  directory     Path to scan (default: current directory)
  --pixel-stats  Also compute per-channel pixel value statistics (slower)
"""

import os
import sys
import statistics
from pathlib import Path

IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp", ".tiff", ".tif", ".avif"}


def collect_image_files(root_dir):
    files = []
    for dirpath, _, filenames in os.walk(root_dir):
        for name in filenames:
            if Path(name).suffix.lower() in IMAGE_EXTENSIONS:
                files.append(Path(dirpath) / name)
    return files


def print_stats(label, values, unit=""):
    if not values:
        print(f"  {label}: no data")
        return
    mn = min(values)
    mx = max(values)
    avg = statistics.mean(values)
    med = statistics.median(values)
    print(f"  {label}:")
    print(f"    Min:    {mn:.2f}{unit}")
    print(f"    Max:    {mx:.2f}{unit}")
    print(f"    Mean:   {avg:.2f}{unit}")
    print(f"    Median: {med:.2f}{unit}")


def format_bytes(b):
    for unit in ("B", "KB", "MB", "GB"):
        if b < 1024:
            return f"{b:.2f} {unit}"
        b /= 1024
    return f"{b:.2f} TB"


def main():
    args = sys.argv[1:]
    pixel_stats = "--pixel-stats" in args
    dirs = [a for a in args if not a.startswith("--")]

    scan_dir = dirs[0] if dirs else "."
    scan_dir = Path(scan_dir).resolve()

    if not scan_dir.is_dir():
        print(f"Error: '{scan_dir}' is not a valid directory.")
        sys.exit(1)

    print(f"\nScanning: {scan_dir}\n")
    files = collect_image_files(scan_dir)

    if not files:
        print("No image files found.")
        sys.exit(0)

    print(f"Found {len(files)} image(s)\n")

    # ── File size stats ────────────────────────────────────────────────────────
    sizes_bytes = [f.stat().st_size for f in files]
    sizes_mb = [s / (1024 * 1024) for s in sizes_bytes]

    print("=" * 50)
    print("FILE SIZES")
    print("=" * 50)
    for f, s in zip(files, sizes_mb):
        print(f"  {s:8.3f} MB  {f}")

    print()
    print(f"  Min:    {min(sizes_mb):.3f} MB")
    print(f"  Max:    {max(sizes_mb):.3f} MB")
    print(f"  Mean:   {statistics.mean(sizes_mb):.3f} MB")
    print(f"  Median: {statistics.median(sizes_mb):.3f} MB")
    total = sum(sizes_bytes)
    print(f"  Total:  {format_bytes(total)}")

    # ── Dimension stats ────────────────────────────────────────────────────────
    try:
        from PIL import Image as PILImage

        widths, heights, mpx = [], [], []
        failed = []

        for f in files:
            try:
                with PILImage.open(f) as img:
                    w, h = img.size
                    widths.append(w)
                    heights.append(h)
                    mpx.append((w * h) / 1_000_000)
            except Exception:
                failed.append(f)

        print("\n" + "=" * 50)
        print("DIMENSION STATISTICS")
        print("=" * 50)
        print(f"  Width  (px):  Min={min(widths)}  Max={max(widths)}")
        print(f"  Height (px):  Min={min(heights)}  Max={max(heights)}")

        if failed:
            print(f"\n  Could not read {len(failed)} file(s).")

        # ── Pixel value stats (optional) ───────────────────────────────────────
        if pixel_stats:
            import numpy as np

            r_means, g_means, b_means, brightness = [], [], [], []

            print("\n" + "=" * 50)
            print("PIXEL VALUE STATISTICS  (0–255)")
            print("=" * 50)

            for f in files:
                try:
                    with PILImage.open(f) as img:
                        arr = np.array(img.convert("RGB"), dtype=float)
                        r_means.append(arr[:, :, 0].mean())
                        g_means.append(arr[:, :, 1].mean())
                        b_means.append(arr[:, :, 2].mean())
                        brightness.append(arr.mean())
                except Exception:
                    pass

            print_stats("Red channel mean  ", r_means)
            print_stats("Green channel mean", g_means)
            print_stats("Blue channel mean ", b_means)
            print_stats("Overall brightness", brightness)

    except ImportError:
        print("\n  (Install Pillow for dimension/pixel stats:  pip install Pillow)")

    # ── Per-extension breakdown ────────────────────────────────────────────────
    print("\n" + "=" * 50)
    print("BREAKDOWN BY EXTENSION")
    print("=" * 50)
    ext_map: dict[str, list] = {}
    for f, s in zip(files, sizes_mb):
        ext = f.suffix.lower()
        ext_map.setdefault(ext, []).append(s)

    for ext, sizes in sorted(ext_map.items(), key=lambda x: -len(x[1])):
        avg = statistics.mean(sizes)
        print(f"  {ext:8s}  count={len(sizes):4d}  avg size={avg:8.3f} MB")

    print()


if __name__ == "__main__":
    main()
