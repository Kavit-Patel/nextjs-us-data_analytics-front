"use client";

import { AllUrlVisualization } from "@/components/AllUrlVisualization";
import Loader from "@/components/Loader";
import { UrlTopicVisualization } from "@/components/UrlTopicVisualization";
import { UrlVisualization } from "@/components/UrlVisualization";
import {
  useAllUrlAnalytics,
  useTopicAnalytics,
  useUrlAnalytics,
} from "@/lib/query";
import { IUser } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

const MyAnalytics = ({
  alias,
  user,
  topics,
}: {
  alias: string;
  user: IUser;
  topics: string[];
}) => {
  const [topic, setTopic] = useState<string>("");
  const [currentState, setCurrentState] = useState<{
    allUrls: boolean;
    url: boolean;
    topic: boolean;
  }>({ allUrls: false, url: false, topic: false });
  const {
    data: AllUrlAnalytics,
    isPending: isAllUrlAnalyticsPending,
    error: allUrlAnalyticsError,
  } = useAllUrlAnalytics(user.id, alias, topic);
  const {
    data: urlAnalytics,
    isPending: isUrlAnalyticsPending,
    error: urlAnalyticsError,
  } = useUrlAnalytics(user.id, alias, topic);
  const {
    data: TopicAnalytics,
    isPending: isTopicAnalyticsPending,
    error: topicAnalyticsError,
  } = useTopicAnalytics(user.id, topic);
  useEffect(() => {
    if (alias === "all" && !topic && !currentState.allUrls) {
      setCurrentState((prev) => ({
        ...prev,
        allUrls: true,
        url: false,
        topic: false,
      }));
    }
    if (alias !== "all" && !topic && !currentState.url) {
      setCurrentState((prev) => ({
        ...prev,
        allUrls: false,
        url: true,
        topic: false,
      }));
    }
    if (topic && !currentState.topic) {
      setCurrentState((prev) => ({
        ...prev,
        allUrls: false,
        url: false,
        topic: true,
      }));
    }
  }, [currentState, alias, topic]);
  return (
    <div className="w-full h-[calc(100vh-64px)] bg-gradient-to-b from-gray-900 to-blue-900 flex flex-col items-center text-xl">
      <PerfectScrollbar>
        <div className="w-full flex flex-col gap-2">
          {user?.urls?.length === 0 ? (
            <p className="w-full h-96 text-center text-gray-500 text-lg flex flex-col justify-center items-center gap-2">
              <span>
                You haven’t shortened any URLs yet. Start creating some!
              </span>
              <Link
                href="/"
                className="text-blue-700 font-semibold transition-all hover:underline active:scale-95 text-sm"
              >
                Create Now
              </Link>
            </p>
          ) : (
            <>
              <div className=" text-center p-2 md:p-8 flex flex-col gap-4">
                <h2 className=" text-xl md:text-3xl font-semibold text-slate-400">
                  URL Performance Analytics
                </h2>
                <div className="text-slate-400">
                  <span>Url Topic : </span>
                  <span>
                    <select
                      onChange={(e) => {
                        const selected = e.target.value;
                        if (selected === "All") {
                          setTopic("");
                          setCurrentState((prev) => ({
                            ...prev,
                            allUrls: true,
                            topic: false,
                            url: false,
                          }));
                          return;
                        }
                        setTopic(selected);
                      }}
                      name="topic"
                      id="topic-select"
                      className="px-4 py-2 text-sm text-gray-200 bg-gray-800 outline-none rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="All">All</option>
                      {topics.map((topic) => (
                        <option key={topic} value={topic}>
                          {topic}
                        </option>
                      ))}
                    </select>
                  </span>
                </div>
              </div>
              {currentState.allUrls && (
                <div className="">
                  {isAllUrlAnalyticsPending && !allUrlAnalyticsError ? (
                    <div className="w-full h-full">
                      <Loader width={50} height={50} color="orange" />
                    </div>
                  ) : allUrlAnalyticsError ? (
                    <div className="w-full h-full justify-center items-center">
                      {allUrlAnalyticsError.message}
                    </div>
                  ) : (
                    <AllUrlVisualization data={AllUrlAnalytics} />
                  )}
                </div>
              )}
              {currentState.url && (
                <div className="">
                  {isUrlAnalyticsPending && !urlAnalyticsError ? (
                    <div className="w-full h-full">
                      <Loader width={50} height={50} color="orange" />
                    </div>
                  ) : urlAnalyticsError ? (
                    <div className="w-full h-full justify-center items-center">
                      {urlAnalyticsError.message}
                    </div>
                  ) : (
                    <UrlVisualization data={urlAnalytics} />
                  )}
                </div>
              )}
              {currentState.topic && (
                <div className="">
                  {isTopicAnalyticsPending && !topicAnalyticsError ? (
                    <div className="w-full h-full">
                      <Loader width={50} height={50} color="orange" />
                    </div>
                  ) : topicAnalyticsError ? (
                    <div className="w-full h-full justify-center items-center">
                      {topicAnalyticsError.message}
                    </div>
                  ) : (
                    <UrlTopicVisualization data={TopicAnalytics} />
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </PerfectScrollbar>
    </div>
  );
};

export default MyAnalytics;
