"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowLeftFromLine } from "lucide-react";

const BackBtn = () => {
  const router = useRouter();
  return (
    <div>
      <Button onClick={() => router.back()}>
        <ArrowLeftFromLine className="h-4 w-4" />
        Back
      </Button>
    </div>
  );
};

export default BackBtn;
