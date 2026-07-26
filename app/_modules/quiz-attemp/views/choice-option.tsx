"use client";

import { Check, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

import { Choice } from "@/app/_modules/choice/entity/choice";

type ChoiceOptionProps = {
  choice: Choice;
  index: number;
  selected: boolean;
  disabled?: boolean;
  isSaving?: boolean;
  onSelect: (choiceId: string) => void;
};

export default function ChoiceOption({
  choice,
  index,
  selected,
  disabled = false,
  isSaving = false,
  onSelect,
}: ChoiceOptionProps) {
  const label = String.fromCharCode(65 + index);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onSelect(choice.id)}
      className={cn(
        "flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-colors",
        "hover:border-primary/60 hover:bg-primary/5",
        "disabled:cursor-not-allowed disabled:opacity-70",
        selected && "border-primary bg-primary/5 ring-1 ring-primary",
      )}
    >
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-full border font-semibold",
          selected && "border-primary bg-primary text-primary-foreground",
        )}
      >
        {isSaving ? (
          <Loader2 className="size-4 animate-spin" />
        ) : selected ? (
          <Check className="size-4" />
        ) : (
          label
        )}
      </span>

      <span className="flex-1 font-medium">{choice.text}</span>
    </button>
  );
}
