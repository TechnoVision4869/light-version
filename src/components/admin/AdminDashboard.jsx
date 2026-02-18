import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AdminDataTable from "./AdminDataTable";
// import ResourceForm from "./ResourceForm";
import { resourceConfigs } from "./resourceConfigs";
import { toast } from "react-hot-toast";
import { ChevronLeft } from "lucide-react";
import { get } from "lodash"; // Import get from lodash for safe nested access

const AdminDashboard = () => {
  // Path stores { type, id, name, items (for table), data (full API response/details) }
  const [path, setPath] = useState([
    { type: "projects", id: null, name: "Projects", data: null, items: [] },
  ]);
  const [resources, setResources] = useState([]); // This will be the `items` of the current path level
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingResource, setEditingResource] = useState(null);

  // Derive current context from the last item in the path
  const currentPathItem = path[path.length - 1];
  const {
    type: currentResourceType,
    id: currentResourceId,
    data: currentPathData,
    items: currentPathItems,
  } = currentPathItem;

  const currentResourceConfig = resourceConfigs[currentResourceType];

  // Determine parent info for fetching and creating
  const parentPathItem = path.length > 1 ? path[path.length - 2] : null;
  const parentResourceType = parentPathItem?.type;
  const parentResourceId = parentPathItem?.id;
  const parentResourceDetails = parentPathItem?.data; // Full data of the parent

  const getNameFromItem = useCallback((item, type) => {
    const config = resourceConfigs[type];
    if (!config || !item) return item?.id || "Unknown";
    const accessor = config.columns.find(
      (col) =>
        col.header.includes("Name") ||
        col.header.includes("Code") ||
        col.header.includes("Number"),
    )?.accessor;
    return accessor ? get(item, accessor) : item?.id || "Unknown";
  }, []);

  // Memoized function to get fetch method for a given resource type and its parent context
  const getApiFetchMethod = useCallback((resourceType, parentType) => {
    const config = resourceConfigs[resourceType];
    if (!config) return null;

    switch (resourceType) {
      case "projects":
        return config.api.getAll; // Projects always fetch all
      case "zones":
        return (projectId) => config.api.getByProject(projectId);
      case "properties":
        return (zoneId) => config.api.getByZone(zoneId);
      case "floors":
        return (propertyId) => config.api.getByProperty(propertyId);
      case "units":
        if (parentType === "floors")
          return (floorId) => config.api.getByFloor(floorId);
        if (parentType === "properties")
          return (propertyId) => config.api.getByProperty(propertyId);
        if (parentType === "blocks")
          return (blockId) => config.api.getByBlock(blockId); // Assuming getByBlock exists
        return config.api.getAll; // Fallback
      case "amenities": // Project-specific amenities
        return (projectId) => config.api.getAll(projectId);
      case "surroundings": // Project-specific surroundings
        return (projectId) => config.api.getByProject(projectId);
      case "propertyViews": // Property-specific views
        return (propertyId) => config.api.getByProperty(propertyId);
      // For blocks, no direct API in the current setup for getAll, will rely on pre-fetched
      default:
        return config.api.getAll;
    }
  }, []);

  const fetchResources = useCallback(
    async (refreshParentData = false) => {
      if (!currentResourceConfig) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);

      try {
        let fetchedItems = [];
        let fullResponseData = null;

        // 1. Try to get data from parent's pre-fetched data
        if (
          parentPathItem &&
          parentResourceDetails &&
          currentResourceConfig.parentField
        ) {
          // Find the child definition in the parent's config
          const parentConfig = resourceConfigs[parentResourceType];
          if (parentConfig && parentConfig.children) {
            const childKey = Object.keys(parentConfig.children).find(
              (key) =>
                parentConfig.children[key].resourceType === currentResourceType,
            );
            if (childKey && parentConfig.children[childKey].path) {
              fetchedItems = get(
                parentResourceDetails,
                parentConfig.children[childKey].path,
                [],
              );
              fullResponseData = parentResourceDetails; // Use parent's full data
            }
          }
        }

        // 2. If not found in parent data or explicitly refreshing, make an API call
        if (fetchedItems.length === 0 || refreshParentData) {
          const fetchMethod =  (
            currentResourceType,
            parentResourceType,
          );

          if (fetchMethod) {
            if (
              parentResourceId &&
              (currentResourceType === "zones" ||
                currentResourceType === "surroundings" ||
                (currentResourceType === "amenities" &&
                  parentResourceType === "projects"))
            ) {
              fullResponseData = await fetchMethod(parentResourceId);
            } else if (
              parentResourceId &&
              (currentResourceType === "properties" ||
                currentResourceType === "floors" ||
                currentResourceType === "propertyViews" ||
                (currentResourceType === "units" &&
                  (parentResourceType === "properties" ||
                    parentResourceType === "floors" ||
                    parentResourceType === "blocks")))
            ) {
              fullResponseData = await fetchMethod(parentResourceId);
            } else if (currentResourceType === "projects") {
              // Top-level projects
              fullResponseData = await fetchMethod();
            }

            // Extract items from fullResponseData if it's not already an array
            if (Array.isArray(fullResponseData)) {
              fetchedItems = fullResponseData;
            } else if (
              fullResponseData &&
              currentResourceType === "projects" &&
              fullResponseData.developerProjects
            ) {
              // Special handling for initial projects list from your JSON structure
              fetchedItems = fullResponseData.developerProjects.map((proj) => ({
                ...proj,
                id: proj.id || getNameFromItem(proj, "projects"),
              })); // Ensure project has an ID
            } else if (
              fullResponseData &&
              parentPathItem &&
              resourceConfigs[parentResourceType]?.children
            ) {
              const childDef = Object.values(
                resourceConfigs[parentResourceType].children,
              ).find((child) => child.resourceType === currentResourceType);
              if (childDef?.path) {
                fetchedItems = get(fullResponseData, childDef.path, []);
              }
            }
          }
        }

        // Update the path with fetched items and full data
        setPath((prevPath) => {
          const newPath = [...prevPath];
          const lastItemIndex = newPath.length - 1;
          newPath[lastItemIndex] = {
            ...newPath[lastItemIndex],
            data: fullResponseData, // Store full response
            items: fetchedItems, // Store extracted items for display
          };
          return newPath;
        });
        setResources(fetchedItems); // Update display resources
      } catch (err) {
        console.error(`Failed to fetch ${currentResourceType}:`, err);
        setError(`Failed to load ${currentResourceType}.`);
        toast.error(`Failed to load ${currentResourceType}.`);
      } finally {
        setLoading(false);
      }
    },
    [
      currentResourceType,
      currentResourceConfig,
      parentPathItem,
      parentResourceType,
      parentResourceId,
      parentResourceDetails,
      getApiFetchMethod,
      getNameFromItem,
    ],
  );

  useEffect(() => {
    fetchResources();
  }, [fetchResources, path.length]); // Re-fetch when path length changes (navigating up/down)

  const handleCreateOrUpdate = async (formData) => {
    try {
      let dataToSubmit = { ...formData };
      const config = currentResourceConfig;

      // Automatically add parent ID if applicable and not already present
      if (
        parentResourceId &&
        config.parentField &&
        !dataToSubmit[config.parentField]
      ) {
        dataToSubmit[config.parentField] = parentResourceId;
      }

      if (editingResource) {
        await config.api.update(editingResource.id, dataToSubmit);
        toast.success(`${config.title} updated successfully!`);
      } else {
        await config.api.create(dataToSubmit);
        toast.success(`${config.title} created successfully!`);
      }
      setIsFormOpen(false);
      setEditingResource(null);
      fetchResources(true); // Refresh data, potentially re-fetching parent if needed
    } catch (err) {
      console.error("Failed to save resource:", err);
      toast.error(`Failed to save ${currentResourceConfig.title}.`);
    }
  };

  const handleDelete = async (resource) => {
    if (
      window.confirm(
        `Are you sure you want to delete this ${currentResourceConfig.title}?`,
      )
    ) {
      try {
        await currentResourceConfig.api.delete(resource.id);
        toast.success(`${currentResourceConfig.title} deleted successfully!`);
        fetchResources(true); // Refresh data
      } catch (err) {
        console.error("Failed to delete resource:", err);
        toast.error(`Failed to delete ${currentResourceConfig.title}.`);
      }
    }
  };

  const handleEdit = (resource) => {
    setEditingResource(resource);
    setIsFormOpen(true);
  };

  const handleNew = () => {
    setEditingResource(null);
    setIsFormOpen(true);
  };

  const handleDrillDown = (row) => {
    if (!currentResourceConfig || !currentResourceConfig.children) {
      toast(`No drill-down defined for ${currentResourceConfig.title}.`);
      return;
    }

    const nextResourceType = Object.keys(currentResourceConfig.children).find(
      (childKey) => {
        // Find the first child type that matches the current drilling strategy
        // This logic might need refinement based on how you want to prioritize
        // e.g., if a project has zones, amenities, and surroundings, which one should be default?
        // For now, let's just pick the first one from the config
        return currentResourceConfig.children[childKey];
      },
    );

    if (nextResourceType) {
      const childDef = currentResourceConfig.children[nextResourceType];
      const childItems = get(row, childDef.path, []); // Try to extract child items from the row's data

      setPath((prevPath) => [
        ...prevPath.slice(0, prevPath.length), // Keep previous path items
        {
          type: childDef.resourceType,
          id: row.id, // The ID of the parent row we just clicked
          name: getNameFromItem(row, currentResourceType),
          data: row, // Store the full data of the row we just clicked as the parent's data for the next level
          items: childItems, // Pre-fetched child items if available
        },
      ]);
    } else {
      toast(
        `No further drill-down defined for ${currentResourceConfig.title}.`,
      );
    }
  };

  const navigateBack = () => {
    if (path.length > 1) {
      setPath((prevPath) => prevPath.slice(0, prevPath.length - 1));
    }
  };

  if (!currentResourceConfig) {
    return (
      <div className="p-4 text-red-500">
        Invalid resource type or configuration missing.
      </div>
    );
  }
  if (!currentResourceConfig.api) {
    return (
      <div className="p-4 text-red-500">
        API for {currentResourceConfig.title} is not configured.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          {path.length > 1 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={navigateBack}
              className="mr-2"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
          <h1 className="text-2xl font-bold">
            {currentResourceConfig.title}s
            {parentPathItem &&
              ` for ${getNameFromItem(parentResourceDetails, parentResourceType)}`}
          </h1>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="mb-4 text-sm text-gray-500">
        {path.map((item, index) => (
          <span key={item.type + (item.id || "root") + index}>
            {index > 0 && " / "}
            <span
              className={
                index < path.length - 1
                  ? "cursor-pointer hover:text-blue-600"
                  : ""
              }
              onClick={() => setPath(path.slice(0, index + 1))}
            >
              {item.name || resourceConfigs[item.type]?.title || item.type}
            </span>
          </span>
        ))}
      </div>

      <div className="flex justify-end mb-4">
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleNew}>
              Add New {currentResourceConfig.title}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingResource
                  ? `Edit ${currentResourceConfig.title}`
                  : `Add New ${currentResourceConfig.title}`}
              </DialogTitle>
              <DialogDescription>
                {editingResource
                  ? `Make changes to the ${currentResourceConfig.title.toLowerCase()} here.`
                  : `Add a new ${currentResourceConfig.title.toLowerCase()} to your database.`}
              </DialogDescription>
            </DialogHeader>
            {/* <ResourceForm
              initialData={editingResource}
              onSubmit={handleCreateOrUpdate}
              formSchema={currentResourceConfig.schema}
              title={currentResourceConfig.title}
            /> */}
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div>Loading {currentResourceConfig.title}s...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <AdminDataTable
          data={resources}
          columns={currentResourceConfig.columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onRowClick={
            currentResourceConfig.children ? handleDrillDown : undefined
          }
        />
      )}
    </div>
  );
};

export default AdminDashboard;
