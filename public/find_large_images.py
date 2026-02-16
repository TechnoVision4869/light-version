import os
import sys
from pathlib import Path

def find_large_images(directory='.', max_size_mb=1):
    """
    Traverse directory and find image files larger than max_size_mb.
    
    Args:
        directory: Root directory to search (default: current directory)
        max_size_mb: Size threshold in megabytes (default: 1 MB)
    
    Returns:
        List of paths to large image files
    """
    # Common image extensions (case-insensitive)
    image_extensions = {
        '.jpg', '.jpeg', '.png', '.gif', '.bmp', 
        '.webp', '.tiff', '.tif', '.svg', '.ico'
    }
    
    max_size_bytes = max_size_mb * 1024 * 1024
    large_images = []
    
    try:
        root = Path(directory).resolve(strict=True)
    except FileNotFoundError:
        print(f"Error: Directory '{directory}' not found.", file=sys.stderr)
        return large_images
    
    print(f"Searching for images > {max_size_mb} MB in: {root}\n")
    
    try:
        for path in root.rglob('*'):
            if path.is_file():
                # Check extension first (fast filter)
                if path.suffix.lower() in image_extensions:
                    try:
                        size = path.stat().st_size
                        if size > max_size_bytes:
                            large_images.append((path, size))
                    except (PermissionError, OSError) as e:
                        print(f"Warning: Could not read {path}: {e}", file=sys.stderr)
    except PermissionError as e:
        print(f"Error: Permission denied accessing {root}: {e}", file=sys.stderr)
    
    return large_images

def main():
    # Get directory from command-line argument or use current directory
    search_dir = sys.argv[1] if len(sys.argv) > 1 else '.'
    
    results = find_large_images(search_dir)
    
    if results:
        print(f"Found {len(results)} image(s) larger than 1 MB:\n")
        for path, size in sorted(results, key=lambda x: x[1], reverse=True):
            size_mb = size / 1024 / 1024
            print(f"{size_mb:.2f} MB - {path}")
        print(f"\nTotal: {len(results)} large image(s) found")
    else:
        print("No images larger than 1 MB found.")
    
    return 0 if results else 1  # Exit code: 0 if found, 1 if none found

if __name__ == "__main__":
    sys.exit(main())