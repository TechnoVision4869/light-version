import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const getDefaultValues = (schema, data) => {
  const defaultValues = {};
  if (schema.fields) {
    Object.keys(schema.fields).forEach((fieldName) => {
      const field = schema.fields[fieldName];
      // Initialize with data if available, otherwise with an empty string or 0 for numbers
      if (data && data[fieldName] !== undefined) {
        defaultValues[fieldName] = data[fieldName];
      } else if (field._type === "string") {
        defaultValues[fieldName] = "";
      } else if (field._type === "number") {
        defaultValues[fieldName] = 0; // Or null, depending on desired default for numbers
      }
      // Add other field types as needed
    });
  }
  return defaultValues;
};

const ResourceForm = ({ initialData, onSubmit, formSchema, title }) => {
  // Memoize default values to prevent re-creation on every render if initialData is stable
  const memoizedDefaultValues = useMemo(
    () => getDefaultValues(formSchema, initialData),
    [formSchema, initialData],
  );

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: memoizedDefaultValues,
    mode: "onChange", // Validate on change to provide immediate feedback
  });

  // Use effect to reset the form when initialData (or thus memoizedDefaultValues) changes
  // This is crucial for switching between editing different items or from edit to create
  useEffect(() => {
    form.reset(memoizedDefaultValues);
  }, [memoizedDefaultValues, form]);

  const handleSubmit = (data) => {
    onSubmit(data);
    // Optionally, reset form after successful submission if creating new resource
    // For update, it's usually fine to leave the values as they are, or close the dialog
    if (!initialData) {
      form.reset(getDefaultValues(formSchema, null)); // Reset to empty defaults for new creation
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {formSchema.fields &&
          Object.keys(formSchema.fields).map((fieldName) => {
            const field = formSchema.fields[fieldName];
            // Determine the input type based on schema type
            let inputType = "text";
            if (field._type === "number") {
              inputType = "number";
            }
            // You can extend this to handle other types like 'boolean' (checkbox), 'date', etc.

            return (
              <FormField
                key={fieldName}
                control={form.control}
                name={fieldName}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>
                      {fieldName.charAt(0).toUpperCase() +
                        fieldName
                          .slice(1)
                          .replace(/([A-Z])/g, " $1")
                          .trim()}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          fieldName.charAt(0).toUpperCase() +
                          fieldName
                            .slice(1)
                            .replace(/([A-Z])/g, " $1")
                            .trim()
                        }
                        {...formField}
                        type={inputType}
                        // Handle number input specifically to prevent 'undefined' as value
                        value={
                          formField.value === undefined ||
                          formField.value === null
                            ? ""
                            : formField.value
                        }
                        onChange={(e) => {
                          formField.onChange(
                            inputType === "number"
                              ? parseFloat(e.target.value) || ""
                              : e.target.value,
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}
        <Button type="submit">
          {initialData ? "Update" : "Create"} {title}
        </Button>
      </form>
    </Form>
  );
};

export default ResourceForm;
