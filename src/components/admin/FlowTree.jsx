import React from "react";
import {
  ChevronDown,
  ChevronRight,
  Plus,
  Edit,
  Trash2,
  Building2,
  FolderTree,
  MapPin,
  Home,
  Layers,
  DoorOpen,
  Box,
  Trees,
  Navigation,
  Folder, // Import Folder icon
  Feather,
} from "lucide-react";
import { resourceConfigs } from "./resourceConfigs";
import { ENTITY_TYPES } from "./types";
import { cn } from "@/lib/utils";

function getIcon(type) {
  switch (type) {
    case ENTITY_TYPES.DEVELOPER:
      return <Building2 className="w-4 h-4 shrink-0" />;
    case ENTITY_TYPES.PROJECT:
      return <FolderTree className="w-4 h-4 shrink-0" />;
    case ENTITY_TYPES.ZONE:
      return <MapPin className="w-4 h-4 shrink-0" />;
    case ENTITY_TYPES.PROPERTY:
      return <Home className="w-4 h-4 shrink-0" />;
    case ENTITY_TYPES.FLOOR:
      return <Layers className="w-4 h-4 shrink-0" />;
    case ENTITY_TYPES.UNIT:
      return <DoorOpen className="w-4 h-4 shrink-0" />;
    case ENTITY_TYPES.UNIT_TYPE:
      return <Layers className="w-4 h-4 shrink-0" />;
    case ENTITY_TYPES.BLOCK:
      return <Box className="w-4 h-4 shrink-0" />;
    case ENTITY_TYPES.AMENITY:
      return <Trees className="w-4 h-4 shrink-0" />;
    case ENTITY_TYPES.SURROUNDING:
      return <Navigation className="w-4 h-4 shrink-0" />;
    case ENTITY_TYPES.FEATURE:
      return <Feather className="w-4 h-4 shrink-0" />;
    case "FOLDER":
      return <Folder className="w-4 h-4 shrink-0" />;
    default:
      return null;
  }
}

export function FlowTree({
  nodes,
  selectedId,
  expandedIds,
  onSelect,
  onToggle,
  onAdd,
  onEdit,
  onDelete,
}) {
  const getChildren = (parentId) =>
    nodes.filter((n) => n.parentId === parentId);
  const hasChildren = (nodeId) => nodes.some((n) => n.parentId === nodeId);

  const renderNode = (node, level = 0) => {
    const isFolder = node.type === "FOLDER";
    const children = getChildren(node.id);
    const isExpanded = expandedIds.has(node.id);
    const isSelected = !isFolder && selectedId === node.id; // Folders can't be selected
    const canExpand = hasChildren(node.id);

    const config = resourceConfigs[node.type];
    let childTypes = [];
    if (config?.childTypes) {
      if (typeof config.childTypes === "function") {
        childTypes = config.childTypes(node);
      } else {
        childTypes = config.childTypes;
      }
    }
    const allowedChildTypes = childTypes.filter((childType) => {
      const childConfig = resourceConfigs[childType];
      if (childConfig?.canCreateChild) return childConfig.canCreateChild(node);
      return true;
    });

    const propertyType =
      node.type === ENTITY_TYPES.PROPERTY &&
      (node.data?.type || node.data?.propertyType);

    return (
      <div key={node.id}>
        <div
          className={cn(
            "flex items-center gap-2 py-1.5 pr-1 rounded-md group transition-colors cursor-pointer hover:bg-white/5",
            isSelected && "bg-white/10 border-l-2 border-white",
          )}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={(e) => {
            e.stopPropagation();
            if (!isFolder) {
              onSelect(node);
            }
            onToggle(node.id);
          }}
        >
          <div className="w-6 h-6 flex items-center justify-center shrink-0 text-white/70">
            {canExpand ? (
              isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )
            ) : (
              <span className="w-4" />
            )}
          </div>
          <div className="flex-1 flex items-center gap-2 min-w-0">
            <span className="text-white/80">{getIcon(node.type)}</span>
            <span
              className={cn(
                "text-sm truncate text-white",
                isFolder && "font-medium",
              )}
            >
              {node.name}
            </span>
            {propertyType && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-white/10 text-white/80">
                {propertyType}
              </span>
            )}
          </div>
          {!isFolder && (
            <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 shrink-0 transition-opacity">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(node);
                }}
                className="p-1 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                title="Edit"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(node);
                }}
                className="p-1 rounded hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {isExpanded && children.length > 0 && (
          <div>{children.map((child) => renderNode(child, level + 1))}</div>
        )}

        {isExpanded && (isFolder || allowedChildTypes.length > 0) && (
          <div
            style={{ paddingLeft: `${(level + 1) * 16 + 32}px` }}
            className="py-1 space-y-0.5"
          >
            {(isFolder
              ? [node.data?.childType].filter(Boolean)
              : allowedChildTypes
            ).map((childType) => (
              <button
                key={childType}
                type="button"
                onClick={() => onAdd(childType, node.id)}
                className="flex items-center gap-2 px-2 py-1 text-xs text-white/70 hover:bg-white/10 rounded w-full text-left transition-colors hover:text-white"
              >
                <Plus className="w-3 h-3" />
                Add {resourceConfigs[childType]?.title ?? childType}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const rootNodes = getChildren(null);

  return (
    <div className="h-full flex flex-col border-r border-white/10 bg-[#1C1C1C]">
      <div className="p-3 border-b border-white/10 flex items-center justify-between">
        <h2 className="font-semibold text-sm text-white">Flow Tree</h2>
        <button
          type="button"
          onClick={() => onAdd(ENTITY_TYPES.DEVELOPER)}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-white/90 text-black rounded-lg hover:bg-white transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          Developer
        </button>
      </div>
      <div className="flex-1 overflow-auto p-2 scrollbar-custom">
        {rootNodes.length === 0 ? (
          <div className="p-8 text-center">
            <Building2 className="w-12 h-12 mx-auto mb-3 text-white/30" />
            <p className="text-sm text-white/60 mb-2">No developers yet</p>
            <p className="text-xs text-white/40">
              Click &quot;Developer&quot; above to get started
            </p>
          </div>
        ) : (
          rootNodes.map((node) => renderNode(node, 0))
        )}
      </div>
    </div>
  );
}
