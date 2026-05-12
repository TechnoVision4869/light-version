import os
import sys
from collections import Counter

BYTES_IN_MB = 1024 * 1024


def analyze_directory(root_path):
    file_sizes_bytes = []

    for dirpath, dirnames, filenames in os.walk(root_path):
        for filename in filenames:
            file_path = os.path.join(dirpath, filename)
            try:
                size = os.path.getsize(file_path)
                file_sizes_bytes.append(size)
            except (OSError, PermissionError):
                continue

    if not file_sizes_bytes:
        return None

    min_size = min(file_sizes_bytes)
    max_size = max(file_sizes_bytes)
    avg_size = sum(file_sizes_bytes) / len(file_sizes_bytes)

    size_counts = Counter(file_sizes_bytes)
    mode_size, mode_count = size_counts.most_common(1)[0]

    # Convert to MB
    return {
        "file_count": len(file_sizes_bytes),
        "min_mb": min_size / BYTES_IN_MB,
        "max_mb": max_size / BYTES_IN_MB,
        "avg_mb": avg_size / BYTES_IN_MB,
        "mode_mb": mode_size / BYTES_IN_MB,
        "mode_count": mode_count
    }


def main():
    if len(sys.argv) != 2:
        print("Usage: python analyze_dir.py <directory_path>")
        sys.exit(1)

    directory = sys.argv[1]

    if not os.path.isdir(directory):
        print(f"Error: '{directory}' is not a valid directory")
        sys.exit(1)

    stats = analyze_directory(directory)

    if stats is None:
        print("No files found.")
        return

    print(f"Directory: {directory}")
    print(f"Files analyzed: {stats['file_count']}")
    print(f"Min size: {stats['min_mb']:.2f} MB")
    print(f"Max size: {stats['max_mb']:.2f} MB")
    print(f"Average size: {stats['avg_mb']:.2f} MB")
    print(
        f"Most frequent size (mode): {stats['mode_mb']:.2f} MB "
        f"(appears {stats['mode_count']} times)"
    )


if __name__ == "__main__":
    main()
