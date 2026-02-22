import React from "react";
import { ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Pick-only asset input. Click to set focusedAssetField; user picks from Assets Library.
 * value: asset id (string) or null
 * acceptableTypes: e.g. ['VIDEO', 'IMAGE'] for filtering in library
 */
export function AssetFieldInput({
  value,
  assetPreviewUrl,
  onChange,
  onFocus,
  fieldKey,
  label,
  isFocused = false,
  acceptableTypes = [],
  disabled,
  className,
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="block text-sm font-medium text-foreground">{label}</label>
      )}
      <div className="flex gap-2 items-start">
        <button
          type="button"
          onClick={() => onFocus && onFocus(fieldKey)}
          disabled={disabled}
          className={cn(
            "flex-1 min-h-[80px] px-3 py-2 text-left border-2 border-dashed rounded-md transition-colors",
            isFocused
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/30 hover:border-primary/50 hover:bg-muted/50"
          )}
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ImageIcon className="w-4 h-4 shrink-0" />
            <span>{value ? "Change asset" : "Click to select from library"}</span>
          </div>
        </button>
        {value && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => onChange(null)}
            disabled={disabled}
            className="shrink-0"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      {value && assetPreviewUrl && (
        <div className="rounded-md border overflow-hidden bg-muted/30">
          <div className="aspect-video max-h-24 w-full relative">
            {assetPreviewUrl.match(/\.(mp4|webm|ogg)$/i) ? (
              <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-xs">
                Video
              </div>
            ) : (
              <img
                src={assetPreviewUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <p className="text-xs text-muted-foreground truncate px-2 py-1">
            {value}
          </p>
        </div>
      )}
    </div>
  );
}
