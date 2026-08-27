#!/usr/bin/env python3
"""
PNG to JPEG Panorama Converter
Converts PNG images to JPEG format with quality optimization targeting 2-3 MB
"""

import os
from PIL import Image
import sys

def convert_png_to_jpeg(input_file, output_file, target_size_mb=2.5, quality_start=92):
    """
    Convert PNG to JPEG with quality optimization to hit target file size.
    
    Args:
        input_file: Path to input PNG
        output_file: Path to output JPEG
        target_size_mb: Target file size in MB (default 2.5)
        quality_start: Starting quality level (default 92 for high quality)
    """
    try:
        # Open the PNG image
        img = Image.open(input_file)
        
        # Convert RGBA to RGB if needed (remove alpha channel)
        if img.mode == 'RGBA' or img.mode == 'LA' or img.mode == 'P':
            background = Image.new('RGB', img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = background
        elif img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Binary search for optimal quality
        quality = quality_start
        target_bytes = target_size_mb * 1024 * 1024
        
        # First pass: find approximate quality (descending from high quality)
        for q in range(quality_start, 60, -2):
            img.save(output_file, 'JPEG', quality=q, optimize=True)
            file_size = os.path.getsize(output_file)
            
            if file_size <= target_bytes:
                quality = q
                break
        
        # Fine-tune within ±2 quality points for precision
        for q in range(quality + 2, quality - 3, -1):
            img.save(output_file, 'JPEG', quality=q, optimize=True)
            file_size = os.path.getsize(output_file)
            
            if file_size <= target_bytes:
                quality = q
                break
        
        # Final save with optimized quality
        img.save(output_file, 'JPEG', quality=quality, optimize=True)
        file_size = os.path.getsize(output_file)
        file_size_mb = file_size / (1024 * 1024)
        
        print(f"✓ {os.path.basename(input_file)} → {os.path.basename(output_file)}")
        print(f"  Quality: {quality} | Size: {file_size_mb:.2f} MB")
        return True
        
    except Exception as e:
        print(f"✗ Error converting {input_file}: {str(e)}")
        return False


def main():
    """Main conversion function"""
    
    # Get current directory
    current_dir = os.getcwd()
    
    # Find all PNG files
    png_files = [f for f in os.listdir(current_dir) if f.lower().endswith('.png')]
    
    if not png_files:
        print("❌ No PNG files found in current directory!")
        print(f"Current directory: {current_dir}")
        sys.exit(1)
    
    print(f"Found {len(png_files)} PNG file(s) to convert")
    print(f"Working directory: {current_dir}")
    print("-" * 60)
    
    # Create output folder
    output_dir = os.path.join(current_dir, 'converted_jpegs')
    os.makedirs(output_dir, exist_ok=True)
    
    # Convert each PNG
    successful = 0
    for png_file in png_files:
        input_path = os.path.join(current_dir, png_file)
        output_filename = os.path.splitext(png_file)[0] + '.jpg'
        output_path = os.path.join(output_dir, output_filename)
        
        if convert_png_to_jpeg(input_path, output_path):
            successful += 1
    
    print("-" * 60)
    print(f"✓ Successfully converted {successful}/{len(png_files)} files")
    print(f"Output folder: {output_dir}")
    print("\nDone! Your JPEG files are ready.")


if __name__ == '__main__':
    main()
