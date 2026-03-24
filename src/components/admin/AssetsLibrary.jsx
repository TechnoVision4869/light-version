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
  Trash2,
  Building2,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AddAssetModal } from "./AddAssetModal";
import { ConfirmDialog } from "./ConfirmDialog";
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
  if (t === AssetType.THUMBNAIL)
    return <FileImage className="w-4 h-4 shrink-0" />;
  return <Image className="w-4 h-4 shrink-0" />;
}

export function AssetsLibrary({
  focusedAssetField,
  onAssetClick,
  acceptableTypes = [],
  developerId,
  selectedDeveloperName,
  mockAssets = null,
  onAddMockAsset,
  disabled = false,
}) {
  const [assets, setAssets] = useState(mockAssets ?? []);
  const [loading, setLoading] = useState(!mockAssets);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [expandedTags, setExpandedTags] = useState(new Set());
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteAssetTarget, setDeleteAssetTarget] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const handleDeleteAssetClick = (e, asset) => {
    e.stopPropagation();
    if (mockAssets !== null || disabled) return;
    if (!asset?.id) return;
    setDeleteAssetTarget(asset);
  };

  const confirmDeleteAsset = async () => {
    if (!deleteAssetTarget?.id) return;
    setDeletingId(deleteAssetTarget.id);
    try {
      await assetApi.delete(deleteAssetTarget.id);
      setAssets((prev) => prev.filter((a) => a.id !== deleteAssetTarget.id));
      toast.success("Asset deleted");
      setDeleteAssetTarget(null);
    } catch (err) {
      toast.error(err?.message || "Failed to delete asset");
    } finally {
      setDeletingId(null);
    }
  };

  const filters = useMemo(
    () => ({
      limit: 1000,
      type: typeFilter === "all" ? undefined : typeFilter,
      developerId: developerId || undefined,
    }),
    [typeFilter, developerId],
  );

  useEffect(() => {
    if (mockAssets !== null) {
      setAssets(mockAssets);
      setLoading(false);
      return;
    }
    if (disabled) {
      setAssets([]);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    assetApi
      .getByDeveloper(filters)
      .then((data) => {
        if (!cancelled) {
          const list = Array.isArray(data)
            ? data
            : (data?.data ?? data?.items ?? []);
          setAssets(list);
        }
      })
      .catch(() => {
        if (!cancelled) setAssets([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [mockAssets, disabled, filters]);

  const filteredAssets = useMemo(() => {
    const q = search.trim().toLowerCase();

    let list = assets;

    if (acceptableTypes.length > 0) {
      const acceptable = new Set(
        acceptableTypes.map((t) => (t || "").toLowerCase()),
      );
      list = list.filter((a) => acceptable.has((a.type || "").toLowerCase()));
    }

    if (typeFilter !== "all") {
      const tf = (typeFilter || "").toLowerCase();
      list = list.filter((a) => ((a?.type || "") + "").toLowerCase() === tf);
    }

    if (!q) return list;

    // Local search by assetKey only (API doesn't support it yet)
    return list.filter((a) =>
      (((a?.assetKey ?? "") + "").toLowerCase() || "").includes(q),
    );
  }, [assets, acceptableTypes, typeFilter, search]);

  const assetsByTag = useMemo(() => {
    const map = {};
    filteredAssets.forEach((asset) => {
      const tag = asset.tag || "Untagged";
      if (!map[tag]) map[tag] = [];
      map[tag].push(asset);
    });
    return map;
  }, [filteredAssets]);

  const allTags = useMemo(
    () => Array.from(new Set(assets.map((a) => a.tag).filter(Boolean))),
    [assets],
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
    if (created) {
      setAssets((prev) => [created, ...prev]);

      // Auto-switch filter to match uploaded asset type for better UX
      const uploadedType = (created.type || "").toLowerCase();
      if (uploadedType && typeFilter !== "all" && typeFilter !== uploadedType) {
        setTypeFilter(uploadedType);
        toast.success(
          `Switched to ${uploadedType} filter to show your new asset`,
        );
      }

      // Auto-expand the tag to show the new asset
      if (created.tag) {
        setExpandedTags((prev) => {
          const next = new Set(prev);
          next.add(created.tag);
          return next;
        });
      }
    }
  };

  return (
    <div
      className={cn(
        "h-full flex flex-col border-l border-white/10 bg-[#1C1C1C] relative",
        disabled && "opacity-60",
      )}
    >
      {disabled && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#1C1C1C]/90 backdrop-blur-sm rounded-l pointer-events-auto">
          <div className="text-center text-white/60 px-4">
            <Building2 className="w-12 h-12 mx-auto mb-3 text-white/30" />
            <p className="text-sm">
              Select a developer to use the Assets Library
            </p>
          </div>
        </div>
      )}
      <div className="p-3 border-b border-white/10 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <h2 className="font-semibold text-sm text-white">Assets Library</h2>
            {selectedDeveloperName && !disabled ? (
              <p className="text-xs text-white/60 mt-1 truncate">
                Developer: {selectedDeveloperName}
              </p>
            ) : null}
          </div>
          <Button
            size="sm"
            onClick={() => setAddModalOpen(true)}
            className="shrink-0 bg-white/90 text-black hover:bg-white"
            disabled={disabled}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>

        {focusedAssetField && !disabled && (
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
          {[
            "all",
            AssetType.VIDEO,
            AssetType.IMAGE,
            AssetType.PANORAMA,
            AssetType.THUMBNAIL,
          ].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTypeFilter(t)}
              className={cn(
                "px-2 py-1 text-xs rounded-md",
                typeFilter === t
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground",
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
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/10 text-sm font-medium text-white transition-colors"
                  >
                    {open ? (
                      <ChevronDown className="w-4 h-4 text-white/70" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-white/70" />
                    )}
                    <span className="flex-1 text-left truncate">{tag}</span>
                    <span className="text-xs text-white/60">
                      ({list.length})
                    </span>
                  </button>
                  {open && (
                    <div className="pl-6 pr-1 py-1 space-y-1">
                      {list.map((asset) => (
                        <div
                          key={asset.id}
                          role="button"
                          tabIndex={disabled ? -1 : 0}
                          onClick={() => !disabled && onAssetClick(asset)}
                          onKeyDown={(e) =>
                            !disabled &&
                            e.key === "Enter" &&
                            onAssetClick(asset)
                          }
                          className="rounded-md border border-white/20 hover:border-white/40 hover:shadow-lg transition-all overflow-hidden"
                        >
                          <div className="aspect-video bg-[#2C2C2C]">
                            {(asset.type || "").toLowerCase() ===
                            AssetType.VIDEO ? (
                              <div className="w-full h-full flex items-center justify-center">
                                <Video className="w-8 h-8 text-white/40" />
                              </div>
                            ) : (
                              <img
                                src={getAssetPreviewUrl(asset, !!mockAssets)}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="p-2 flex items-center gap-1 text-xs bg-[#2C2C2C]">
                            <span className="text-white/70">
                              {getTypeIcon(asset.type)}
                            </span>
                            <span className="truncate flex-1 text-white">
                              {asset.assetKey || asset.name || asset.id}
                            </span>
                            {mockAssets === null && (
                              <button
                                type="button"
                                onClick={(e) =>
                                  handleDeleteAssetClick(e, asset)
                                }
                                disabled={deletingId === asset.id}
                                className="p-1 rounded hover:bg-red-500/20 text-red-400 shrink-0 disabled:opacity-50 transition-colors"
                                title="Delete asset"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
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
        {filteredAssets.length} asset(s)
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

      <ConfirmDialog
        open={!!deleteAssetTarget}
        onOpenChange={(open) => !open && setDeleteAssetTarget(null)}
        title={
          deleteAssetTarget
            ? `Delete asset "${deleteAssetTarget.assetKey || deleteAssetTarget.name || deleteAssetTarget.id}"?`
            : "Delete asset?"
        }
        description="This action cannot be undone."
        onConfirm={confirmDeleteAsset}
        isLoading={deletingId != null}
      />
    </div>
  );
}
