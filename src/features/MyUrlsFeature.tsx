"use client";
import Home from "@/app/page";
import MyUrlsUi from "@/ui/MyUrls-Ui";
import React from "react";
import { useUserLogin } from "@/lib/query";
import Loader from "@/components/Loader";

const MyUrlsFeature = () => {
  const { data: user, isPending } = useUserLogin();
  return user ? (
    <MyUrlsUi user={user} />
  ) : isPending ? (
    <div className="w-screen h-screen flex justify-center items-center">
      <Loader width={100} height={100} color="orange-500" />
    </div>
  ) : (
    <Home />
  );
};

export default MyUrlsFeature;
