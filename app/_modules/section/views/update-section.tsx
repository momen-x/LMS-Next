"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import SectionForm from "./section-form";

import { Section } from "../entity/section";
import { CreateSectionData } from "../dto/create-section";
import { useUpdateSection } from "../hooks/useUpdateSection";
import { getErrorMessage } from "@/utils/get-axios-error-message";

interface UpdateSectionProps {
  section: Section;
}

export default function UpdateSection({ section }: UpdateSectionProps) {
  const [open, setOpen] = useState(false);

  const { mutateAsync: updateSection, isPending } = useUpdateSection();

  const handleSubmit = async (data: CreateSectionData) => {
    try {
      await updateSection({
        id: section.id,
        data,
      });

      toast.success("Section updated successfully");
      setOpen(false);
    } catch (error) {
      const errMessage = getErrorMessage(error);
      toast.error(errMessage ?? "Failed to update section");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button type="button" variant="default" size="sm">
            <Pencil className="size-4" />
            Edit
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Section</DialogTitle>

          <DialogDescription>
            Update the section title or order.
          </DialogDescription>
        </DialogHeader>

        <SectionForm
          defaultValues={{
            title: section.title,
            order: section.order,
          }}
          submitLabel="Save Changes"
          isPending={isPending}
          onSubmit={handleSubmit}
        />

        <DialogFooter>
          <DialogClose
            render={
              <Button type="button" variant="outline" disabled={isPending}>
                Cancel
              </Button>
            }
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
