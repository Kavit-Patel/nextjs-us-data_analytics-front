"use client";

import { useUserLogin } from "@/lib/query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const GoogleLoginButton = () => {
  const { data: user } = useUserLogin();
  const router = useRouter();
  const googleAuthUrl = process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL;

  if (!googleAuthUrl) {
    console.error("Google authentication URL is not defined.");
  }
  useEffect(() => {
    if (user && user.id) {
      toast("Logged In !");
      router.push("/");
    }
  }, [router, user]);
  return (
    <a
      href={googleAuthUrl || "#"}
      className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 flex justify-center items-center"
      aria-label="Login with Google"
    >
      Login with Google
    </a>
  );
};

export default GoogleLoginButton;
