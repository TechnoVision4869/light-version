import { useState, useEffect } from 'react';
import { Save, X, ImageIcon } from 'lucide-react';
import { TreeNode } from './flow-tree';

interface DynamicFormProps {
  selectedNode: TreeNode | null;
  onSave: (id: string, data: any) => void;
  onCancel: () => void;
  onFieldFocus: (fieldName: string) => void;
  onAddChild: (type: string, parentId: string) => void;
}

export function DynamicForm({ selectedNode, onSave, onCancel, onFieldFocus, onAddChild }: DynamicFormProps) {
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (selectedNode) {
      setFormData(selectedNode.data || {});
    }
  }, [selectedNode]);

  if (!selectedNode) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400 bg-gray-50">
        <div className="text-center">
          <p className="text-lg">No item selected</p>
          <p className="text-sm mt-2">Select an item from the flow tree to edit</p>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(selectedNode.id, formData);
  };

  const handleClearAsset = (fieldName: string) => {
    setFormData({ ...formData, [fieldName]: '' });
  };

  const getFormFields = (type: string, currentData: any) => {
    const commonFields = [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
    ];

    const typeSpecificFields: Record<string, any[]> = {
      developer: [
        { name: 'logo', label: 'Logo', type: 'asset', assetType: 'image' },
        { name: 'website', label: 'Website', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'phone', label: 'Phone', type: 'tel' },
      ],
      project: [
        { name: 'banner', label: 'Banner Image', type: 'asset', assetType: 'image' },
        { name: 'thumbnail', label: 'Thumbnail', type: 'asset', assetType: 'thumbnail' },
        { name: 'startDate', label: 'Start Date', type: 'date' },
        { name: 'status', label: 'Status', type: 'select', options: ['Planning', 'In Progress', 'Completed'] },
      ],
      zone: [
        { name: 'area', label: 'Area (sq ft)', type: 'number' },
        { name: 'zoneType', label: 'Zone Type', type: 'select', options: ['Residential', 'Commercial', 'Mixed'] },
      ],
      property: [
        { name: 'propertyType', label: 'Property Type', type: 'select', options: ['Villa', 'Townhouse', 'Tower'], required: true },
        { name: 'image', label: 'Property Image', type: 'asset', assetType: 'image' },
        { name: 'panorama', label: '360° Panorama', type: 'asset', assetType: 'panorama' },
        { name: 'video', label: 'Video Tour', type: 'asset', assetType: 'video' },
        { name: 'address', label: 'Address', type: 'text' },
        { name: 'price', label: 'Starting Price', type: 'number' },
      ],
      floor: [
        { name: 'floorNumber', label: 'Floor Number', type: 'number', required: true },
        { name: 'floorPlan', label: 'Floor Plan', type: 'asset', assetType: 'image' },
        { name: 'totalUnits', label: 'Total Units on Floor', type: 'number' },
      ],
      unit: [
        { name: 'unitNumber', label: 'Unit Number', type: 'text', required: true },
        { name: 'bedrooms', label: 'Bedrooms', type: 'number' },
        { name: 'bathrooms', label: 'Bathrooms', type: 'number' },
        { name: 'size', label: 'Size (sq ft)', type: 'number' },
        { name: 'unitImage', label: 'Unit Image', type: 'asset', assetType: 'image' },
        { name: 'price', label: 'Price', type: 'number' },
      ],
      block: [
        { name: 'blockName', label: 'Block Name', type: 'text', required: true },
        { name: 'totalUnits', label: 'Total Units in Block', type: 'number' },
        { name: 'blockImage', label: 'Block Image', type: 'asset', assetType: 'image' },
      ],
      amenity: [
        { name: 'amenityType', label: 'Type', type: 'select', options: ['Pool', 'Gym', 'Park', 'Parking', 'Security', 'Clubhouse', 'Playground', 'Other'] },
        { name: 'amenityImage', label: 'Image', type: 'asset', assetType: 'image' },
        { name: 'capacity', label: 'Capacity', type: 'text' },
      ],
      surrounding: [
        { name: 'category', label: 'Category', type: 'select', options: ['School', 'Hospital', 'Mall', 'Restaurant', 'Transport', 'Park', 'Other'] },
        { name: 'distance', label: 'Distance (km)', type: 'number' },
        { name: 'travelTime', label: 'Travel Time (minutes)', type: 'number' },
      ],
    };

    return [...commonFields, ...(typeSpecificFields[type] || [])];
  };

  const renderAssetField = (field: any, value: string) => {
    return (
      <div className="space-y-2">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onFieldFocus(field.name)}
            className="flex-1 px-3 py-2 text-left border-2 border-dashed border-gray-300 rounded hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <div className="flex items-center gap-2 text-sm">
              <ImageIcon className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">
                {value ? 'Change asset' : 'Click to select from library'}
              </span>
            </div>
          </button>
          {value && (
            <button
              type="button"
              onClick={() => handleClearAsset(field.name)}
              className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        
        {value && (
          <div className="border border-gray-200 rounded p-2 bg-gray-50">
            <div className="aspect-video bg-white rounded overflow-hidden">
              {field.assetType === 'video' ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <span className="text-sm text-gray-500">Video: {value}</span>
                </div>
              ) : (
                <img 
                  src={value} 
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1 truncate">{value}</p>
          </div>
        )}
      </div>
    );
  };

  const renderField = (field: any) => {
    const value = formData[field.name] || '';

    if (field.type === 'textarea') {
      return (
        <textarea
          id={field.name}
          value={value}
          onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          required={field.required}
        />
      );
    }

    if (field.type === 'select') {
      return (
        <select
          id={field.name}
          value={value}
          onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required={field.required}
        >
          <option value="">Select...</option>
          {field.options.map((opt: string) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      );
    }

    if (field.type === 'asset') {
      return renderAssetField(field, value);
    }

    return (
      <input
        id={field.name}
        type={field.type}
        value={value}
        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required={field.required}
      />
    );
  };

  const fields = getFormFields(selectedNode.type, formData);

  // Determine next step based on type
  const getNextStepSection = () => {
    if (selectedNode.type === 'property' && formData.propertyType) {
      const propertyType = formData.propertyType;
      if (propertyType === 'Villa') {
        return { label: 'Manage Units', childType: 'unit' };
      } else if (propertyType === 'Townhouse') {
        return { label: 'Manage Blocks', childType: 'block' };
      } else if (propertyType === 'Tower') {
        return { label: 'Manage Floors', childType: 'floor' };
      }
    }
    
    if (selectedNode.type === 'floor') {
      return { label: 'Manage Units', childType: 'unit' };
    }
    
    if (selectedNode.type === 'block') {
      return { label: 'Manage Units', childType: 'unit' };
    }
    
    return null;
  };

  const nextStep = getNextStepSection();

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold capitalize">{selectedNode.type} Form</h2>
        <p className="text-sm text-gray-500 mt-1">ID: {selectedNode.id}</p>
      </div>

      <div className="flex-1 overflow-auto">
        <form onSubmit={handleSubmit} className="p-4">
          <div className="max-w-2xl space-y-4">
            {fields.map(field => (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-medium mb-1">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                  {field.assetType && <span className="text-xs text-gray-400 ml-2">({field.assetType})</span>}
                </label>
                {renderField(field)}
              </div>
            ))}
          </div>

          {/* Next Step Section */}
          {nextStep && (
            <div className="max-w-2xl mt-6 p-4 border-2 border-blue-200 bg-blue-50 rounded">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">Next Step</h3>
              <p className="text-sm text-blue-700 mb-3">
                After saving this {selectedNode.type}, you can add {nextStep.childType}s below.
              </p>
              <button
                type="button"
                onClick={() => onAddChild(nextStep.childType, selectedNode.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                + Add {nextStep.childType}
              </button>
            </div>
          )}
        </form>
      </div>

      <div className="p-4 border-t border-gray-200 flex gap-2 bg-gray-50">
        <button
          type="submit"
          onClick={handleSubmit}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 bg-white"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
      </div>
    </div>
  );
}
