"use client";
import Home from "@/app/page";
import { useUserLogin } from "@/lib/query";
import MyAnalytics from "@/ui/MyAnalytics-Ui";
import React from "react";
const MyAnalyticsFeature = ({ alias }: { alias: string }) => {
  const { data: user } = useUserLogin();
  const topics = user
    ? [...new Set(user.urls.map((url) => url.topic.name))]
    : [];
  return user ? (
    <MyAnalytics alias={alias} user={user} topics={topics} />
  ) : (
    <Home />
  );
};

export default MyAnalyticsFeature;
