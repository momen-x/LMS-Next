import { Award, BriefcaseBusiness, CheckCircle2, Share2 } from "lucide-react";

const informationItems = [
  {
    title: "Validate your skills",
    description:
      "Certificates confirm that you completed the required course content.",
    icon: CheckCircle2,
  },
  {
    title: "Share your achievement",
    description:
      "Use your certificate as proof of completing a learning program.",
    icon: Share2,
  },
  {
    title: "Support your career",
    description:
      "Add your completed learning credentials to your professional profile.",
    icon: BriefcaseBusiness,
  },
];

export default function CertificateInformation() {
  return (
    <aside className="rounded-2xl border bg-card p-5 shadow-sm">
      <h2 className="flex items-center gap-2 font-semibold">
        <Award className="size-4 text-primary" />
        About certificates
      </h2>

      <div className="mt-5 space-y-5">
        {informationItems.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-4" />
              </div>

              <div>
                <h3 className="text-sm font-medium">{item.title}</h3>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
