import { Award, Calendar } from "lucide-react";

import { Certificate } from "../entities/certificate";
import transformingTheDateToATextString from "@/utils/from-date-to-string";

interface CertificateStatsProps {
  certificates: Certificate[];
}

export default function CertificateStats({
  certificates,
}: CertificateStatsProps) {
  const latestCertificate = [...certificates].sort(
    (firstCertificate, secondCertificate) =>
      new Date(secondCertificate.issueDate).getTime() -
      new Date(firstCertificate.issueDate).getTime(),
  )[0];

  const lastEarnedDate = latestCertificate
    ? transformingTheDateToATextString(latestCertificate.issueDate)
    : "No certificates yet";

  return (
    <section className="rounded-2xl border bg-card p-5 shadow-sm">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Award className="size-5" />
          </div>

          <div>
            <p className="text-xl font-bold">{certificates.length}</p>
            <p className="text-xs text-muted-foreground">Certificates earned</p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:border-l sm:pl-5">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Calendar className="size-5" />
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Last certificate</p>

            <p className="mt-1 text-sm font-semibold">{lastEarnedDate}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
