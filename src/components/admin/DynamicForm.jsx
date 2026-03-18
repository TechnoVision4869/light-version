import React, { useState, useEffect, useMemo } from "react";
import { Save, X, Plus, Trash2, FolderTree, Folder, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AssetFieldInput } from "./AssetFieldInput";
import PositionPickerButton from "./PositionPickerButton";
import { resourceConfigs, CONTROL_TYPES } from "./resourceConfigs";
import { ENTITY_TYPES, PROPERTY_TYPES } from "./types";

function getNodeName(node) {
  if (!node) return "";
  const d = node.data || node;
  return d.name || d.displayName || d.unitCode || (d.floorNumber != null ? `Floor ${d.floorNumber}` : "") || node.name || "";
}

function toTitleCase(str) {
  if (!str) return "";
  const result = str.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export function DynamicForm({
  selectedNode,
  onSave,
  onCancel,
  onFieldFocus,
  focusedAssetField,
  onAddChild,
  assetPreviewUrls,
  injectedFieldUpdate,
  // eslint-disable-next-line no-unused-vars -- parent passes for asset field injection
  onInjectedFieldConsumed,
  onFormAssetIdsChange,
  unitTypes = [],
  isSaving = false,
  assetsMap = {},
  parentData = null,
}) {
  const [localData, setLocalData] = useState({});
  const [expandedGroups, setExpandedGroups] = useState(() => {
    // Start with first group expanded by default
    return new Set();
  });

  const config = useMemo(() => (selectedNode ? resourceConfigs[selectedNode.type] : null), [selectedNode]);
  const schema = useMemo(() => config?.schema, [config]);
  const fields = config?.fields;
  const useConfigFields = Array.isArray(fields) && fields.length > 0;

  useEffect(() => {
    if (!onFormAssetIdsChange || !fields) return;
    const ids = {};
    const processField = (f) => {
      if (f.control === CONTROL_TYPES.ASSET) {
        const v = localData[f.name];
        if (v != null && v !== "") ids[f.name] = v;
      } else if (f.control === CONTROL_TYPES.ASSET_GROUP && f.fields) {
        f.fields.forEach(processField);
      } else if (f.control === CONTROL_TYPES.ASSET_ARRAY) {
        const v = localData[f.name];
        if (Array.isArray(v) && v.length > 0) ids[f.name] = v.filter((id) => id != null && id !== "");
      } else if (f.control === CONTROL_TYPES.LEVELS_ARRAY) {
        const levels = localData[f.name];
        if (Array.isArray(levels)) {
          const levelAssetIds = [];
          levels.forEach((level) => {
            (level.rooms ?? []).forEach((room) => {
              if (room.furnitureImgId) levelAssetIds.push(room.furnitureImgId);
              if (room.unfurnitureImgId) levelAssetIds.push(room.unfurnitureImgId);
            });
          });
          if (levelAssetIds.length > 0) ids.levelsAssetIds = levelAssetIds;
        }
      }
    };
    fields.forEach(processField);
    onFormAssetIdsChange(ids);
  }, [localData, fields, onFormAssetIdsChange]);

  useEffect(() => {
    const data = selectedNode?.data;
    if (useConfigFields && fields) {
      const initialData = {};
      const processField = (f) => {
        const key = f.name;
        if (f.control === CONTROL_TYPES.ASSET_GROUP && f.fields) {
          f.fields.forEach(processField);
        } else if (f.control === CONTROL_TYPES.ASSET_ARRAY || f.control === CONTROL_TYPES.PAYMENT_PLANS_ARRAY || f.control === CONTROL_TYPES.LEVELS_ARRAY) {
          const raw = data?.[key];
          if (f.control === CONTROL_TYPES.ASSET_ARRAY) {
            initialData[key] = Array.isArray(raw) ? raw.map((x) => (typeof x === "string" ? x : x?.assetId ?? null)) : [];
          } else if (f.control === CONTROL_TYPES.PAYMENT_PLANS_ARRAY) {
            initialData[key] = Array.isArray(raw) ? raw.map((p) => ({ downPayment: p.downPayment ?? null, monthly: p.monthly ?? null, years: p.years ?? null })) : [];
          } else {
            initialData[key] = Array.isArray(raw) ? raw : [];
          }
        } else if (key === "serviceRoomNames") {
          // API returns serviceRooms: [{ id, name, displayOrder }]; form expects serviceRoomNames (string or array)
          const rawRooms = data?.serviceRooms;
          if (Array.isArray(rawRooms) && rawRooms.some((r) => r && typeof r === "object" && "name" in r)) {
            const sorted = [...rawRooms].sort(
              (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0),
            );
            initialData[key] = sorted
              .map((r) => (r && r.name != null ? String(r.name) : ""))
              .filter(Boolean)
              .join(", ");
          } else {
            initialData[key] = data?.[key] ?? null;
          }
        } else if (key.includes('.')) {
          const parts = key.split('.');
          let value = data;
          for (const part of parts) {
            value = value?.[part];
          }
          initialData[key] = value ?? null;
        } else {
          initialData[key] = data?.[key] ?? null;
        }
      };
      fields.forEach(processField);
      setLocalData(initialData);
    } else if (schema) {
      const initialData = {};
      Object.keys(schema.fields).forEach((key) => {
        initialData[key] = data?.[key] ?? (schema.fields[key].default && schema.fields[key].default()) ?? null;
      });
      setLocalData(initialData);
    } else {
      setLocalData(data && typeof data === "object" ? { ...data } : {});
    }
  }, [selectedNode?.id, selectedNode?.data, schema, useConfigFields, fields]);

  const update = (key, value) => {
    if (key.includes('.')) {
      setLocalData((prev) => ({ ...prev, [key]: value }));
    } else {
      setLocalData((prev) => ({ ...prev, [key]: value }));
    }
  };

  const updateArray = (key, index, valueOrUpdater) => {
    setLocalData((prev) => {
      const arr = Array.isArray(prev[key]) ? [...prev[key]] : [];
      arr[index] = typeof valueOrUpdater === "function" ? valueOrUpdater(arr[index]) : valueOrUpdater;
      return { ...prev, [key]: arr };
    });
  };

  const addToArray = (key, newItem) => {
    setLocalData((prev) => ({
      ...prev,
      [key]: [...(Array.isArray(prev[key]) ? prev[key] : []), newItem],
    }));
  };

  const removeFromArray = (key, index) => {
    setLocalData((prev) => {
      const arr = Array.isArray(prev[key]) ? [...prev[key]] : [];
      arr.splice(index, 1);
      return { ...prev, [key]: arr };
    });
  };

  useEffect(() => {
    if (injectedFieldUpdate?.key == null) return;
    const { key, value } = injectedFieldUpdate;
    const levelsRoomMatch = key.match(/^levels-(\d+)-room-(\d+)-(furnitureImgId|unfurnitureImgId)$/);
    if (levelsRoomMatch && fields?.some((f) => f.name === "levels" && f.control === CONTROL_TYPES.LEVELS_ARRAY)) {
      const [, levelIdxStr, roomIdxStr, subField] = levelsRoomMatch;
      const levelIdx = parseInt(levelIdxStr, 10);
      const roomIdx = parseInt(roomIdxStr, 10);
      if (!Number.isNaN(levelIdx) && !Number.isNaN(roomIdx)) {
        setLocalData((prev) => {
          const levels = Array.isArray(prev.levels) ? [...prev.levels] : [];
          const level = levels[levelIdx];
          if (!level?.rooms?.[roomIdx]) return { ...prev, [key]: value };
          const rooms = level.rooms.map((r, i) => (i === roomIdx ? { ...r, [subField]: value ?? null } : r));
          levels[levelIdx] = { ...level, rooms };
          return { ...prev, levels };
        });
        return;
      }
    }
    const match = key.match(/^(.+)-(\d+)$/);
    if (match && fields) {
      const [, fieldName, idxStr] = match;
      const idx = parseInt(idxStr, 10);
      const isArrayField = fields.some((f) => f.name === fieldName && f.control === CONTROL_TYPES.ASSET_ARRAY);
      if (isArrayField && !Number.isNaN(idx)) {
        setLocalData((prev) => {
          const arr = [...(Array.isArray(prev[fieldName]) ? prev[fieldName] : [])];
          arr[idx] = value;
          return { ...prev, [fieldName]: arr };
        });
        return;
      }
    }
    setLocalData((prev) => ({ ...prev, [key]: value }));
  }, [injectedFieldUpdate, fields]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedNode) return;
    onSave(selectedNode.id, selectedNode.type, localData, selectedNode);
  };

  if (!selectedNode) {
    return (
      <div className="h-full flex items-center justify-center bg-[#2C2C2C]">
        <div className="text-center text-white/60">
          <FolderTree className="w-16 h-16 mx-auto mb-4 text-white/30" />
          <p className="text-lg text-white/80">No item selected</p>
          <p className="text-sm mt-2">Select an item from the flow tree or add a new one.</p>
        </div>
      </div>
    );
  }

  if (selectedNode.type === "FOLDER") {
    return (
      <div className="h-full flex items-center justify-center bg-[#2C2C2C]">
        <div className="text-center text-white/60">
          <Folder className="w-16 h-16 mx-auto mb-4 text-white/30" />
          <p className="text-lg text-white/80">{selectedNode.name}</p>
          <p className="text-sm mt-2">Select an item or add a new one to this group.</p>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="h-full flex items-center justify-center bg-[#2C2C2C]">
        <div className="text-center text-red-400">
          <p className="text-lg">Configuration Error</p>
          <p className="text-sm mt-2 text-white/60">No config found for type: {selectedNode.type}</p>
        </div>
      </div>
    );
  }

  const nextStep = config.childTypes
    ? typeof config.childTypes === "function"
      ? config.childTypes(selectedNode)
      : config.childTypes
    : [];

  const renderConfigField = (field) => {
    const { name, label, control, required, disabled, options, allowedTypes = [] } = field;
    const value = localData[name] ?? null;

    if (control === CONTROL_TYPES.ASSET) {
      const assetName = value && assetsMap[value] ? (assetsMap[value].assetKey || assetsMap[value].name) : null;
      return (
        <AssetFieldInput
          key={name}
          fieldKey={name}
          label={label}
          value={value}
          assetPreviewUrl={value ? assetPreviewUrls?.[value] : null}
          assetName={assetName}
          onChange={(id) => update(name, id)}
          onFocus={onFieldFocus}
          isFocused={focusedAssetField === name}
        />
      );
    }

    if (control === CONTROL_TYPES.ASSET_GROUP) {
      const groupFields = field.fields || [];
      const isExpanded = expandedGroups.has(name);
      const toggleGroup = () => {
        setExpandedGroups((prev) => {
          const next = new Set(prev);
          if (next.has(name)) {
            next.delete(name);
          } else {
            next.add(name);
          }
          return next;
        });
      };

      return (
        <div key={name} className="rounded-lg border border-white/20 bg-white/5 overflow-hidden transition-all">
          <button
            type="button"
            onClick={toggleGroup}
            className="w-full flex items-center justify-between p-4 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-2">
              {isExpanded ? (
                <ChevronDown className="w-5 h-5 text-white/70 transition-transform" />
              ) : (
                <ChevronRight className="w-5 h-5 text-white/70 transition-transform" />
              )}
              <h3 className="text-sm font-semibold text-white">{label}</h3>
            </div>
            <span className="text-xs text-white/50">
              {groupFields.length} field{groupFields.length !== 1 ? 's' : ''}
            </span>
          </button>
          {isExpanded && (
            <div className="p-4 pt-0 space-y-3 border-t border-white/10 animate-in fade-in slide-in-from-top-2 duration-200">
              {groupFields.map((subField) => renderConfigField(subField))}
            </div>
          )}
        </div>
      );
    }

    if (control === CONTROL_TYPES.ASSET_ARRAY) {
      const list = Array.isArray(value) ? value : [];
      return (
        <div key={name} className="space-y-2">
          <Label className="block text-white">{label}</Label>
          {list.map((assetId, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="flex-1 min-w-0">
                <AssetFieldInput
                  fieldKey={`${name}-${idx}`}
                  label=""
                  value={assetId}
                  assetPreviewUrl={assetId ? assetPreviewUrls?.[assetId] : null}
                  assetName={assetId && assetsMap[assetId] ? assetsMap[assetId].assetKey || assetsMap[assetId].name : null}
                  onChange={(id) => updateArray(name, idx, id)}
                  onFocus={onFieldFocus}
                  isFocused={focusedAssetField === `${name}-${idx}`}
                  acceptableTypes={allowedTypes}
                />
              </div>
              <button
                type="button"
                onClick={() => removeFromArray(name, idx)}
                className="p-1.5 rounded hover:bg-red-500/20 text-red-400 shrink-0 transition-colors"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addToArray(name, null)}
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-white bg-white/10 hover:bg-white/20 rounded border border-dashed border-white/30 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Asset
          </button>
        </div>
      );
    }

    if (control === CONTROL_TYPES.PAYMENT_PLANS_ARRAY) {
      const list = Array.isArray(value) ? value : [];
      return (
        <div key={name} className="space-y-3">
          <Label className="block text-white">{label}</Label>
          {list.map((plan, idx) => (
            <div key={idx} className="p-3 rounded-lg border border-white/20 bg-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-white/70">Plan {idx + 1}</span>
                <button
                  type="button"
                  onClick={() => removeFromArray(name, idx)}
                  className="p-1 rounded hover:bg-red-500/20 text-red-400 transition-colors"
                  title="Remove plan"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label className="text-xs text-white/80">Down payment</Label>
                  <Input
                    type="number"
                    value={plan.downPayment === "" || plan.downPayment == null ? "" : plan.downPayment}
                    onChange={(e) => updateArray(name, idx, (p) => ({ ...p, downPayment: e.target.value === "" ? null : Number(e.target.value) }))}
                    className="mt-0.5 h-8 bg-white/5 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label className="text-xs text-white/80">Monthly</Label>
                  <Input
                    type="number"
                    value={plan.monthly === "" || plan.monthly == null ? "" : plan.monthly}
                    onChange={(e) => updateArray(name, idx, (p) => ({ ...p, monthly: e.target.value === "" ? null : Number(e.target.value) }))}
                    className="mt-0.5 h-8 bg-white/5 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label className="text-xs text-white/80">Years</Label>
                  <Input
                    type="number"
                    value={plan.years === "" || plan.years == null ? "" : plan.years}
                    onChange={(e) => updateArray(name, idx, (p) => ({ ...p, years: e.target.value === "" ? null : Number(e.target.value) }))}
                    className="mt-0.5 h-8 bg-white/5 border-white/20 text-white"
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addToArray(name, { downPayment: null, monthly: null, years: null })}
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-white bg-white/10 hover:bg-white/20 rounded border border-dashed border-white/30 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add payment plan
          </button>
        </div>
      );
    }

    if (control === CONTROL_TYPES.LEVELS_ARRAY) {
      const list = Array.isArray(value) ? value : [];
      const defaultRoom = () => ({ displayName: null, furnitureImgId: null, unfurnitureImgId: null, x: null, y: null, hotspots: [] });
      const defaultHotspot = () => ({ yaw: null, pitch: null, type: "scene", label: null });
      const defaultLevel = () => ({ name: null, rooms: [defaultRoom()] });
      return (
        <div key={name} className="space-y-3">
          <Label className="block text-white">{label}</Label>
          {list.map((level, levelIdx) => (
            <div key={levelIdx} className="p-3 rounded-lg border border-white/20 bg-white/5 space-y-3">
              <div className="flex justify-between items-center gap-2">
                <Input
                  placeholder="Level name (e.g. Ground)"
                  value={level.name ?? ""}
                  onChange={(e) => updateArray(name, levelIdx, (l) => ({ ...l, name: e.target.value === "" ? null : e.target.value }))}
                  className="h-8 flex-1 bg-white/5 border-white/20 text-white placeholder:text-white/40"
                />
                <button
                  type="button"
                  onClick={() => removeFromArray(name, levelIdx)}
                  className="p-1.5 rounded hover:bg-red-500/20 text-red-400 shrink-0 transition-colors"
                  title="Remove level"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="pl-2 border-l-2 border-white/20 space-y-2">
                <span className="text-xs font-medium text-white/70">Rooms</span>
                {(level.rooms ?? []).map((room, roomIdx) => (
                  <div key={roomIdx} className="p-2 rounded bg-[#2C2C2C] border border-white/10 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-white/60">Room {roomIdx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const level = list[levelIdx];
                          const rooms = [...(level.rooms ?? [])];
                          rooms.splice(roomIdx, 1);
                          const newRooms = rooms.length === 0 ? [defaultRoom()] : rooms;
                          const levelsCopy = list.map((l, i) => (i === levelIdx ? { ...l, rooms: newRooms } : l));
                          update(name, levelsCopy);
                        }}
                        className="p-1 rounded hover:bg-red-500/20 text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs text-white/80">Display name</Label>
                        <Input
                          value={room.displayName ?? ""}
                          onChange={(e) => {
                            const levelsCopy = [...list];
                            if (!levelsCopy[levelIdx].rooms) levelsCopy[levelIdx].rooms = [];
                            levelsCopy[levelIdx].rooms = [...levelsCopy[levelIdx].rooms];
                            levelsCopy[levelIdx].rooms[roomIdx] = { ...room, displayName: e.target.value === "" ? null : e.target.value };
                            update(name, levelsCopy);
                          }}
                          className="mt-0.5 h-8 bg-white/5 border-white/20 text-white placeholder:text-white/40"
                          placeholder="Living Room"
                        />
                      </div>
                      <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <Label className="text-xs text-white/80">Furniture image</Label>
                          <AssetFieldInput
                            fieldKey={`levels-${levelIdx}-room-${roomIdx}-furnitureImgId`}
                            label=""
                            value={room.furnitureImgId ?? ""}
                            assetPreviewUrl={room.furnitureImgId ? assetPreviewUrls?.[room.furnitureImgId] : null}
                            onChange={(id) => {
                              const levelsCopy = list.map((l, i) =>
                                i === levelIdx
                                  ? { ...l, rooms: (l.rooms ?? []).map((r, ri) => (ri === roomIdx ? { ...r, furnitureImgId: id ?? null } : r)) }
                                  : l
                              );
                              update(name, levelsCopy);
                            }}
                            onFocus={onFieldFocus}
                            isFocused={focusedAssetField === `levels-${levelIdx}-room-${roomIdx}-furnitureImgId`}
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-white/80">Unfurniture image</Label>
                          <AssetFieldInput
                            fieldKey={`levels-${levelIdx}-room-${roomIdx}-unfurnitureImgId`}
                            label=""
                            value={room.unfurnitureImgId ?? ""}
                            assetPreviewUrl={room.unfurnitureImgId ? assetPreviewUrls?.[room.unfurnitureImgId] : null}
                            onChange={(id) => {
                              const levelsCopy = list.map((l, i) =>
                                i === levelIdx
                                  ? { ...l, rooms: (l.rooms ?? []).map((r, ri) => (ri === roomIdx ? { ...r, unfurnitureImgId: id ?? null } : r)) }
                                  : l
                              );
                              update(name, levelsCopy);
                            }}
                            onFocus={onFieldFocus}
                            isFocused={focusedAssetField === `levels-${levelIdx}-room-${roomIdx}-unfurnitureImgId`}
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-white/80">X</Label>
                        <Input
                          type="number"
                          value={room.x === "" || room.x == null ? "" : room.x}
                          onChange={(e) => {
                            const levelsCopy = [...list];
                            if (!levelsCopy[levelIdx].rooms) levelsCopy[levelIdx].rooms = [];
                            levelsCopy[levelIdx].rooms = [...levelsCopy[levelIdx].rooms];
                            levelsCopy[levelIdx].rooms[roomIdx] = { ...room, x: e.target.value === "" ? "" : Number(e.target.value) };
                            update(name, levelsCopy);
                          }}
                          className="mt-0.5 h-8 bg-white/5 border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-white/80">Y</Label>
                        <Input
                          type="number"
                          value={room.y === "" || room.y == null ? "" : room.y}
                          onChange={(e) => {
                            const levelsCopy = [...list];
                            if (!levelsCopy[levelIdx].rooms) levelsCopy[levelIdx].rooms = [];
                            levelsCopy[levelIdx].rooms = [...levelsCopy[levelIdx].rooms];
                            levelsCopy[levelIdx].rooms[roomIdx] = { ...room, y: e.target.value === "" ? null : Number(e.target.value) };
                            update(name, levelsCopy);
                          }}
                          className="mt-0.5 h-8 bg-white/5 border-white/20 text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-white/70">Hotspots</span>
                      {(room.hotspots ?? []).map((hp, hpIdx) => (
                        <div key={hpIdx} className="flex flex-wrap items-center gap-1">
                          <Input type="number" placeholder="yaw" value={hp.yaw ?? ""} onChange={(e) => {
                            const levelsCopy = [...list];
                            if (!levelsCopy[levelIdx].rooms) levelsCopy[levelIdx].rooms = [];
                            levelsCopy[levelIdx].rooms = [...levelsCopy[levelIdx].rooms];
                            const rooms = levelsCopy[levelIdx].rooms[roomIdx].hotspots ? [...levelsCopy[levelIdx].rooms[roomIdx].hotspots] : [];
                            rooms[hpIdx] = { ...hp, yaw: e.target.value === "" ? null : Number(e.target.value) };
                            levelsCopy[levelIdx].rooms[roomIdx] = { ...levelsCopy[levelIdx].rooms[roomIdx], hotspots: rooms };
                            update(name, levelsCopy);
                          }} className="w-16 h-7 text-xs bg-white/5 border-white/20 text-white placeholder:text-white/40" />
                          <Input type="number" placeholder="pitch" value={hp.pitch ?? ""} onChange={(e) => {
                            const levelsCopy = [...list];
                            if (!levelsCopy[levelIdx].rooms) levelsCopy[levelIdx].rooms = [];
                            levelsCopy[levelIdx].rooms = [...levelsCopy[levelIdx].rooms];
                            const rooms = levelsCopy[levelIdx].rooms[roomIdx].hotspots ? [...levelsCopy[levelIdx].rooms[roomIdx].hotspots] : [];
                            rooms[hpIdx] = { ...hp, pitch: e.target.value === "" ? null : Number(e.target.value) };
                            levelsCopy[levelIdx].rooms[roomIdx] = { ...levelsCopy[levelIdx].rooms[roomIdx], hotspots: rooms };
                            update(name, levelsCopy);
                          }} className="w-16 h-7 text-xs bg-white/5 border-white/20 text-white placeholder:text-white/40" />
                          <Input placeholder="type" value={hp.type ?? ""} onChange={(e) => {
                            const levelsCopy = [...list];
                            if (!levelsCopy[levelIdx].rooms) levelsCopy[levelIdx].rooms = [];
                            levelsCopy[levelIdx].rooms = [...levelsCopy[levelIdx].rooms];
                            const rooms = levelsCopy[levelIdx].rooms[roomIdx].hotspots ? [...levelsCopy[levelIdx].rooms[roomIdx].hotspots] : [];
                            rooms[hpIdx] = { ...hp, type: e.target.value || null };
                            levelsCopy[levelIdx].rooms[roomIdx] = { ...levelsCopy[levelIdx].rooms[roomIdx], hotspots: rooms };
                            update(name, levelsCopy);
                          }} className="w-20 h-7 text-xs bg-white/5 border-white/20 text-white placeholder:text-white/40" />
                          <Input placeholder="label" value={hp.label ?? ""} onChange={(e) => {
                            const levelsCopy = [...list];
                            if (!levelsCopy[levelIdx].rooms) levelsCopy[levelIdx].rooms = [];
                            levelsCopy[levelIdx].rooms = [...levelsCopy[levelIdx].rooms];
                            const rooms = levelsCopy[levelIdx].rooms[roomIdx].hotspots ? [...levelsCopy[levelIdx].rooms[roomIdx].hotspots] : [];
                            rooms[hpIdx] = { ...hp, label: e.target.value || null };
                            levelsCopy[levelIdx].rooms[roomIdx] = { ...levelsCopy[levelIdx].rooms[roomIdx], hotspots: rooms };
                            update(name, levelsCopy);
                          }} className="w-20 h-7 text-xs bg-white/5 border-white/20 text-white placeholder:text-white/40" />
                          <button type="button" onClick={() => {
                            const levelsCopy = [...list];
                            if (!levelsCopy[levelIdx].rooms) levelsCopy[levelIdx].rooms = [];
                            levelsCopy[levelIdx].rooms = [...levelsCopy[levelIdx].rooms];
                            const rooms = [...(levelsCopy[levelIdx].rooms[roomIdx].hotspots ?? [])];
                            rooms.splice(hpIdx, 1);
                            levelsCopy[levelIdx].rooms[roomIdx] = { ...levelsCopy[levelIdx].rooms[roomIdx], hotspots: rooms };
                            update(name, levelsCopy);
                          }} className="p-1 text-red-400 hover:bg-red-500/20 rounded transition-colors"><Trash2 className="w-3 h-3" /></button>
                        </div>
                      ))}
                      <button type="button" onClick={() => {
                        const levelsCopy = [...list];
                        if (!levelsCopy[levelIdx].rooms) levelsCopy[levelIdx].rooms = [];
                        levelsCopy[levelIdx].rooms = [...levelsCopy[levelIdx].rooms];
                        levelsCopy[levelIdx].rooms[roomIdx] = { ...levelsCopy[levelIdx].rooms[roomIdx], hotspots: [...(levelsCopy[levelIdx].rooms[roomIdx].hotspots ?? []), defaultHotspot()] };
                        update(name, levelsCopy);
                      }} className="flex items-center gap-1 text-xs text-white bg-white/10 hover:bg-white/20 rounded px-2 py-1 transition-colors"><Plus className="w-3 h-3" /> Hotspot</button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const levelsCopy = list.map((l, i) => (i === levelIdx ? { ...l, rooms: [...(l.rooms ?? []), defaultRoom()] } : l));
                    update(name, levelsCopy);
                  }}
                  className="flex items-center gap-1.5 text-xs text-white bg-white/10 hover:bg-white/20 rounded border border-dashed border-white/30 px-2 py-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Add room
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addToArray(name, defaultLevel())}
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-white bg-white/10 hover:bg-white/20 rounded border border-dashed border-white/30 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add level
          </button>
        </div>
      );
    }

    if (control === CONTROL_TYPES.POSITION_PICKER) {
      const linkedFields = field.linkedFields || ["x", "y"];
      const currentX = linkedFields[0] ? localData[linkedFields[0]] : undefined;
      const currentY = linkedFields[1] ? localData[linkedFields[1]] : undefined;

      // Get video source from parent data (e.g., amenitiesSideVideoId from parent PROJECT for AMENITY)
      let videoSource = null;
      if (parentData?.amenitiesSideVideoId && assetPreviewUrls && selectedNode?.type === ENTITY_TYPES.AMENITY) {
        videoSource = parentData.amenitiesSideVideoId;
      } else if (parentData?.surroundingsSideVideoId && assetPreviewUrls && selectedNode?.type === ENTITY_TYPES.SURROUNDING) {
        videoSource = parentData.surroundingsSideVideoId;
      } else if (parentData?.zonesSideVideoId && assetPreviewUrls && selectedNode?.type === ENTITY_TYPES.ZONE) {
        videoSource = parentData.zonesSideVideoId;
      }

      return (
        <div key={name}>
          <Label className="text-white">{label}{required && " *"}</Label>
          <div className="mt-2 grid grid-cols-3 gap-2">
            <div>
              <Label className="text-xs text-white/80">X</Label>
              <Input
                type="number"
                value={currentX == null || currentX === "" ? "" : currentX}
                onChange={(e) => update(linkedFields[0], e.target.value === "" ? null : Number(e.target.value))}
                className="mt-1 h-9 bg-white/5 border-white/20 text-white"
                placeholder="0.00"
              />
            </div>
            <div>
              <Label className="text-xs text-white/80">Y</Label>
              <Input
                type="number"
                value={currentY == null || currentY === "" ? "" : currentY}
                onChange={(e) => update(linkedFields[1], e.target.value === "" ? null : Number(e.target.value))}
                className="mt-1 h-9 bg-white/5 border-white/20 text-white"
                placeholder="0.00"
              />
            </div>
            <div className="flex flex-col justify-end">
              <PositionPickerButton
                onPositionSelect={(x, y) => {
                  if (linkedFields[0]) update(linkedFields[0], x);
                  if (linkedFields[1]) update(linkedFields[1], y);
                }}
                currentX={currentX}
                currentY={currentY}
                videoSource={videoSource}
              />
            </div>
          </div>
        </div>
      );
    }

    if (control === CONTROL_TYPES.READONLY) {
      return (
        <div key={name}>
          <Label className="text-white">{label}{required && " *"}</Label>
          <Input
            value={value ?? ""}
            className="mt-1 bg-white/5 border-white/20 text-white/60"
            readOnly
            disabled
          />
        </div>
      );
    }

    if (control === CONTROL_TYPES.SELECT) {
      let rawOpts = options;
      if (field.optionsFromApi === "unitType" && Array.isArray(unitTypes)) {
        rawOpts = unitTypes.map((ut) => ({
          value: ut.id,
          label: ut.name || ut.id || "Unnamed",
        }));
      } else if (name === "type" && selectedNode.type === ENTITY_TYPES.PROPERTY) {
        rawOpts = Object.values(PROPERTY_TYPES);
      }
      rawOpts = rawOpts || [];
      const opts = rawOpts.map((opt) =>
        typeof opt === "object" && opt !== null && "value" in opt && "label" in opt
          ? opt
          : { value: opt, label: String(opt) }
      );
      const isBooleanOpts = opts.length > 0 && typeof opts[0].value === "boolean";
      const selectValue =
        value == null
          ? ""
          : value === true
            ? "true"
            : value === false
              ? "false"
              : value;
      const handleSelectChange = (e) => {
        const v = e.target.value;
        if (isBooleanOpts) update(name, v === "true" ? true : v === "false" ? false : v);
        else update(name, v);
      };
      return (
        <div key={name}>
          <Label className="text-white">{label}{required && " *"}</Label>
          <select
            value={selectValue}
            onChange={handleSelectChange}
            className="w-full mt-1 h-9 rounded-md border border-white/20 bg-white/5 text-white px-3 py-1 text-sm"
            required={required}
            disabled={disabled}
          >
            <option value="" className="bg-[#2C2C2C]">Select…</option>
            {opts.map((opt) => (
              <option key={String(opt.value)} value={opt.value === true ? "true" : opt.value === false ? "false" : opt.value} className="bg-[#2C2C2C]">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    if (control === CONTROL_TYPES.NUMBER) {
      return (
        <div key={name}>
          <Label className="text-white">{label}{required && " *"}</Label>
          <Input
            type="number"
            value={value == null || value === "" ? "" : value}
            onChange={(e) => update(name, e.target.value === "" ? null : Number(e.target.value))}
            className="mt-1 bg-white/5 border-white/20 text-white"
            required={required}
            disabled={disabled}
          />
        </div>
      );
    }

    if (control === CONTROL_TYPES.TEXTAREA) {
      return (
        <div key={name}>
          <Label className="text-white">{label}{required && " *"}</Label>
          <textarea
            value={value ?? ""}
            onChange={(e) => update(name, e.target.value === "" ? null : e.target.value)}
            className="w-full mt-1 min-h-[80px] rounded-md border border-white/20 bg-white/5 text-white px-3 py-2 text-sm placeholder:text-white/40"
            required={required}
            disabled={disabled}
          />
        </div>
      );
    }

    return (
      <div key={name}>
        <Label className="text-white">{label}{required && " *"}</Label>
        <Input
          value={value ?? ""}
          onChange={(e) => update(name, e.target.value === "" ? null : e.target.value)}
          className="mt-1 bg-white/5 border-white/20 text-white placeholder:text-white/40"
          placeholder={field.placeholder}
          required={required}
          disabled={disabled}
        />
      </div>
    );
  };

  const renderSchemaField = (key, fieldSchema) => {
    const label = toTitleCase(key);
    const isRequired = fieldSchema.tests?.some((t) => t.name === "required");
    const value = localData[key] ?? null;

    if (key.endsWith("AssetId")) {
      return (
        <AssetFieldInput
          key={key}
          fieldKey={key}
          label={label}
          value={value}
          assetPreviewUrl={value ? assetPreviewUrls?.[value] : null}
          onChange={(id) => update(key, id)}
          onFocus={onFieldFocus}
          isFocused={focusedAssetField === key}
        />
      );
    }
    if (key === "type" && selectedNode.type === ENTITY_TYPES.PROPERTY) {
      return (
        <div key={key}>
          <Label>{label} *</Label>
          <select
            value={value}
            onChange={(e) => update(key, e.target.value)}
            className="w-full mt-1 h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm"
            required
          >
            <option value="">Select…</option>
            {Object.values(PROPERTY_TYPES).map((pt) => (
              <option key={pt} value={pt}>{pt}</option>
            ))}
          </select>
        </div>
      );
    }
    switch (fieldSchema.type) {
      case "number":
        return (
          <div key={key}>
            <Label>{label}{isRequired && " *"}</Label>
            <Input
              type="number"
              value={value == null || value === "" ? "" : value}
              onChange={(e) => update(key, e.target.value === "" ? null : Number(e.target.value))}
              className="mt-1"
              required={isRequired}
            />
          </div>
        );
      case "string":
        return (
          <div key={key}>
            <Label>{label}{isRequired && " *"}</Label>
            <Input
              value={value ?? ""}
              onChange={(e) => update(key, e.target.value === "" ? null : e.target.value)}
              className="mt-1"
              required={isRequired}
              disabled={key.endsWith("Id")}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const formFields = useConfigFields
    ? fields
        .filter((f) => {
          // Skip x and y fields if they're linkedFields of a position picker
          if (f.name === "x" || f.name === "y") {
            const positionPickerField = fields.find(
              (field) =>
                field.control === CONTROL_TYPES.POSITION_PICKER &&
                field.linkedFields &&
                field.linkedFields.includes(f.name)
            );
            if (positionPickerField) return false;
          }
          return true;
        })
        .map((f) => <div key={f.name}>{renderConfigField(f)}</div>)
    : schema && Object.entries(schema.fields).map(([key, fieldSchema]) => (
        <div key={key}>{renderSchemaField(key, fieldSchema)}</div>
      ));

  return (
    <div className="h-full flex flex-col bg-[#2C2C2C]">
      <div className="p-4 border-b border-white/10 bg-[#1C1C1C]">
        <h2 className="text-lg font-semibold capitalize text-white">{config.title} Form</h2>
        <p className="text-sm text-white/60 mt-1">
          {getNodeName(selectedNode)} {selectedNode.id && `· ${selectedNode.id}`}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 overflow-auto p-4 scrollbar-custom">
        <div className="max-w-2xl space-y-4">
          {formFields}

          {nextStep.length > 0 && (
            <div className="mt-6 p-4 rounded-lg border-2 border-white/20 bg-white/5">
              <h3 className="text-sm font-semibold text-white mb-2">Next Steps</h3>
              <p className="text-sm text-white/60 mb-3">After saving, you can add child items.</p>
              <div className="flex flex-wrap gap-2">
                {nextStep.map((childType) => (
                  <Button
                    key={childType}
                    type="button"
                    variant="secondary"
                    onClick={() => onAddChild(childType, selectedNode.id)}
                    className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                  >
                    + Add {resourceConfigs[childType]?.title || toTitleCase(childType)}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-white/10 flex gap-2">
            <Button type="submit" className="bg-white text-black hover:bg-white/90" disabled={isSaving}>
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </>
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="bg-transparent border-white/20 text-white hover:bg-white/10" disabled={isSaving}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
