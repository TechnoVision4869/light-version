import os

def rename_images_to_lowercase(directory):
    image_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg', '.tiff', '.ico'}
    
    for root, dirs, files in os.walk(directory):
        for filename in files:
            ext = os.path.splitext(filename)[1].lower()
            if ext in image_extensions:
                new_name = filename.lower()
                if new_name != filename:
                    old_path = os.path.join(root, filename)
                    new_path = os.path.join(root, new_name)
                    os.rename(old_path, new_path)
                    print(f"Renamed: {old_path} -> {new_name}")

if __name__ == "__main__":
    import sys
    directory = sys.argv[1] if len(sys.argv) > 1 else "."
    rename_images_to_lowercase(directory)
    print("Done.")