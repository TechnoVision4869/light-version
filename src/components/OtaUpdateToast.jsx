import toast from "react-hot-toast";
import { CapacitorUpdater } from "@capgo/capacitor-updater";
import { Button } from "@/components/ui/button";

const TOAST_ID = "ota-update-ready";

export function showUpdateReadyToast(bundle) {
  toast(
    (t) => (
      <div className="flex items-center gap-3">
        <span>Update ready — restart to apply.</span>
        <Button
          size="sm"
          onClick={async () => {
            try {
              await CapacitorUpdater.set({ id: bundle.id });
            } catch (error) {
              console.warn("Failed to apply OTA update", error);
              toast.error("Update failed to apply — please try again.", { id: TOAST_ID });
            }
          }}
        >
          Restart Now
        </Button>
        <Button size="sm" variant="outline" onClick={() => toast.dismiss(t.id)}>
          Later
        </Button>
      </div>
    ),
    { id: TOAST_ID, duration: Infinity },
  );
}
