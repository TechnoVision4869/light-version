import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function ConfirmDialog({
  open,
  onOpenChange,
  title = "Confirm",
  description,
  onCancel,
  onConfirm,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  confirmClassName = "bg-[#8B3A3A] hover:bg-[#A24242] text-white",
  isLoading = false,
}) {
  const handleCancel = () => {
    onOpenChange(false);
    onCancel?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={true} className="bg-[#1C1C1C] border-white/20">
        <DialogHeader>
          <DialogTitle className="text-white">{title}</DialogTitle>
          {description && <p className="text-sm text-white/70">{description}</p>}
        </DialogHeader>
        <DialogFooter showCloseButton={false}>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
            className="bg-white/10 border border-white/20 text-white hover:bg-white/20"
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={confirmClassName}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}