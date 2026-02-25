import { useState } from 'react';
import { FlowTree, TreeNode } from './components/flow-tree';
import { DynamicForm } from './components/dynamic-form';
import { AssetsLibrary, Asset } from './components/assets-library';

function App() {
  const [nodes, setNodes] = useState<TreeNode[]>([
    // Developer
    {
      id: 'dev1',
      type: 'developer',
      name: 'Premium Developers Inc.',
      data: {
        name: 'Premium Developers Inc.',
        description: 'Leading luxury real estate developer',
        website: 'https://premiumdev.com',
        email: 'info@premiumdev.com',
        phone: '+1-555-0100',
      }
    },
    // Project
    {
      id: 'proj1',
      type: 'project',
      name: 'Grand Vista Residences',
      parentId: 'dev1',
      data: {
        name: 'Grand Vista Residences',
        description: 'Luxury mixed-type residential community',
        status: 'In Progress',
      }
    },
    // Zone
    {
      id: 'zone1',
      type: 'zone',
      name: 'Phase 1 - North Quarter',
      parentId: 'proj1',
      data: {
        name: 'Phase 1 - North Quarter',
        description: 'First development phase',
        area: 150000,
        zoneType: 'Residential',
      }
    },
    // Property 1: Villa
    {
      id: 'prop1',
      type: 'property',
      name: 'Sunset Villa Collection',
      parentId: 'zone1',
      data: {
        name: 'Sunset Villa Collection',
        description: 'Standalone luxury villas',
        propertyType: 'Villa',
        address: '100 Palm Drive',
        price: 2500000,
      }
    },
    // Villa -> Units
    {
      id: 'unit1',
      type: 'unit',
      name: 'Villa A1',
      parentId: 'prop1',
      data: {
        name: 'Villa A1',
        unitNumber: 'A1',
        bedrooms: 5,
        bathrooms: 6,
        size: 6500,
        price: 2800000,
      }
    },
    {
      id: 'unit2',
      type: 'unit',
      name: 'Villa A2',
      parentId: 'prop1',
      data: {
        name: 'Villa A2',
        unitNumber: 'A2',
        bedrooms: 4,
        bathrooms: 5,
        size: 5200,
        price: 2600000,
      }
    },
    // Property 2: Townhouse
    {
      id: 'prop2',
      type: 'property',
      name: 'Garden Townhouses',
      parentId: 'zone1',
      data: {
        name: 'Garden Townhouses',
        description: 'Modern townhouse community',
        propertyType: 'Townhouse',
        address: '200 Oak Lane',
        price: 850000,
      }
    },
    // Townhouse -> Block
    {
      id: 'block1',
      type: 'block',
      name: 'Block B',
      parentId: 'prop2',
      data: {
        name: 'Block B',
        blockName: 'Block B',
        totalUnits: 8,
      }
    },
    // Block -> Units
    {
      id: 'unit3',
      type: 'unit',
      name: 'Unit B-1',
      parentId: 'block1',
      data: {
        name: 'Unit B-1',
        unitNumber: 'B-1',
        bedrooms: 3,
        bathrooms: 3,
        size: 2200,
        price: 890000,
      }
    },
    {
      id: 'unit4',
      type: 'unit',
      name: 'Unit B-2',
      parentId: 'block1',
      data: {
        name: 'Unit B-2',
        unitNumber: 'B-2',
        bedrooms: 3,
        bathrooms: 2,
        size: 1950,
        price: 850000,
      }
    },
    // Property 3: Tower
    {
      id: 'prop3',
      type: 'property',
      name: 'Skyline Tower',
      parentId: 'zone1',
      data: {
        name: 'Skyline Tower',
        description: 'High-rise luxury apartments',
        propertyType: 'Tower',
        address: '300 Main Boulevard',
        price: 450000,
      }
    },
    // Tower -> Floor
    {
      id: 'floor1',
      type: 'floor',
      name: 'Floor 10',
      parentId: 'prop3',
      data: {
        name: 'Floor 10',
        floorNumber: 10,
        totalUnits: 6,
      }
    },
    // Floor -> Units
    {
      id: 'unit5',
      type: 'unit',
      name: 'Unit 1001',
      parentId: 'floor1',
      data: {
        name: 'Unit 1001',
        unitNumber: '1001',
        bedrooms: 2,
        bathrooms: 2,
        size: 1200,
        price: 480000,
      }
    },
    {
      id: 'unit6',
      type: 'unit',
      name: 'Unit 1002',
      parentId: 'floor1',
      data: {
        name: 'Unit 1002',
        unitNumber: '1002',
        bedrooms: 3,
        bathrooms: 2,
        size: 1650,
        price: 620000,
      }
    },
    // Floor 15
    {
      id: 'floor2',
      type: 'floor',
      name: 'Floor 15',
      parentId: 'prop3',
      data: {
        name: 'Floor 15',
        floorNumber: 15,
        totalUnits: 4,
      }
    },
    {
      id: 'unit7',
      type: 'unit',
      name: 'Unit 1501',
      parentId: 'floor2',
      data: {
        name: 'Unit 1501',
        unitNumber: '1501',
        bedrooms: 2,
        bathrooms: 2,
        size: 1300,
        price: 520000,
      }
    },
    // Project-level: Amenities
    {
      id: 'amenity1',
      type: 'amenity',
      name: 'Olympic Pool',
      parentId: 'proj1',
      data: {
        name: 'Olympic Pool',
        amenityType: 'Pool',
        capacity: '50 people',
      }
    },
    {
      id: 'amenity2',
      type: 'amenity',
      name: 'Fitness Center',
      parentId: 'proj1',
      data: {
        name: 'Fitness Center',
        amenityType: 'Gym',
        capacity: '30 people',
      }
    },
    // Project-level: Surroundings
    {
      id: 'surr1',
      type: 'surrounding',
      name: 'Green Valley School',
      parentId: 'proj1',
      data: {
        name: 'Green Valley School',
        category: 'School',
        distance: 1.2,
        travelTime: 5,
      }
    },
    {
      id: 'surr2',
      type: 'surrounding',
      name: 'City Mall',
      parentId: 'proj1',
      data: {
        name: 'City Mall',
        category: 'Mall',
        distance: 3.5,
        travelTime: 10,
      }
    },
  ]);

  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(nodes[0]);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(['dev1', 'proj1', 'zone1', 'prop1', 'prop2', 'prop3', 'block1', 'floor1', 'floor2'])
  );
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [nextId, setNextId] = useState(1000);

  // Mock assets data
  const [assets, setAssets] = useState<Asset[]>([
    {
      id: 'asset1',
      url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400',
      type: 'image',
      tags: ['Exterior', 'Villa'],
      name: 'Luxury Villa Exterior',
    },
    {
      id: 'asset2',
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
      type: 'image',
      tags: ['Exterior', 'Townhouse'],
      name: 'Modern Townhouse',
    },
    {
      id: 'asset3',
      url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
      type: 'image',
      tags: ['Exterior', 'Tower'],
      name: 'High-rise Tower',
    },
    {
      id: 'asset4',
      url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
      type: 'image',
      tags: ['Interior', 'Living'],
      name: 'Luxury Living Room',
    },
    {
      id: 'asset5',
      url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400',
      type: 'image',
      tags: ['Interior', 'Bedroom'],
      name: 'Master Bedroom',
    },
    {
      id: 'asset6',
      url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400',
      type: 'image',
      tags: ['Interior', 'Kitchen'],
      name: 'Modern Kitchen',
    },
    {
      id: 'asset7',
      url: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=400',
      type: 'image',
      tags: ['Interior', 'Bathroom'],
      name: 'Luxury Bathroom',
    },
    {
      id: 'asset8',
      url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
      type: 'image',
      tags: ['Amenities', 'Pool'],
      name: 'Swimming Pool',
    },
    {
      id: 'asset9',
      url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400',
      type: 'image',
      tags: ['Amenities', 'Gym'],
      name: 'Fitness Center',
    },
    {
      id: 'asset10',
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      type: 'image',
      tags: ['Amenities', 'Park'],
      name: 'Garden Park',
    },
    {
      id: 'asset11',
      url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200',
      type: 'thumbnail',
      tags: ['Thumbnail', 'Villa'],
      name: 'Villa Thumbnail',
    },
    {
      id: 'asset12',
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200',
      type: 'thumbnail',
      tags: ['Thumbnail', 'Townhouse'],
      name: 'Townhouse Thumbnail',
    },
    {
      id: 'asset13',
      url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200',
      type: 'thumbnail',
      tags: ['Thumbnail', 'Tower'],
      name: 'Tower Thumbnail',
    },
    {
      id: 'asset14',
      url: 'https://example.com/villa-tour.mp4',
      type: 'video',
      tags: ['Video', 'Villa'],
      name: 'Villa Walkthrough',
    },
    {
      id: 'asset15',
      url: 'https://example.com/tower-tour.mp4',
      type: 'video',
      tags: ['Video', 'Tower'],
      name: 'Tower Virtual Tour',
    },
    {
      id: 'asset16',
      url: 'https://example.com/living-360.jpg',
      type: 'panorama',
      tags: ['360°', 'Interior'],
      name: 'Living Room 360°',
    },
    {
      id: 'asset17',
      url: 'https://example.com/penthouse-360.jpg',
      type: 'panorama',
      tags: ['360°', 'Interior'],
      name: 'Penthouse 360°',
    },
    {
      id: 'asset18',
      url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400',
      type: 'image',
      tags: ['FloorPlan', 'Layout'],
      name: 'Floor Plan Blueprint',
    },
    {
      id: 'asset19',
      url: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=400',
      type: 'image',
      tags: ['FloorPlan', 'Layout'],
      name: 'Unit Layout Plan',
    },
  ]);

  const handleToggle = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  const handleSelect = (node: TreeNode) => {
    setSelectedNode(node);
    setFocusedField(null);
  };

  const handleAdd = (type: string, parentId?: string) => {
    const newNode: TreeNode = {
      id: `node${nextId}`,
      type: type as any,
      name: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      parentId,
      data: {
        name: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      }
    };
    
    setNodes([...nodes, newNode]);
    setNextId(nextId + 1);
    setSelectedNode(newNode);
    
    // Auto-expand parent
    if (parentId) {
      setExpandedIds(new Set([...expandedIds, parentId]));
    }
  };

  const handleEdit = (node: TreeNode) => {
    setSelectedNode(node);
  };

  const handleDelete = (id: string) => {
    // Find all children recursively
    const getDescendants = (nodeId: string): string[] => {
      const children = nodes.filter(n => n.parentId === nodeId);
      return [nodeId, ...children.flatMap(child => getDescendants(child.id))];
    };

    const toDelete = getDescendants(id);
    setNodes(nodes.filter(n => !toDelete.includes(n.id)));
    
    if (selectedNode && toDelete.includes(selectedNode.id)) {
      setSelectedNode(null);
    }
  };

  const handleSave = (id: string, data: any) => {
    setNodes(nodes.map(node => 
      node.id === id 
        ? { ...node, name: data.name || node.name, data }
        : node
    ));
    
    if (selectedNode?.id === id) {
      setSelectedNode({ ...selectedNode, name: data.name || selectedNode.name, data });
    }
  };

  const handleCancel = () => {
    setFocusedField(null);
  };

  const handleAssetClick = (asset: Asset) => {
    if (!focusedField || !selectedNode) return;

    const updatedData = {
      ...selectedNode.data,
      [focusedField]: asset.url,
    };

    handleSave(selectedNode.id, updatedData);
    setFocusedField(null);
  };

  const handleAddAsset = (assetData: Omit<Asset, 'id'>) => {
    const newAsset: Asset = {
      id: `asset${nextId}`,
      ...assetData,
    };
    setAssets([...assets, newAsset]);
    setNextId(nextId + 1);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-bold">Real Estate Admin Dashboard</h1>
        <p className="text-sm text-gray-500">Property Management System with Conditional Hierarchy</p>
      </header>

      {/* Three-panel layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT: Flow Tree */}
        <div className="w-80">
          <FlowTree
            nodes={nodes}
            selectedId={selectedNode?.id || null}
            expandedIds={expandedIds}
            onSelect={handleSelect}
            onToggle={handleToggle}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        {/* CENTER: Dynamic Form */}
        <div className="flex-1">
          <DynamicForm
            selectedNode={selectedNode}
            onSave={handleSave}
            onCancel={handleCancel}
            onFieldFocus={setFocusedField}
            onAddChild={handleAdd}
          />
        </div>

        {/* RIGHT: Assets Library */}
        <div className="w-80">
          <AssetsLibrary
            assets={assets}
            focusedField={focusedField}
            onAssetClick={handleAssetClick}
            onAddAsset={handleAddAsset}
          />
        </div>
      </div>
    </div>
  );
}

export default App;