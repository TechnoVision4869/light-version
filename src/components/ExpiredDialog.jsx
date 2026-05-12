import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../components/ui/dialog";
import { Button } from "../components/ui/button";

export default function ExpiredDialog({ open }) {
  return (
    <Dialog open={open}>
      <DialogContent showCloseButton={false} className="bg-zinc-900 text-white">
        <DialogTitle className="text-white">App Expired</DialogTitle>
        <DialogDescription className="text-zinc-300">
          This version of the app is no longer available. Please contact support.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
