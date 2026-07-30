"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
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

import { useCreateSection } from "../hooks/useCreateSection";
import { CreateSectionData } from "../dto/create-section";

interface CreateSectionProps {
  courseId: string;
  title?: string;
}

export default function CreateSection({ courseId, title }: CreateSectionProps) {
  const [open, setOpen] = useState(false);

  const { mutateAsync: createSection, isPending } = useCreateSection();

  const handleSubmit = async (data: CreateSectionData) => {
    try {
      await createSection({
        courseId,
        data,
      });

      toast.success("Section created successfully");
      setOpen(false);
    } catch {
      toast.error("Failed to create section");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button type="button" className="w-fit mt-2 ">
            <Plus className="size-4" />
            {title ? title : "Create Section"}
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Section</DialogTitle>

          <DialogDescription>
            Add a new section to the course curriculum.
          </DialogDescription>
        </DialogHeader>

        <SectionForm
          submitLabel="Create Section"
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
