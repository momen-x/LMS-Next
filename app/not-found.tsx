"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home } from "lucide-react";
import notFoundImage from "@/public/assets/not-found.png";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground p-4 transition-colors duration-300">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl -z-10" />

          <Image
            src={notFoundImage}
            alt="Page Not Found Illustration"
            width={256}
            height={256}
            className="object-contain drop-shadow-md dark:drop-shadow-[0_10px_20px_rgba(255,255,255,0.05)]"
            priority
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Page Not Found</h2>
          <p className="text-muted-foreground text-sm max-w-xs mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved to another orbit.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Button
            className="w-full sm:w-auto min-w-32.5 gap-2"
            onClick={() => router.push("/")}
          >
            <Home className="w-4 h-4" />
            Go Home
          </Button>

          <Button
            variant="outline"
            className="w-full sm:w-auto min-w-32.5 gap-2"
            onClick={() => window.history.back()}
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
