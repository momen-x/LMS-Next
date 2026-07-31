"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Certificate } from "../entity/certificate";
import CertificateDetails from "./certificate-details";

interface CertificatePreviewDialogProps {
  certificate: Certificate | null;
  onOpenChange: (open: boolean) => void;
}

export default function CertificatePreviewDialog({
  certificate,
  onOpenChange,
}: CertificatePreviewDialogProps) {
  return (
    <Dialog open={certificate !== null} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] max-w-2xl overflow-y-auto p-0">
        <DialogHeader className="border-b p-4">
          <DialogTitle className="text-base">Certificate details</DialogTitle>
        </DialogHeader>

        {certificate && (
          <div className="p-4">
            <CertificateDetails certificate={certificate} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
