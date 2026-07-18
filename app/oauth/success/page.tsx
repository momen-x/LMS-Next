"use client";
import { useEffect } from "react";
export default function OAuthSuccessPage() {
  useEffect(() => {
    const getDataForCurrentUser = async () => {
      const response = await fetch("http://localhost:5000/api/users/me", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        console.log("success", data);
      } else {
        console.log("error", data);
      }
    };
    getDataForCurrentUser();
  }, []);
  return <div>Google login successful</div>;
}
