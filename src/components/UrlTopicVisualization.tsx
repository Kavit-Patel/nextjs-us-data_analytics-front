import { ITopicData } from "@/types";
import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

export const UrlTopicVisualization = ({ data }: { data: ITopicData }) => {
  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#d88884",
    "#84d8c9",
    "#d8c984",
  ];

  const aggregatedClicksByDate = data.clicksByDate.map((entry) => {
    const date = Object.keys(entry)[0];
    const totalClicks = entry[date].reduce(
      (sum, item) => sum + item.clickCount,
      0
    );
    return { date, totalClicks };
  });

  return (
    <div className="w-screen min-h-full text-white p-8">
      <div className="flex justify-center gap-8 mb-8">
        <div className="bg-blue-700 p-6 rounded-lg shadow-lg text-center">
          <h4 className="text-lg font-bold">Total Clicks</h4>
          <p className="text-2xl font-semibold">{data.totalClicks}</p>
        </div>
        <div className="bg-green-700 p-6 rounded-lg shadow-lg text-center">
          <h4 className="text-lg font-bold">Unique Users</h4>
          <p className="text-2xl font-semibold">{data.uniqueUsers}</p>
        </div>
      </div>
      <div className="mb-12">
        <h2 className="text-center text-xl font-bold mb-4">
          Total Clicks by Date
        </h2>
        <LineChart
          width={800}
          height={300}
          data={aggregatedClicksByDate}
          className="mx-auto"
        >
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="totalClicks"
            stroke="#82ca9d"
            dot={{ r: 5 }}
          />
        </LineChart>
      </div>
      <div className="mb-12">
        <h2 className="text-center text-xl font-bold mb-4">
          URL Click Distribution
        </h2>
        <BarChart width={800} height={300} data={data.urls} className="mx-auto">
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="shortUrl" tick={{ fontSize: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalClicks" barSize={30}>
            {data.urls.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </div>

      <h2 className="text-center text-xl font-bold mb-4 ">
        Unique Clicks by URL
      </h2>
      <div className="flex justify-center items-center gap-8 mt-8">
        <PieChart width={300} height={300}>
          <Pie
            data={data.urls}
            dataKey="uniqueClicks"
            nameKey="shortUrl"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#82ca9d"
          >
            {data.urls.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>

        <div className="p-4 rounded-lg shadow-lg w-80 h-72 bg-gradient-to-b from-gray-700 to-blue-900">
          <PerfectScrollbar>
            <ul className="space-y-2 h-full">
              {data.urls.map((url, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-2 rounded-md shadow-sm hover:shadow-md"
                  style={{
                    backgroundColor: COLORS[index % COLORS.length],
                    borderLeft: `8px solid ${COLORS[index % COLORS.length]}`,
                  }}
                >
                  <span className="truncate w-3/4 text-gray-800">
                    {url.shortUrl}
                  </span>
                  <span className="font-semibold text-gray-600">
                    {url.uniqueClicks}
                  </span>
                </li>
              ))}
            </ul>
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};
