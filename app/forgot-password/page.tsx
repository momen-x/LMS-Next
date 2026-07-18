"use client";

import { useState } from "react";

const Page = () => {
  const [email, setEmail] = useState("");
  const verifiedEmail = async () => {
    const response = await fetch(
        //this is must to be forgot password not reset!!
      "http://localhost:5000/api/auth/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      },
    );
    const data = await response.json();
    console.log(data);
    if (data.success) {
      console.log("success the email is sending", data);
    } else {
      console.log("error some thing went wrong", data);
    }
  };
  return (
    <div>
      <input
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <button
        onClick={() => {
          verifiedEmail();
        }}
      >
        Verify Email
      </button>
    </div>
  );
};

export default Page;
