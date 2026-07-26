"use client";

import { Loader2, Send, TriangleAlert } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
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

type SubmitQuizDialogProps = {
  answeredQuestions: number;
  totalQuestions: number;
  isSubmitting: boolean;
  disabled?: boolean;
  onSubmit: () => Promise<void>;
};

export default function SubmitQuizDialog({
  answeredQuestions,
  totalQuestions,
  isSubmitting,
  disabled = false,
  onSubmit,
}: SubmitQuizDialogProps) {
  const unansweredQuestions = totalQuestions - answeredQuestions;

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="destructive"
            disabled={disabled || isSubmitting}
          >
            <Send className="size-4" />
            Submit Quiz
          </Button>
        }
      ></DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit Quiz?</DialogTitle>

          <DialogDescription>
            After submitting, you will not be able to change your answers.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border p-4 text-center">
              <p className="text-sm text-muted-foreground">Answered</p>

              <p className="mt-1 text-2xl font-bold">{answeredQuestions}</p>
            </div>

            <div className="rounded-xl border p-4 text-center">
              <p className="text-sm text-muted-foreground">Total questions</p>

              <p className="mt-1 text-2xl font-bold">{totalQuestions}</p>
            </div>
          </div>

          {unansweredQuestions > 0 && (
            <Alert>
              <TriangleAlert className="size-4" />

              <AlertDescription>
                You have {unansweredQuestions} unanswered{" "}
                {unansweredQuestions === 1 ? "question" : "questions"}.
                Unanswered questions will be counted as incorrect.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <DialogClose
            render={
              <Button type="button" variant="outline" disabled={isSubmitting}>
                Cancel
              </Button>
            }
          ></DialogClose>

          <Button
            type="button"
            variant="destructive"
            disabled={isSubmitting}
            onClick={onSubmit}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="size-4" />
                Yes, Submit
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
