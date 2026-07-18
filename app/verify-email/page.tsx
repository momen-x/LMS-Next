"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const VerifyPage = () => {
  const token = useSearchParams().get("token");
  console.log("the token is", token);
  useEffect(() => {
    const verifyEmail = async () => {
      const response = await fetch(
        `http://localhost:5000/api/auth/verify-email?token=${token}`,
      );
      const data = await response.json();
      console.log(data);
      if (data.success) {
        console.log("success");
      } else {
        console.log("error");
      }
    };
    verifyEmail();
  }, []);
  return <div>VerifyPage</div>;
};

export default VerifyPage;
