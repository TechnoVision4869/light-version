import { ChevronDown, ChevronRight, Plus, Edit, Trash2, Building2, FolderTree, MapPin, Home, Layers, DoorOpen, Box, Trees, Navigation } from 'lucide-react';

export interface TreeNode {
  id: string;
  type: 'developer' | 'project' | 'zone' | 'property' | 'floor' | 'unit' | 'block' | 'amenity' | 'surrounding';
  name: string;
  parentId?: string;
  data?: any;
}

interface FlowTreeProps {
  nodes: TreeNode[];
  selectedId: string | null;
  expandedIds: Set<string>;
  onSelect: (node: TreeNode) => void;
  onToggle: (id: string) => void;
  onAdd: (type: string, parentId?: string) => void;
  onEdit: (node: TreeNode) => void;
  onDelete: (id: string) => void;
}

export function FlowTree({ nodes, selectedId, expandedIds, onSelect, onToggle, onAdd, onEdit, onDelete }: FlowTreeProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'developer': return <Building2 className="w-4 h-4" />;
      case 'project': return <FolderTree className="w-4 h-4" />;
      case 'zone': return <MapPin className="w-4 h-4" />;
      case 'property': return <Home className="w-4 h-4" />;
      case 'floor': return <Layers className="w-4 h-4" />;
      case 'unit': return <DoorOpen className="w-4 h-4" />;
      case 'block': return <Box className="w-4 h-4" />;
      case 'amenity': return <Trees className="w-4 h-4" />;
      case 'surrounding': return <Navigation className="w-4 h-4" />;
      default: return null;
    }
  };

  const getChildren = (parentId: string) => {
    return nodes.filter(node => node.parentId === parentId);
  };

  const hasChildren = (nodeId: string) => {
    return nodes.some(node => node.parentId === nodeId);
  };

  const getChildTypes = (node: TreeNode): string[] => {
    switch (node.type) {
      case 'developer': 
        return ['project'];
      case 'project': 
        return ['zone', 'amenity', 'surrounding'];
      case 'zone': 
        return ['property'];
      case 'property': {
        const propertyType = node.data?.propertyType;
        if (propertyType === 'Villa') return ['unit'];
        if (propertyType === 'Townhouse') return ['block'];
        if (propertyType === 'Tower') return ['floor'];
        return [];
      }
      case 'floor': 
        return ['unit'];
      case 'block': 
        return ['unit'];
      default: 
        return [];
    }
  };

  const renderNode = (node: TreeNode, level: number = 0) => {
    const children = getChildren(node.id);
    const isExpanded = expandedIds.has(node.id);
    const isSelected = selectedId === node.id;
    const canExpand = hasChildren(node.id);
    const childTypes = getChildTypes(node);

    // Display property type badge
    const propertyTypeBadge = node.type === 'property' && node.data?.propertyType ? (
      <span className="text-xs px-1.5 py-0.5 rounded bg-purple-100 text-purple-700">
        {node.data.propertyType}
      </span>
    ) : null;

    return (
      <div key={node.id}>
        <div
          className={`flex items-center gap-2 px-2 py-1.5 hover:bg-gray-100 cursor-pointer group ${isSelected ? 'bg-blue-50 border-l-2 border-blue-500' : ''}`}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (canExpand) onToggle(node.id);
            }}
            className="w-4 h-4 flex items-center justify-center flex-shrink-0"
          >
            {canExpand ? (
              isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
            ) : (
              <span className="w-4"></span>
            )}
          </button>
          
          <div className="flex-1 flex items-center gap-2 min-w-0" onClick={() => onSelect(node)}>
            {getIcon(node.type)}
            <span className="text-sm truncate">{node.name}</span>
            {propertyTypeBadge}
          </div>

          <div className="flex gap-1 opacity-0 group-hover:opacity-100 flex-shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(node);
              }}
              className="p-1 hover:bg-gray-200 rounded"
              title="Edit"
            >
              <Edit className="w-3 h-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(node.id);
              }}
              className="p-1 hover:bg-red-100 rounded"
              title="Delete"
            >
              <Trash2 className="w-3 h-3 text-red-500" />
            </button>
          </div>
        </div>

        {isExpanded && children.length > 0 && (
          <div>
            {children.map(child => renderNode(child, level + 1))}
          </div>
        )}
        
        {isExpanded && childTypes.length > 0 && (
          <div style={{ paddingLeft: `${(level + 1) * 16 + 32}px` }} className="py-1">
            {childTypes.map(type => (
              <button
                key={type}
                onClick={() => onAdd(type, node.id)}
                className="flex items-center gap-2 px-2 py-1 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded"
              >
                <Plus className="w-3 h-3" />
                <span>Add {type}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const developers = nodes.filter(node => node.type === 'developer');

  return (
    <div className="h-full flex flex-col border-r border-gray-200 bg-white">
      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
        <h2 className="font-semibold">Flow Tree</h2>
        <button
          onClick={() => onAdd('developer')}
          className="flex items-center gap-1 px-2 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Developer
        </button>
      </div>
      
      <div className="flex-1 overflow-auto">
        {developers.length === 0 ? (
          <div className="p-4 text-sm text-gray-500 text-center">
            No developers yet. Click "Add Developer" to start.
          </div>
        ) : (
          <div>
            {developers.map(dev => renderNode(dev, 0))}
          </div>
        )}
      </div>
    </div>
  );
}
