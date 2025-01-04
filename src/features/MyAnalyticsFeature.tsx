"use client";
import Home from "@/app/page";
import { IUser } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import MyAnalytics from "@/ui/MyAnalytics-Ui";

const MyUrlsFeature = () => {
  const queryClient = useQueryClient();
  const user: IUser | undefined = queryClient.getQueryData(["user"]);
  return user ? <MyAnalytics /> : <Home />;
};

export default MyUrlsFeature;
