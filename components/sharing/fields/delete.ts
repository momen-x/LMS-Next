import { TDelete } from "@/dto/delete";
import { FormField } from "@/types/form-fields";
import { Delete } from "lucide-react";

export const deleteFields = [
  {
    name: "delete",
    title: 'To confirm, type "DELETE" in the box below:',
    placeholder: "DELETE",
    Icon: Delete,
    type: "text",
  },
] satisfies FormField<keyof TDelete & string>[];
