import type { Metadata } from "next";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";

import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact | LMS Platform",
  description:
    "Contact the LMS platform developer for questions, technical feedback, or collaboration.",
};

interface ContactMethod {
  title: string;
  value: string;
  description: string;
  href: string;
  external?: boolean;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const contactMethods: ContactMethod[] = [
  {
    title: "Email",
    value: "moamenalswafiri@gmail.com",
    description: "Questions, feedback, support, or project discussions.",
    href: "mailto:moamenalswafiri@gmail.com",
    icon: Mail,
  },
  {
    title: "WhatsApp",
    value: "Chat on WhatsApp",
    description: "Quick questions, direct messages, or voice notes.",
    href: "https://wa.me/970598817322",
    external: true,
    icon: WhatsAppIcon,
  },
  {
    title: "GitHub",
    value: "View development work",
    description: "Explore source code, projects, and technical experiments.",
    href: "https://github.com/momen-x",
    external: true,
    icon: GitHubIcon,
  },
  {
    title: "LinkedIn",
    value: "Connect professionally",
    description: "Professional networking, opportunities, and collaboration.",
    href: "https://www.linkedin.com/in/mo%E2%80%99men-alswafiri-8b6491346",
    external: true,
    icon: LinkedInIcon,
  },
];

export default function ContactPage() {
  return (
    <main className="bg-background text-foreground">
      {/* Hero */}
      <section className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-20">
          <div className="max-w-2xl">
            <Badge variant="outline" className="gap-2">
              <MessageCircle className="size-3.5" />
              Contact
            </Badge>

            <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
              Let&apos;s start a conversation.
            </h1>

            <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
              Have a question about the platform, found a technical issue, or
              want to discuss a project? Reach out using any of the options
              below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact content */}
      <section className="mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          {/* Main methods */}
          <div>
            <div>
              <p className="text-sm font-medium text-primary">
                Contact information
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight">
                Choose the best way to reach me.
              </h2>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {contactMethods.map((method) => {
                const Icon = method.icon;

                return (
                  <Link
                    key={method.title}
                    href={method.href}
                    target={method.external ? "_blank" : undefined}
                    rel={method.external ? "noopener noreferrer" : undefined}
                    className={cn(
                      "group rounded-2xl border bg-card p-5 transition-all",
                      "hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md",
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-muted-foreground">
                          {method.title}
                        </p>

                        <h3 className="mt-1 truncate font-semibold">
                          {method.value}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {method.description}
                        </p>
                      </div>

                      <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Side panel */}
          <aside className="space-y-4">
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Mail className="size-5" />
              </div>

              <h2 className="mt-5 text-xl font-semibold">
                Send a direct email
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Email is the best option for detailed questions, technical
                feedback, or professional opportunities.
              </p>

              <Link
                href="mailto:mazenmoabdo@gmail.com"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "mt-5 w-full gap-2",
                )}
              >
                <Mail className="size-4" />
                Send email
              </Link>
            </div>

            <div className="rounded-2xl border bg-card p-5">
              <ContactDetail
                icon={Clock3}
                title="Response time"
                value="Usually within 1–3 business days"
              />

              <div className="my-4 border-t" />

              <ContactDetail icon={MapPin} title="Location" value="Palestine" />
            </div>
          </aside>
        </div>
      </section>

      {/* Safety notice */}
      <section className="border-y bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
          <div className="flex flex-col gap-4 rounded-2xl border bg-background p-5 sm:flex-row sm:items-start">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="size-5" />
            </div>

            <div>
              <h2 className="font-semibold">Before contacting support</h2>

              <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">
                Include a clear description of the page or feature involved.
                Never send passwords, payment card details, authentication
                tokens, or other sensitive credentials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-12 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <h2 className="text-xl font-semibold">
              Want to know more about the platform?
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Explore the mission, features, architecture, and development
              approach.
            </p>
          </div>

          <Link
            href="/about"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "shrink-0 gap-2",
            )}
          >
            About the platform
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}

interface ContactDetailProps {
  icon: typeof Clock3;
  title: string;
  value: string;
}

function ContactDetail({ icon: Icon, title, value }: ContactDetailProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Icon className="size-4" />
      </div>

      <div>
        <p className="text-xs font-medium text-muted-foreground">{title}</p>
        <p className="mt-1 text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .7a11.3 11.3 0 0 0-3.57 22c.57.1.77-.24.77-.54v-2.18c-3.14.68-3.8-1.34-3.8-1.34-.52-1.3-1.26-1.65-1.26-1.65-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.5-.29-5.14-1.25-5.14-5.58 0-1.23.44-2.24 1.17-3.03-.12-.29-.51-1.44.11-2.99 0 0 .95-.3 3.11 1.16A10.8 10.8 0 0 1 12 6.08c.96 0 1.92.13 2.82.38 2.16-1.46 3.11-1.16 3.11-1.16.62 1.55.23 2.7.11 2.99.73.79 1.17 1.8 1.17 3.03 0 4.34-2.64 5.29-5.15 5.57.41.35.77 1.04.77 2.09v3.19c0 .3.2.65.78.54A11.3 11.3 0 0 0 12 .7Z" />
    </svg>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M5.3 7.8H1.7V22h3.6V7.8ZM3.5 2A2.1 2.1 0 1 0 3.5 6.2 2.1 2.1 0 0 0 3.5 2ZM22.3 13.9c0-4.3-2.3-6.3-5.4-6.3-2.5 0-3.6 1.4-4.2 2.3V7.8H9.1V22h3.6v-7c0-1.8.3-3.6 2.6-3.6 2.2 0 2.3 2.1 2.3 3.7V22h3.6l1.1-8.1Z" />
    </svg>
  );
}
function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
