#!/usr/bin/env python3
"""
Resize images to exact dimensions, ignoring aspect ratio (stretching allowed).

Usage:
    python resize_image.py <input> <width> <height> [output]
    python resize_image.py <input_dir> <width> <height> [output_dir]

Examples:
    python resize_image.py image.jpg 8192 4096
    python resize_image.py image.jpg 8192 4096 resized.jpg
    python resize_image.py ./images 1920 1080 ./resized
"""

import sys
import os
from pathlib import Path
from PIL import Image

SUPPORTED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tiff", ".tif"}


def resize_image(input_path: Path, width: int, height: int, output_path: Path) -> None:
    with Image.open(input_path) as img:
        resized = img.resize((width, height), Image.LANCZOS)
        output_path.parent.mkdir(parents=True, exist_ok=True)
        resized.save(output_path)
        print(f"  {input_path.name}: {img.size[0]}x{img.size[1]} -> {width}x{height}  =>  {output_path}")


def main():
    if len(sys.argv) < 4:
        print(__doc__)
        sys.exit(1)

    input_path = Path(sys.argv[1])
    width = int(sys.argv[2])
    height = int(sys.argv[3])

    if input_path.is_dir():
        output_dir = Path(sys.argv[4]) if len(sys.argv) > 4 else input_path / "resized"
        images = [f for f in input_path.iterdir() if f.suffix.lower() in SUPPORTED_EXTENSIONS]
        if not images:
            print(f"No supported images found in {input_path}")
            sys.exit(1)
        print(f"Resizing {len(images)} image(s) to {width}x{height} -> {output_dir}\n")
        for img_path in sorted(images):
            resize_image(img_path, width, height, output_dir / img_path.name)
    elif input_path.is_file():
        if input_path.suffix.lower() not in SUPPORTED_EXTENSIONS:
            print(f"Unsupported file type: {input_path.suffix}")
            sys.exit(1)
        if len(sys.argv) > 4:
            output_path = Path(sys.argv[4])
        else:
            output_path = input_path.with_stem(input_path.stem + f"_{width}x{height}")
        resize_image(input_path, width, height, output_path)
    else:
        print(f"Input not found: {input_path}")
        sys.exit(1)


if __name__ == "__main__":
    main()
