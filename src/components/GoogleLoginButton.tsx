"use client";

import { useUserLogin } from "@/lib/query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "./Loader";

const GoogleLoginButton = () => {
  const { data: user } = useUserLogin();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
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
  const handleRedirect = () => {
    setIsRedirecting(true);
    window.location.href = googleAuthUrl || "#";
  };
  return (
    <button
      disabled={isRedirecting}
      onClick={handleRedirect}
      className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 flex justify-center items-center"
      aria-label="Login with Google"
    >
      {isRedirecting ? (
        <Loader width={20} height={20} color="orange" />
      ) : (
        "Login with Google"
      )}
    </button>
  );
};

export default GoogleLoginButton;
