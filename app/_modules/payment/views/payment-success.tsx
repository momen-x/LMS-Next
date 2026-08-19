"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  CircleX,
  Clock3,
  CreditCard,
  Loader2,
  ReceiptText,
  RefreshCw,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getErrorMessage } from "@/utils/get-axios-error-message";

import { useVerifyCheckoutSession } from "@/app/_modules/payment/hooks/useVerifyCheckoutSession";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const {
    data: payment,
    isPending,
    isError,
    error,
    isFetching,
    refetch,
  } = useVerifyCheckoutSession(sessionId);

  if (!sessionId) {
    return (
      <PaymentState
        icon={<ReceiptText className="size-10 text-muted-foreground" />}
        title="Missing checkout session"
        description="The Stripe checkout session ID was not found in the URL."
      >
        <Link
          href="/courses"
          className={buttonVariants({ variant: "outline" })}
        >
          Return to courses
        </Link>
      </PaymentState>
    );
  }

  if (isPending) {
    return (
      <PaymentState
        icon={<Loader2 className="size-10 animate-spin text-primary" />}
        title="Confirming your payment"
        description="Stripe returned successfully. We are verifying your payment and activating your enrollment."
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock3 className="size-4" />
          This usually takes only a few seconds.
        </div>
      </PaymentState>
    );
  }

  if (isError) {
    return (
      <PaymentState
        icon={<CircleX className="size-10 text-destructive" />}
        title="Unable to verify payment"
        description={getErrorMessage(error)}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            disabled={isFetching}
            onClick={() => refetch()}
          >
            {isFetching ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <RefreshCw className="size-4" />
            )}
            Try again
          </Button>

          <Link
            href="/student-dashboard/my-learning"
            className={buttonVariants()}
          >
            Check My Learning
          </Link>
        </div>
      </PaymentState>
    );
  }

  if (!payment) {
    return null;
  }

  if (payment.status === "pending") {
    return (
      <PaymentState
        icon={<Loader2 className="size-10 animate-spin text-amber-500" />}
        title="Payment is processing"
        description="Your payment is still being confirmed. The page will update automatically."
      >
        <p className="text-sm text-muted-foreground">
          Please keep this page open for a moment.
        </p>
      </PaymentState>
    );
  }

  if (payment.status === "failed" || payment.status === "expired") {
    return (
      <PaymentState
        icon={<CircleX className="size-10 text-destructive" />}
        title={
          payment.status === "expired"
            ? "Checkout session expired"
            : "Payment failed"
        }
        description="Your enrollment was not activated. You can return to the course and try again."
      >
        <Link
          href={`/courses/${payment.courseId}`}
          className={buttonVariants()}
        >
          Return to course
        </Link>
      </PaymentState>
    );
  }

  if (payment.status === "refunded") {
    return (
      <PaymentState
        icon={<CreditCard className="size-10 text-amber-500" />}
        title="Payment refunded"
        description="This payment has been refunded."
      >
        <Link
          href="/courses"
          className={buttonVariants({ variant: "outline" })}
        >
          Browse courses
        </Link>
      </PaymentState>
    );
  }

  return (
    <main className="container mx-auto px-4 py-10 md:px-6 md:py-14">
      <Card className="mx-auto max-w-4xl overflow-hidden">
        <CardContent className="p-6 md:p-10">
          <header className="mx-auto max-w-xl text-center">
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-emerald-500/10">
              <CheckCircle2 className="size-11 text-emerald-600 dark:text-emerald-400" />
            </div>

            <Badge className="mt-5 border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/10 dark:text-emerald-400">
              Payment confirmed
            </Badge>

            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Payment successful
            </h1>

            <p className="mt-3 leading-7 text-muted-foreground">
              Your payment was completed successfully and your course enrollment
              is now active.
            </p>
          </header>

          <Card className="mt-9 shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ReceiptText className="size-5 text-muted-foreground" />
                Payment summary
              </CardTitle>
            </CardHeader>

            <CardContent className="divide-y">
              <SummaryRow
                label="Amount paid"
                value={formatMoney(payment.amount, payment.currency)}
              />
              payment
              {payment.amount}
              <SummaryRow label="Payment status" value="Completed" />
              <SummaryRow
                label="Transaction ID"
                value={
                  payment.stripePaymentId
                    ? maskValue(payment.stripePaymentId)
                    : "Processing"
                }
              />
              <SummaryRow
                label="Checkout session"
                value={
                  payment.stripeSessionId
                    ? maskValue(payment.stripeSessionId)
                    : "Not available"
                }
              />
            </CardContent>
          </Card>

          <div className="mt-6 flex gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600 dark:text-emerald-400" />

            <div>
              <p className="font-medium">Your enrollment is ready</p>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                You can now access the course lessons and begin learning.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 border-t pt-7 sm:flex-row">
            <Link
              href="/student-dashboard/courses"
              className={cn(buttonVariants({ size: "lg" }), "gap-2")}
            >
              Go to My Learning
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href={`/courses/${payment.courseId}`}
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "lg",
                }),
              )}
            >
              View Course
            </Link>

            <Link
              href="/courses"
              className={buttonVariants({
                variant: "ghost",
                size: "lg",
              })}
            >
              Browse Courses
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

type PaymentStateProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
};

function PaymentState({
  icon,
  title,
  description,
  children,
}: PaymentStateProps) {
  return (
    <main className="container mx-auto flex min-h-[65vh] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-xl">
        <CardContent className="flex flex-col items-center p-8 text-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-muted">
            {icon}
          </div>

          <h1 className="mt-6 text-2xl font-bold">{title}</h1>

          <p className="mt-2 max-w-md leading-7 text-muted-foreground">
            {description}
          </p>

          <div className="mt-6">{children}</div>
        </CardContent>
      </Card>
    </main>
  );
}

type SummaryRowProps = {
  label: string;
  value: string;
};

function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <div className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>

      <span className="break-all text-sm font-medium">{value}</span>
    </div>
  );
}

function formatMoney(
  amount: string | number,
  currency: string | undefined,
): string {
  const numericAmount = Number(amount);
  const normalizedCurrency = currency?.trim().toUpperCase();

  if (!normalizedCurrency) {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numericAmount);
  }

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: normalizedCurrency,
    }).format(numericAmount);
  } catch {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numericAmount);
  }
}

function maskValue(value: string): string {
  if (value.length <= 18) {
    return value;
  }

  return `${value.slice(0, 10)}...${value.slice(-6)}`;
}
