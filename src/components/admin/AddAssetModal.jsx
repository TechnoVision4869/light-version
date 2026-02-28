import React, { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AssetType } from "./types";

/**
 * Single file upload. Required: file, type, tag.
 * Backend: POST assets/upload (multipart) with file, type, tag, name?, developerId?
 * Type values match backend AssetType enum (lowercase).
 */
export function AddAssetModal({
  open,
  onClose,
  onAdd,
  existingTags = [],
  apiUpload,
  developerId,
  isMock = false,
}) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [type, setType] = useState(AssetType.IMAGE);
  const [tag, setTag] = useState("");
  const [tagSuggestions, setTagSuggestions] = useState([]);
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open) {
      setFile(null);
      setPreviewUrl("");
      setType(AssetType.IMAGE);
      setTag("");
      setName("");
      setError(null);
    }
  }, [open]);

  useEffect(() => {
    if (tag.trim()) {
      const filtered = existingTags.filter(
        (t) => t.toLowerCase().includes(tag.toLowerCase()) && t !== tag,
      );
      setTagSuggestions(filtered.slice(0, 8));
    } else {
      setTagSuggestions([]);
    }
  }, [tag, existingTags]);

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      if (f.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => setPreviewUrl(reader.result);
        reader.readAsDataURL(f);
      } else {
        setPreviewUrl("");
      }
      if (!name) setName(f.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!file || !tag.trim()) return;
    if (isMock) {
      const mockAsset = {
        id: `mock-asset-${Date.now()}`,
        assetKey:
          name.trim() || file?.name?.replace(/\.[^/.]+$/, "") || "asset",
        type,
        tag: tag.trim(),
        url: previewUrl || "",
        isActive: true,
      };
      onAdd(mockAsset);
      onClose();
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);
      formData.append("tag", tag.trim());
      if (developerId) formData.append("developerId", developerId);
      const result = await apiUpload(formData);
      onAdd(result);
      onClose();
    } catch (err) {
      setError(err?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="text-black sm:max-w-lg" showCloseButton={true}>
        <DialogHeader>
          <DialogTitle>Add New Asset</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>File *</Label>
            <div
              className={cn(
                "mt-1 border-2 border-dashed rounded-lg p-6 text-center transition-colors",
                "border-muted-foreground/30 hover:border-primary/50",
              )}
            >
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="hidden"
                id="asset-file"
              />
              <label
                htmlFor="asset-file"
                className="cursor-pointer flex flex-col items-center gap-1"
              >
                <Upload className="w-8 h-8 text-muted-foreground" />
                <span className="text-sm">
                  {file ? file.name : "Click to select"}
                </span>
              </label>
            </div>
            {previewUrl && (
              <div className="mt-2 rounded border overflow-hidden">
                <img
                  src={previewUrl}
                  alt=""
                  className="w-full h-40 object-cover"
                />
              </div>
            )}
          </div>

          <div>
            <Label>Type *</Label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full mt-1 h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm"
              required
            >
              <option value={AssetType.IMAGE}>Image</option>
              <option value={AssetType.VIDEO}>Video</option>
              <option value={AssetType.PANORAMA}>Panorama</option>
              <option value={AssetType.THUMBNAIL}>Thumbnail</option>
            </select>
          </div>

          <div className="relative">
            <Label>Tag *</Label>
            <Input
              value={tag}
              onChange={(e) => {
                setTag(e.target.value);
                setShowTagSuggestions(true);
              }}
              onFocus={() => setShowTagSuggestions(true)}
              placeholder="e.g. Exterior, Villa"
              className="mt-1"
              required
            />
            {showTagSuggestions && tagSuggestions.length > 0 && (
              <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-popover border rounded-md shadow-md max-h-40 overflow-auto">
                {tagSuggestions.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setTag(t);
                      setShowTagSuggestions(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-accent"
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <Label className="text-muted-foreground">Name (optional)</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Display name"
              className="mt-1"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <DialogFooter showCloseButton={false}>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!file || !tag.trim() || loading}>
              {loading ? "Uploading…" : "Add Asset"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
