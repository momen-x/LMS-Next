"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getErrorMessage } from "@/utils/get-axios-error-message";

type DeleteDialogOptions = {
  title: string;
  description?: string;
  itemName?: string;
  successMessage?: string;
  onConfirm: () => Promise<unknown>;
};

type DeleteDialogContextValue = {
  openDeleteDialog: (options: DeleteDialogOptions) => void;
};

const DeleteDialogContext = createContext<DeleteDialogContextValue | null>(
  null,
);

export function useDeleteDialog() {
  const context = useContext(DeleteDialogContext);

  if (!context) {
    throw new Error("useDeleteDialog must be used within DeleteDialogProvider");
  }

  return context;
}

export function DeleteDialogProvider({ children }: { children: ReactNode }) {
  const [options, setOptions] = useState<DeleteDialogOptions | null>(null);
  const [confirmation, setConfirmation] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const closeDialog = useCallback(() => {
    if (isDeleting) return;
    setOptions(null);
    setConfirmation("");
  }, [isDeleting]);

  const openDeleteDialog = useCallback((nextOptions: DeleteDialogOptions) => {
    setConfirmation("");
    setOptions(nextOptions);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!options || confirmation !== "delete") return;

    try {
      setIsDeleting(true);
      await options.onConfirm();
      toast.success(options.successMessage ?? "Deleted successfully");
      setOptions(null);
      setConfirmation("");
    } catch (error) {
      toast.error(getErrorMessage(error) ?? "Deletion failed. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const value = useMemo(
    () => ({ openDeleteDialog }),
    [openDeleteDialog],
  );

  return (
    <DeleteDialogContext.Provider value={value}>
      {children}

      <Dialog open={Boolean(options)} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent showCloseButton={!isDeleting} className="sm:max-w-md">
          <DialogHeader>
            <div className="mb-1 flex size-11 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <AlertTriangle className="size-5" />
            </div>
            <DialogTitle>{options?.title ?? "Confirm deletion"}</DialogTitle>
            <DialogDescription>
              {options?.description ??
                `Are you sure you want to delete ${options?.itemName ?? "this item"}? This action cannot be undone.`}
            </DialogDescription>
          </DialogHeader>

          <form id="global-delete-form" onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="delete-confirmation">
                Type <span className="font-mono font-semibold text-destructive">delete</span> to confirm
              </Label>
              <Input
                id="delete-confirmation"
                value={confirmation}
                onChange={(event) => setConfirmation(event.target.value)}
                placeholder="delete"
                autoComplete="off"
                disabled={isDeleting}
                autoFocus
              />
            </div>
          </form>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={closeDialog} disabled={isDeleting}>
              Cancel
            </Button>
            <Button
              type="submit"
              form="global-delete-form"
              variant="destructive"
              disabled={confirmation !== "delete" || isDeleting}
            >
              {isDeleting ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DeleteDialogContext.Provider>
  );
}
