"use client";

import Loader from "@/components/Loader";
import { useShortUrl, useUserLogin } from "@/lib/query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuid } from "uuid";

const Home = () => {
  const router = useRouter();
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [topic, setTopic] = useState("");
  const { data: user } = useUserLogin();
  const { mutateAsync: mutateShortUrl, isPending } = useShortUrl();
  const handleShortenUrl = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.id) {
      toast.error("Login first !");
      router.push("/login");
      return;
    }
    if (!longUrl) {
      toast("Please enter long url !");
      return;
    }
    await mutateShortUrl({
      longUrl,
      customAlias: `${customAlias}-${uuid().slice(-3) + user.id.slice(-2)}`,
      topic,
    });
  };
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-r from-sky-900 to-violet-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 flex flex-col justify-center  gap-4">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          🔗 URL Shortener
        </h1>
        <form onSubmit={handleShortenUrl} className="flex flex-col gap-2">
          <div className="relative">
            <input
              type="text"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="Paste your long URL here..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
            />
            <span className="absolute top-2.5 right-3 text-gray-400">🌐</span>
          </div>
          <div className="relative">
            <input
              type="text"
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
              placeholder="Optional alias ..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
            />
          </div>
          <div className="relative">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Optional topic ..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
            />
          </div>
          <button
            disabled={isPending}
            className={`mt-4 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium px-4 py-2 rounded-lg 
            ${
              isPending
                ? "opacity-50 cursor-not-allowed"
                : "hover:from-blue-600 hover:to-blue-700"
            }
          `}
          >
            {isPending ? (
              <Loader width={30} height={30} color="orange" />
            ) : (
              "Shorten URL"
            )}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Simplify your links with our easy-to-use URL shortener.
        </p>
      </div>
    </div>
  );
};

export default Home;
