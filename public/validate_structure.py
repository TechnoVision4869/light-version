import os
import re
import sys
from pathlib import Path

# ====== CONFIGURATION ======
DELETE_DOT_UNDERSCORE_FILES = True  # Set to True to auto-delete ._ files
IGNORED_FOLDERS = {"highlight"}     # Folders to skip during validation (must be lowercase)
# ==========================

def log_error(path, msg):
    errors.append(f"[ERROR] {path}: {msg}")

def is_ignored_file(name: str) -> bool:
    return name.startswith("._")

def is_ignored_folder(name: str) -> bool:
    return name.lower() in IGNORED_FOLDERS

def delete_file_safely(filepath: Path):
    try:
        filepath.unlink()
        print(f"[DELETED] {filepath}")
    except Exception as e:
        print(f"[FAILED TO DELETE] {filepath}: {e}")

def collect_files_and_dirs(folder: Path):
    files = []
    dirs = []
    if not folder.exists():
        return files, dirs
    for item in folder.iterdir():
        if item.is_file():
            if is_ignored_file(item.name):
                if DELETE_DOT_UNDERSCORE_FILES:
                    delete_file_safely(item)
                continue
            files.append(item)
        else:
            # Do NOT skip here — we still want to clean ._ files inside highlight
            dirs.append(item)
    return files, dirs

def is_lowercase_no_spaces(name):
    return name == name.lower() and ' ' not in name

def check_folder_case_and_spaces(folder: Path):
    for root, dirs, files_in_walk in os.walk(folder):
        root_path = Path(root)
        # Skip case-checking inside ignored folders
        rel_root = root_path.relative_to(folder)
        if any(part.lower() in IGNORED_FOLDERS for part in rel_root.parts):
            continue
        if not is_lowercase_no_spaces(root_path.name):
            log_error(root_path, "Folder name must be lowercase with no spaces")
        for d in dirs:
            if not is_lowercase_no_spaces(d):
                full_dir = root_path / d
                # Check if this dir is inside an ignored path
                try:
                    rel_full = full_dir.relative_to(folder)
                    if any(part.lower() in IGNORED_FOLDERS for part in rel_full.parts):
                        continue
                except ValueError:
                    pass
                log_error(full_dir, "Folder name must be lowercase with no spaces")
        for f in files_in_walk:
            if not is_ignored_file(f):
                full_file = root_path / f
                try:
                    rel_full = full_file.relative_to(folder)
                    if any(part.lower() in IGNORED_FOLDERS for part in rel_full.parts):
                        continue
                except ValueError:
                    pass
                if not is_lowercase_no_spaces(f):
                    log_error(full_file, "File name must be lowercase with no spaces")

errors = []

# --- Validation functions (same logic, but skip highlight recursively) ---

TOP_LEVEL_FOLDERS = {"home", "amenities", "surroundings", "zones"}
EXPECTED_HOME_FILES = {"home_idle.mp4", "home_out.mp4"}
EXPECTED_AMENITIES_FILES = {
    "amenities_gen_idle.mp4",
    "amenities_gen_rev_trans_to_home.mp4",
    "amenities_gen_trans_from_home.mp4",
    "amenities_out.mp4"
}
EXPECTED_SURROUNDINGS_FILES = {
    "surr_gen_rev_trans_to_home.mp4",
    "surr_gen_trans_from_home.mp4",
    "surr_idle.mp4",
    "surr_out.mp4"
}
EXPECTED_ZONES_GEN_FILES = {
    "zones_gen_trans.mp4",
    "zones_gen_rev.mp4",
    "zones_gen_idle.mp4"
}

def should_skip_path(path: Path, root: Path) -> bool:
    try:
        rel = path.relative_to(root)
        return any(part.lower() in IGNORED_FOLDERS for part in rel.parts)
    except ValueError:
        return False

def validate_home(home_dir: Path, ROOT: Path):
    if should_skip_path(home_dir, ROOT):
        return
    if not home_dir.exists():
        log_error(home_dir, "Missing folder")
        return
    files, _ = collect_files_and_dirs(home_dir)
    file_names = {f.name for f in files}
    missing = EXPECTED_HOME_FILES - file_names
    extra = file_names - EXPECTED_HOME_FILES
    for m in missing:
        log_error(home_dir / m, "Missing expected file")
    for e in extra:
        log_error(home_dir / e, "Unexpected file")

def validate_amenities(amenities_dir: Path, ROOT: Path):
    if should_skip_path(amenities_dir, ROOT):
        return
    if not amenities_dir.exists():
        log_error(amenities_dir, "Missing folder")
        return
    files, subdirs = collect_files_and_dirs(amenities_dir)
    file_names = {f.name for f in files}
    missing = EXPECTED_AMENITIES_FILES - file_names
    extra = file_names - EXPECTED_AMENITIES_FILES
    for m in missing:
        log_error(amenities_dir / m, "Missing expected file")
    for e in extra:
        log_error(amenities_dir / e, "Unexpected file")
    for item in subdirs:
        if should_skip_path(item, ROOT):
            continue
        name = item.name
        if re.fullmatch(r"amenity\d+", name):
            am_files, _ = collect_files_and_dirs(item)
            actual = {f.name for f in am_files}
            expected = {f"{name}_idle.mp4", f"{name}_trans.mp4", f"{name}_rev.mp4"}
            missing = expected - actual
            extra = actual - expected
            for m in missing:
                log_error(item / m, "Missing expected file")
            for e in extra:
                log_error(item / e, "Unexpected file")
        else:
            log_error(item, "Unexpected folder name; expected pattern: amenity<number>")

def validate_surroundings(surroundings_dir: Path, ROOT: Path):
    if should_skip_path(surroundings_dir, ROOT):
        return
    if not surroundings_dir.exists():
        log_error(surroundings_dir, "Missing folder")
        return
    files, _ = collect_files_and_dirs(surroundings_dir)
    file_names = {f.name for f in files}
    missing = EXPECTED_SURROUNDINGS_FILES - file_names
    extra = file_names - EXPECTED_SURROUNDINGS_FILES
    for m in missing:
        log_error(surroundings_dir / m, "Missing expected file")
    for e in extra:
        log_error(surroundings_dir / e, "Unexpected file")

def validate_zones(zones_dir: Path, ROOT: Path):
    if should_skip_path(zones_dir, ROOT):
        return
    if not zones_dir.exists():
        log_error(zones_dir, "Missing folder")
        return
    files, zone_dirs = collect_files_and_dirs(zones_dir)
    file_names = {f.name for f in files}
    missing = EXPECTED_ZONES_GEN_FILES - file_names
    extra = file_names - EXPECTED_ZONES_GEN_FILES
    for m in missing:
        log_error(zones_dir / m, "Missing expected file")
    for e in extra:
        log_error(zones_dir / e, "Unexpected file")
    for item in zone_dirs:
        if should_skip_path(item, ROOT):
            continue
        name = item.name
        if re.fullmatch(r"zone\d+", name):
            validate_zone(item, name, ROOT)
        else:
            log_error(item, "Unexpected folder name; expected pattern: zone<number>")

def validate_zone(zone_dir: Path, zone_name: str, ROOT: Path):
    if should_skip_path(zone_dir, ROOT):
        return
    files, tower_dirs = collect_files_and_dirs(zone_dir)
    file_names = {f.name for f in files}
    expected = {
        f"{zone_name}_gen_trans.mp4",
        f"{zone_name}_gen_rev.mp4",
        f"{zone_name}_gen_idle.mp4"
    }
    missing = expected - file_names
    extra = file_names - expected
    for m in missing:
        log_error(zone_dir / m, "Missing expected file")
    for e in extra:
        log_error(zone_dir / e, "Unexpected file")
    for tower_item in tower_dirs:
        if should_skip_path(tower_item, ROOT):
            continue
        tname = tower_item.name
        if re.fullmatch(r"tower\d+", tname):
            validate_tower(tower_item, zone_name, tname, ROOT)
        else:
            log_error(tower_item, f"Unexpected folder in {zone_name}; expected: tower<number>")

def validate_tower(tower_dir: Path, zone_name: str, tower_name: str, ROOT: Path):
    if should_skip_path(tower_dir, ROOT):
        return
    files, tower_subdirs = collect_files_and_dirs(tower_dir)
    file_names = {f.name for f in files}
    expected = {
        f"{zone_name}_{tower_name}_gen_trans.mp4",
        f"{zone_name}_{tower_name}_gen_rev.mp4"
    }
    missing = expected - file_names
    extra = file_names - expected
    for m in missing:
        log_error(tower_dir / m, "Missing expected file")
    for e in extra:
        log_error(tower_dir / e, "Unexpected file")

    views_dir = tower_dir / "views"
    floors_dir = tower_dir / "floors"

    if not should_skip_path(views_dir, ROOT):
        if not views_dir.exists():
            log_error(views_dir, "Missing 'views' folder")
        else:
            validate_views(views_dir, zone_name, tower_name, ROOT)

    if not should_skip_path(floors_dir, ROOT):
        if not floors_dir.exists():
            log_error(floors_dir, "Missing 'floors' folder")
        else:
            validate_floors(floors_dir, zone_name, tower_name, ROOT)

def validate_views(views_dir: Path, zone_name: str, tower_name: str, ROOT: Path):
    if should_skip_path(views_dir, ROOT):
        return
    _, view_dirs = collect_files_and_dirs(views_dir)
    for view_item in view_dirs:
        if should_skip_path(view_item, ROOT):
            continue
        vname = view_item.name
        if re.fullmatch(r"view\d+", vname):
            vfiles, _ = collect_files_and_dirs(view_item)
            actual = {f.name for f in vfiles}
            expected = {
                f"{zone_name}_{tower_name}_{vname}_trans.mp4",
                f"{zone_name}_{tower_name}_{vname}_rev.mp4",
                f"{zone_name}_{tower_name}_{vname}_idle.mp4"
            }
            missing = expected - actual
            extra = actual - expected
            for m in missing:
                log_error(view_item / m, "Missing expected file")
            for e in extra:
                log_error(view_item / e, "Unexpected file")
        else:
            log_error(view_item, "Unexpected folder in views; expected: view<number>")

def validate_floors(floors_dir: Path, zone_name: str, tower_name: str, ROOT: Path):
    if should_skip_path(floors_dir, ROOT):
        return
    files, floor_dirs = collect_files_and_dirs(floors_dir)
    file_names = {f.name for f in files}
    trans_file = f"{zone_name}_{tower_name}_floor1_trans.mp4"
    rev_file = f"{zone_name}_{tower_name}_floor1_rev.mp4"
    if trans_file not in file_names:
        log_error(floors_dir / trans_file, "Missing expected file")
    if rev_file not in file_names:
        log_error(floors_dir / rev_file, "Missing expected file")
    for floor_item in floor_dirs:
        if should_skip_path(floor_item, ROOT):
            continue
        fname = floor_item.name
        if re.fullmatch(r"floor\d+", fname):
            ffiles, _ = collect_files_and_dirs(floor_item)
            actual = {f.name for f in ffiles}
            expected_idle = f"{zone_name}_{tower_name}_{fname}_idle.mp4"
            if expected_idle not in actual:
                log_error(floor_item / expected_idle, "Missing expected idle file")
            if actual != {expected_idle}:
                extra = actual - {expected_idle}
                for e in extra:
                    log_error(floor_item / e, "Unexpected file in floor folder")
        else:
            log_error(floor_item, "Unexpected folder in floors; expected: floor<number>")

# === Main ===
def main():
    if len(sys.argv) != 2:
        print("Usage: python validate_structure.py <folder_name>")
        print("Example: python validate_structure.py videos")
        sys.exit(1)

    root_folder_name = sys.argv[1]
    ROOT = Path(root_folder_name)

    if not ROOT.exists():
        print(f"[FATAL] Folder '{ROOT}' does not exist.")
        sys.exit(1)
    if not ROOT.is_dir():
        print(f"[FATAL] '{ROOT}' is not a directory.")
        sys.exit(1)

    print(f"📁 Validating structure in: {ROOT}")

    # 1. Clean ._ files globally (including inside 'highlight')
    print("🔍 Scanning for ._ files...")
    dot_files_found = []
    for root_path, dirs, files in os.walk(ROOT):
        for f in files:
            if f.startswith("._"):
                dot_files_found.append(Path(root_path) / f)

    if dot_files_found:
        print(f"⚠️ Found {len(dot_files_found)} ._ file(s).")
        if DELETE_DOT_UNDERSCORE_FILES:
            print("🗑️  Deleting them...")
            for fp in dot_files_found:
                delete_file_safely(fp)
        else:
            print("ℹ️  To auto-delete, set DELETE_DOT_UNDERSCORE_FILES = True in the script.")
    else:
        print("✅ No ._ files found.")

    # 2. Validate naming (skip highlight)
    check_folder_case_and_spaces(ROOT)

    # 3. Validate top-level folders (skip if highlight is at top — though it shouldn't be)
    actual_top = {d.name for d in ROOT.iterdir() if d.is_dir()}
    missing_top = TOP_LEVEL_FOLDERS - actual_top
    extra_top = actual_top - TOP_LEVEL_FOLDERS
    for folder_name in missing_top:
        folder_path = ROOT / folder_name
        if not should_skip_path(folder_path, ROOT):
            log_error(folder_path, "Missing top-level folder")
    for folder_name in extra_top:
        folder_path = ROOT / folder_name
        if not should_skip_path(folder_path, ROOT):
            # Only complain if it's not an ignored folder
            if folder_name.lower() not in IGNORED_FOLDERS:
                log_error(folder_path, "Unexpected top-level folder")

    # 4. Validate sections
    validate_home(ROOT / "home", ROOT)
    validate_amenities(ROOT / "amenities", ROOT)
    validate_surroundings(ROOT / "surroundings", ROOT)
    validate_zones(ROOT / "zones", ROOT)

    # 5. Report
    if errors:
        print("\n❌ Validation failed. Issues found:")
        for err in errors:
            print(err)
        sys.exit(1)
    else:
        print("\n✅ All folder and file names (excluding 'highlight') match the expected structure.")
        sys.exit(0)

if __name__ == "__main__":
    main()