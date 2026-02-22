import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Image,
  Video,
  Compass,
  FileImage,
  ChevronDown,
  ChevronRight,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AddAssetModal } from "./AddAssetModal";
import { assetApi } from "../../api/admin/assetApi";
import { apiService } from "../../services/api.service";
import { cn } from "@/lib/utils";
import { AssetType } from "./types";

function getAssetPreviewUrl(asset, useMockUrl = false) {
  if (!asset?.id) return null;
  if (useMockUrl && asset.url) return asset.url;
  const base = apiService.apiUrl?.replace(/\/$/, "") || "";
  return `${base}/assets/file/${asset.id}`;
}

function getTypeIcon(type) {
  const t = (type || "").toLowerCase();
  if (t === AssetType.VIDEO) return <Video className="w-4 h-4 shrink-0" />;
  if (t === AssetType.PANORAMA) return <Compass className="w-4 h-4 shrink-0" />;
  if (t === AssetType.THUMBNAIL) return <FileImage className="w-4 h-4 shrink-0" />;
  return <Image className="w-4 h-4 shrink-0" />;
}

export function AssetsLibrary({
  focusedAssetField,
  onAssetClick,
  acceptableTypes = [],
  developerId,
  mockAssets = null,
  onAddMockAsset,
}) {
  const [assets, setAssets] = useState(mockAssets ?? []);
  const [loading, setLoading] = useState(!mockAssets);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [expandedTags, setExpandedTags] = useState(new Set());
  const [addModalOpen, setAddModalOpen] = useState(false);

  const filters = useMemo(
    () => ({
      search: search.trim() || undefined,
      type: typeFilter === "all" ? undefined : typeFilter,
      isActive: true,
    }),
    [search, typeFilter]
  );

  useEffect(() => {
    if (mockAssets !== null) {
      setAssets(mockAssets);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    assetApi
      .list(filters)
      .then((data) => {
        if (!cancelled) {
          const list = Array.isArray(data) ? data : data?.data ?? data?.items ?? [];
          setAssets(list);
        }
      })
      .catch(() => {
        if (!cancelled) setAssets([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [mockAssets, filters.search, filters.type, filters.isActive]);

  const filteredByType = useMemo(() => {
    if (acceptableTypes.length === 0) return assets;
    const set = new Set(acceptableTypes.map((t) => (t || "").toLowerCase()));
    return assets.filter((a) => set.has((a.type || "").toLowerCase()));
  }, [assets, acceptableTypes]);

  const assetsByTag = useMemo(() => {
    const map = {};
    filteredByType.forEach((asset) => {
      const tag = asset.tag || "Untagged";
      if (!map[tag]) map[tag] = [];
      map[tag].push(asset);
    });
    return map;
  }, [filteredByType]);

  const allTags = useMemo(
    () => Array.from(new Set(assets.map((a) => a.tag).filter(Boolean))),
    [assets]
  );

  const toggleTag = (tag) => {
    setExpandedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const handleAddAsset = (created) => {
    setAssets((prev) => (created ? [created, ...prev] : prev));
  };

  return (
    <div className="h-full flex flex-col border-l border-border bg-background">
      <div className="p-3 border-b border-border space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-semibold text-sm">Assets Library</h2>
          <Button
            size="sm"
            onClick={() => setAddModalOpen(true)}
            className="shrink-0"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>

        {focusedAssetField && (
          <div className="p-2 rounded-md bg-primary/10 border border-primary/20 text-xs">
            <span className="font-medium text-primary">Picking for:</span>
            <span className="ml-1 text-primary/90">{focusedAssetField}</span>
          </div>
        )}

        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-9"
          />
        </div>

        <div className="flex flex-wrap gap-1">
          {["all", AssetType.VIDEO, AssetType.IMAGE, AssetType.PANORAMA, AssetType.THUMBNAIL].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTypeFilter(t)}
              className={cn(
                "px-2 py-1 text-xs rounded-md",
                typeFilter === t
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              )}
            >
              {t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-2">
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : Object.keys(assetsByTag).length === 0 ? (
          <p className="text-sm text-muted-foreground">No assets</p>
        ) : (
          <div className="space-y-1">
            {Object.entries(assetsByTag).map(([tag, list]) => {
              const open = expandedTags.has(tag);
              return (
                <div key={tag}>
                  <button
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted text-sm font-medium"
                  >
                    {open ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                    <span className="flex-1 text-left truncate">{tag}</span>
                    <span className="text-xs text-muted-foreground">
                      ({list.length})
                    </span>
                  </button>
                  {open && (
                    <div className="pl-6 pr-1 py-1 space-y-1">
                      {list.map((asset) => (
                        <div
                          key={asset.id}
                          role="button"
                          tabIndex={0}
                          onClick={() => onAssetClick(asset)}
                          onKeyDown={(e) =>
                            e.key === "Enter" && onAssetClick(asset)
                          }
                          className="rounded-md border border-border hover:border-primary hover:shadow-sm transition-all overflow-hidden"
                        >
                          <div className="aspect-video bg-muted">
                            {(asset.type || "").toLowerCase() === AssetType.VIDEO ? (
                              <div className="w-full h-full flex items-center justify-center">
                                <Video className="w-8 h-8 text-muted-foreground" />
                              </div>
                            ) : (
                              <img
                                src={getAssetPreviewUrl(asset, !!mockAssets)}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="p-2 flex items-center gap-1 text-xs">
                            {getTypeIcon(asset.type)}
                            <span className="truncate flex-1">
                              {asset.assetKey || asset.name || asset.id}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="p-2 border-t border-border text-xs text-muted-foreground">
        {filteredByType.length} asset(s)
      </div>

      <AddAssetModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={onAddMockAsset ?? handleAddAsset}
        existingTags={allTags}
        apiUpload={assetApi.upload.bind(assetApi)}
        developerId={developerId}
        isMock={!!mockAssets}
      />
    </div>
  );
}
