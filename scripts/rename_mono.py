import os
import re

pattern = re.compile(r'^Mono_(.+)\.\d{4}(\.[^.]+)$', re.IGNORECASE)

directory = os.path.join(os.path.dirname(__file__), "Balcony")
print(f"Scanning: {os.path.abspath(directory)}\n")

for root, dirs, files in os.walk(directory):
    for filename in files:
        match = pattern.match(filename)
        if match:
            new_name = match.group(1) + match.group(2)
            old_path = os.path.join(root, filename)
            new_path = os.path.join(root, new_name)
            if os.path.exists(new_path):
                print(f"SKIP (target exists): {filename} -> {new_name}")
            else:
                os.rename(old_path, new_path)
                print(f"Renamed: {filename} -> {new_name}")

print("\nDone.")
