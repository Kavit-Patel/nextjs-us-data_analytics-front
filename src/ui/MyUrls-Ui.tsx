"use client";
import React from "react";
import { IUrl, IUser } from "@/types";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { useDeleteUrlById } from "@/lib/query";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import Loader from "@/components/Loader";

const MyUrlsUi = ({ user }: { user: IUser }) => {
  const { mutateAsync: deleteUrl, isPending } = useDeleteUrlById();
  return (
    <div className="max-w-6xl mx-auto p-6 min-h-[calc(100vh-64px)]">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-600">
        Your Shortened URLs
      </h1>

      {user.urls.length === 0 ? (
        <p className="text-center text-gray-500 text-lg flex flex-col justify-center items-center gap-2">
          <span>You haven’t shortened any URLs yet. Start creating some!</span>
          <Link
            href="/"
            className="text-blue-700 font-semibold transition-all hover:underline active:scale-95 text-sm"
          >
            Create Now
          </Link>
        </p>
      ) : (
        <div className="h-[calc(100vh-300px)] overflow-x-hidden overflow-y-auto rounded-lg shadow-lg bg-slate-400">
          <PerfectScrollbar>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-slate-500">
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-sm font-semibold text-gray-300"
                  >
                    Long URL
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-sm font-semibold text-gray-300"
                  >
                    Short URL
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-sm font-semibold text-gray-300"
                  >
                    Created At
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-sm font-semibold text-gray-300"
                  >
                    Alias
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-sm font-semibold text-gray-300"
                  >
                    Topic
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-center text-sm font-semibold text-gray-300"
                  >
                    Action
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-center text-sm font-semibold text-gray-300"
                  >
                    Performance
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {user.urls?.map((url: IUrl) => (
                  <tr
                    key={url.id}
                    className="hover:bg-gray-50 transition ease-in-out duration-150"
                  >
                    <td className="px-3 py-4 truncate text-gray-800 max-w-[200px]">
                      {url.longUrl}
                    </td>
                    <td className="px-3 py-4 text-blue-700">
                      <Link
                        href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${url.alias}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {process.env.NEXT_PUBLIC_BACKEND_URL}/{url.alias}
                      </Link>
                    </td>
                    <td className="px-3 py-4 text-gray-800">
                      {new Date(url.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-4 text-gray-800">
                      {url.alias || "N/A"}
                    </td>
                    <td className="px-3 py-4 text-gray-800">
                      {url.topic.name}
                    </td>
                    <td className="px-3 py-4 text-center">
                      <button
                        disabled={isPending}
                        onClick={async () => await deleteUrl(url.id)}
                        className="text-red-900 hover:text-red-700 transition-colors"
                        title="Delete URL"
                      >
                        {isPending ? (
                          <Loader width={20} height={20} color="red" />
                        ) : (
                          <MdDelete size={20} />
                        )}
                      </button>
                    </td>
                    <td className="px-3 py-4 text-gray-800 font-semibold">
                      <Link href={`/analytics/${url.alias}`}>Analytics</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </PerfectScrollbar>
        </div>
      )}
    </div>
  );
};

export default MyUrlsUi;
