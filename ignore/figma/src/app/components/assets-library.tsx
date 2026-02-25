import { useState } from 'react';
import { Search, Image, Video, Compass, FileImage, ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { AddAssetModal } from './add-asset-modal';

export interface Asset {
  id: string;
  url: string;
  type: 'image' | 'video' | 'panorama' | 'thumbnail';
  tags: string[];
  name: string;
}

interface AssetsLibraryProps {
  assets: Asset[];
  focusedField: string | null;
  onAssetClick: (asset: Asset) => void;
  onAddAsset: (asset: Omit<Asset, 'id'>) => void;
}

export function AssetsLibrary({ assets, focusedField, onAssetClick, onAddAsset }: AssetsLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [expandedTags, setExpandedTags] = useState<Set<string>>(new Set());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'panorama': return <Compass className="w-4 h-4" />;
      case 'thumbnail': return <FileImage className="w-4 h-4" />;
      default: return null;
    }
  };

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = typeFilter === 'all' || asset.type === typeFilter;
    return matchesSearch && matchesType;
  });

  // Group assets by tag
  const assetsByTag = filteredAssets.reduce((acc, asset) => {
    asset.tags.forEach(tag => {
      if (!acc[tag]) acc[tag] = [];
      acc[tag].push(asset);
    });
    return acc;
  }, {} as Record<string, Asset[]>);

  const toggleTag = (tag: string) => {
    const newExpanded = new Set(expandedTags);
    if (newExpanded.has(tag)) {
      newExpanded.delete(tag);
    } else {
      newExpanded.add(tag);
    }
    setExpandedTags(newExpanded);
  };

  // Get all unique tags for autocomplete
  const allTags = Array.from(new Set(assets.flatMap(asset => asset.tags)));

  return (
    <div className="h-full flex flex-col border-l border-gray-200 bg-white">
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Assets Library</h2>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1 px-2 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Asset
          </button>
        </div>
        
        {focusedField && (
          <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
            <span className="font-medium text-blue-700">Active field:</span>
            <span className="ml-1 text-blue-600">{focusedField}</span>
          </div>
        )}

        <div className="relative mb-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-1">
          <button
            onClick={() => setTypeFilter('all')}
            className={`flex-1 px-2 py-1 text-xs rounded ${typeFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            All
          </button>
          <button
            onClick={() => setTypeFilter('image')}
            className={`flex-1 px-2 py-1 text-xs rounded flex items-center justify-center gap-1 ${typeFilter === 'image' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            <Image className="w-3 h-3" />
            Image
          </button>
          <button
            onClick={() => setTypeFilter('video')}
            className={`flex-1 px-2 py-1 text-xs rounded flex items-center justify-center gap-1 ${typeFilter === 'video' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            <Video className="w-3 h-3" />
            Video
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {Object.keys(assetsByTag).length === 0 ? (
          <div className="p-4 text-sm text-gray-500 text-center">
            No assets found
          </div>
        ) : (
          <div className="p-2">
            {Object.entries(assetsByTag).map(([tag, tagAssets]) => {
              const isExpanded = expandedTags.has(tag);
              
              return (
                <div key={tag} className="mb-2">
                  <button
                    onClick={() => toggleTag(tag)}
                    className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-gray-100 rounded text-sm font-medium"
                  >
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    <span className="flex-1 text-left">{tag}</span>
                    <span className="text-xs text-gray-500">({tagAssets.length})</span>
                  </button>

                  {isExpanded && (
                    <div className="mt-1 space-y-1 pl-6">
                      {tagAssets.map(asset => (
                        <div
                          key={asset.id}
                          onClick={() => onAssetClick(asset)}
                          className="group cursor-pointer border border-gray-200 rounded hover:border-blue-500 hover:shadow-sm transition-all"
                        >
                          <div className="aspect-video bg-gray-100 rounded-t overflow-hidden">
                            {asset.type === 'video' ? (
                              <div className="w-full h-full flex items-center justify-center bg-gray-800">
                                <Video className="w-8 h-8 text-gray-400" />
                              </div>
                            ) : (
                              <img 
                                src={asset.url} 
                                alt={asset.name}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="p-2">
                            <div className="flex items-center gap-1 text-xs">
                              {getTypeIcon(asset.type)}
                              <span className="flex-1 truncate font-medium">{asset.name}</span>
                            </div>
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

      <div className="p-3 border-t border-gray-200 text-xs text-gray-500">
        {filteredAssets.length} asset{filteredAssets.length !== 1 ? 's' : ''} available
      </div>

      {/* Add Asset Modal */}
      <AddAssetModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={onAddAsset}
        existingTags={allTags}
      />
    </div>
  );
}