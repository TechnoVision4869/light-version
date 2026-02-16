import cv2
import os

BASE_DIR = "./kog/videos/zones"           # directory to search
OUTPUT_DIR = "./kog/thumbnails/zones"  # directory to save frames

os.makedirs(OUTPUT_DIR, exist_ok=True)

expected_videos = {f"zone{i}_gen_idle.mp4" for i in range(1, 13)}

for root, _, files in os.walk(BASE_DIR):
    for file in files:
        if file in expected_videos:
            video_path = os.path.join(root, file)

            cap = cv2.VideoCapture(video_path)
            if not cap.isOpened():
                print(f"❌ Failed to open {video_path}")
                continue

            # Seek to 1 second (1000 ms)
            cap.set(cv2.CAP_PROP_POS_MSEC, 500)

            success, frame = cap.read()
            cap.release()

            if not success:
                print(f"⚠️ Failed to read frame at 0.5s from {video_path}")
                continue

            # Unique filename (all saved into one output directory)
            safe_folder = os.path.relpath(root, BASE_DIR).replace(os.sep, "_")
            zone_name = file.split("_")[0]
            output_path = os.path.join(OUTPUT_DIR, f"{zone_name}.png")

            cv2.imwrite(output_path, frame)
            print(f"✅ Saved: {output_path}")
