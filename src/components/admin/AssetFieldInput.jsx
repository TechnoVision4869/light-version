import React from "react";
import { ImageIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Pick-only asset input. Click to set focusedAssetField; user picks from Assets Library.
 * value: asset id (string) or null
 * assetName: display name of the asset (optional)
 * acceptableTypes: e.g. ['VIDEO', 'IMAGE'] for filtering in library
 */
export function AssetFieldInput({
  value,
  assetPreviewUrl,
  assetName,
  onChange,
  onFocus,
  fieldKey,
  label,
  isFocused = false,
  // eslint-disable-next-line no-unused-vars
  acceptableTypes = [],
  disabled,
  className,
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="block text-sm font-medium text-white">{label}</label>
      )}
      <div className="flex gap-2 items-start">
        <button
          type="button"
          onClick={() => onFocus && onFocus(fieldKey)}
          disabled={disabled}
          className={cn(
            "flex-1 min-h-[80px] px-3 py-2 text-left border-2 border-dashed rounded-md transition-colors",
            isFocused
              ? "border-white bg-white/10"
              : "border-white/30 hover:border-white/50 hover:bg-white/5",
          )}
        >
          {value ? (
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <ImageIcon className="w-4 h-4 shrink-0" />
                <span>Change asset</span>
              </div>
              {assetName && (
                <p className="text-sm font-medium text-white truncate">
                  {assetName}
                </p>
              )}
              <p className="text-xs text-white/40 truncate font-mono">
                {value}
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-white/60">
              <ImageIcon className="w-4 h-4 shrink-0" />
              <span>Click to select from library</span>
            </div>
          )}
        </button>
        {value && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => onChange(null)}
            disabled={disabled}
            className="shrink-0 border-white/20 text-white hover:bg-white/10"
          >
            <Trash2 className="w-3 h-3 text-red-500" />
          </Button>
        )}
      </div>
      {value && assetPreviewUrl && (
        <div className="rounded-md border border-white/20 overflow-hidden bg-white/5">
          <div className="aspect-video max-h-24 w-full relative">
            {assetPreviewUrl.match(/\.(mp4|webm|ogg)$/i) ? (
              <div className="w-full h-full flex items-center justify-center bg-[#2C2C2C] text-white/60 text-xs">
                Video Preview
              </div>
            ) : (
              <img
                src={assetPreviewUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
