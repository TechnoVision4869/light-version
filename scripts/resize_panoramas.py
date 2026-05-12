from PIL import Image
import os

MAX_WIDTH = 4096
MAX_HEIGHT = 2048

def resize_panoramas(root_dir):
    for dirpath, _, files in os.walk(root_dir):
        for fname in files:
            if fname.lower().endswith(('.jpg', '.jpeg', '.png')):
                fpath = os.path.join(dirpath, fname)
                with Image.open(fpath) as img:
                    w, h = img.size
                    if w > MAX_WIDTH or h > MAX_HEIGHT:
                        new_size = (MAX_WIDTH, MAX_HEIGHT)
                        print(f"Resizing {fpath}: {w}x{h} → {new_size[0]}x{new_size[1]}")
                        resized = img.resize(new_size, Image.LANCZOS)
                        # Save as JPEG (convert PNG panoramas too)
                        out_path = os.path.splitext(fpath)[0] + ".jpg"
                        resized.save(out_path, "JPEG", quality=85, optimize=True)
                        if fname.lower().endswith('.png') and out_path != fpath:
                            os.remove(fpath)  # remove original PNG
                    else:
                        print(f"OK {fpath}: {w}x{h}")

resize_panoramas("./panorama")  # adjust path to your panorama folder