import React, { useState, useEffect, useMemo } from "react";
import { Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AssetFieldInput } from "./AssetFieldInput";
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
  onInjectedFieldConsumed,
  onFormAssetIdsChange,
  unitTypes = [],
}) {
  const [localData, setLocalData] = useState({});

  const config = useMemo(() => (selectedNode ? resourceConfigs[selectedNode.type] : null), [selectedNode]);
  const schema = useMemo(() => config?.schema, [config]);
  const fields = config?.fields;
  const useConfigFields = Array.isArray(fields) && fields.length > 0;

  useEffect(() => {
    if (!onFormAssetIdsChange || !fields) return;
    const assetFields = fields.filter((f) => f.control === CONTROL_TYPES.ASSET);
    if (assetFields.length === 0) return;
    const ids = {};
    assetFields.forEach((f) => {
      const v = localData[f.name];
      if (v != null && v !== "") ids[f.name] = v;
    });
    onFormAssetIdsChange(ids);
  }, [localData, fields, onFormAssetIdsChange]);

  useEffect(() => {
    const data = selectedNode?.data;
    if (useConfigFields && fields) {
      const initialData = {};
      fields.forEach((f) => {
        const key = f.name;
        initialData[key] = data?.[key] ?? "";
      });
      setLocalData(initialData);
    } else if (schema) {
      const initialData = {};
      Object.keys(schema.fields).forEach((key) => {
        initialData[key] = data?.[key] ?? (schema.fields[key].default && schema.fields[key].default()) ?? "";
      });
      setLocalData(initialData);
    } else {
      setLocalData(data && typeof data === "object" ? { ...data } : {});
    }
  }, [selectedNode?.id, selectedNode?.data, schema, useConfigFields, fields]);

  const update = (key, value) => {
    setLocalData((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (injectedFieldUpdate?.key != null) {
      const { key, value } = injectedFieldUpdate;
      setLocalData((prev) => ({ ...prev, [key]: value }));
    }
  }, [injectedFieldUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedNode) return;
    onSave(selectedNode.id, selectedNode.type, localData, selectedNode);
  };

  if (!selectedNode) {
    return (
      <div className="h-full flex items-center justify-center bg-muted/30">
        <div className="text-center text-muted-foreground">
          <p className="text-lg">No item selected</p>
          <p className="text-sm mt-2">Select an item from the flow tree or add a new one.</p>
        </div>
      </div>
    );
  }

  if (selectedNode.type === "FOLDER") {
    return (
      <div className="h-full flex items-center justify-center bg-muted/30">
        <div className="text-center text-muted-foreground">
          <p className="text-lg">{selectedNode.name}</p>
          <p className="text-sm mt-2">Select an item or add a new one to this group.</p>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="h-full flex items-center justify-center bg-muted/30">
        <div className="text-center text-destructive">
          <p className="text-lg">Configuration Error</p>
          <p className="text-sm mt-2">No config found for type: {selectedNode.type}</p>
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
    const { name, label, control, required, disabled, options, allowedTypes } = field;
    const value = localData[name] ?? "";

    if (control === CONTROL_TYPES.ASSET) {
      return (
        <AssetFieldInput
          key={name}
          fieldKey={name}
          label={label}
          value={value}
          assetPreviewUrl={value ? assetPreviewUrls?.[value] : null}
          onChange={(id) => update(name, id)}
          onFocus={onFieldFocus}
          isFocused={focusedAssetField === name}
        />
      );
    }

    if (control === CONTROL_TYPES.READONLY) {
      return (
        <div key={name}>
          <Label>{label}{required && " *"}</Label>
          <Input value={value} className="mt-1 bg-muted" readOnly disabled />
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
      const selectValue = value === true ? "true" : value === false ? "false" : value;
      const handleSelectChange = (e) => {
        const v = e.target.value;
        if (isBooleanOpts) update(name, v === "true" ? true : v === "false" ? false : v);
        else update(name, v);
      };
      return (
        <div key={name}>
          <Label>{label}{required && " *"}</Label>
          <select
            value={selectValue}
            onChange={handleSelectChange}
            className="w-full mt-1 h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm"
            required={required}
            disabled={disabled}
          >
            <option value="">Select…</option>
            {opts.map((opt) => (
              <option key={String(opt.value)} value={opt.value === true ? "true" : opt.value === false ? "false" : opt.value}>
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
          <Label>{label}{required && " *"}</Label>
          <Input
            type="number"
            value={value === "" || value == null ? "" : value}
            onChange={(e) => update(name, e.target.value === "" ? null : Number(e.target.value))}
            className="mt-1"
            required={required}
            disabled={disabled}
          />
        </div>
      );
    }

    if (control === CONTROL_TYPES.TEXTAREA) {
      return (
        <div key={name}>
          <Label>{label}{required && " *"}</Label>
          <textarea
            value={value}
            onChange={(e) => update(name, e.target.value)}
            className="w-full mt-1 min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm"
            required={required}
            disabled={disabled}
          />
        </div>
      );
    }

    return (
      <div key={name}>
        <Label>{label}{required && " *"}</Label>
        <Input
          value={value}
          onChange={(e) => update(name, e.target.value)}
          className="mt-1"
          required={required}
          disabled={disabled}
        />
      </div>
    );
  };

  const renderSchemaField = (key, fieldSchema) => {
    const label = toTitleCase(key);
    const isRequired = fieldSchema.tests?.some((t) => t.name === "required");
    const value = localData[key] ?? "";

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
              value={value}
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
              value={value}
              onChange={(e) => update(key, e.target.value)}
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
    ? fields.map((f) => <div key={f.name}>{renderConfigField(f)}</div>)
    : schema && Object.entries(schema.fields).map(([key, fieldSchema]) => (
        <div key={key}>{renderSchemaField(key, fieldSchema)}</div>
      ));

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold capitalize">{config.title} Form</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {getNodeName(selectedNode)} {selectedNode.id && `· ${selectedNode.id}`}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 overflow-auto p-4">
        <div className="max-w-2xl space-y-4">
          {formFields}

          {nextStep.length > 0 && (
            <div className="mt-6 p-4 rounded-lg border-2 border-primary/20 bg-primary/5">
              <h3 className="text-sm font-semibold text-primary mb-2">Next Steps</h3>
              <p className="text-sm text-muted-foreground mb-3">After saving, you can add child items.</p>
              <div className="flex flex-wrap gap-2">
                {nextStep.map((childType) => (
                  <Button
                    key={childType}
                    type="button"
                    variant="secondary"
                    onClick={() => onAddChild(childType, selectedNode.id)}
                  >
                    + Add {resourceConfigs[childType]?.title || toTitleCase(childType)}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-border flex gap-2">
            <Button type="submit">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
