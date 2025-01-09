import { ISingleUrlData } from "@/types";
import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

export const UrlVisualization = ({ data }: { data: ISingleUrlData }) => {
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  return (
    <div className="w-screen min-h-full  text-white p-8">
      <div className="flex justify-center gap-8 mb-8">
        <div className="bg-blue-700 p-6 rounded-lg shadow-lg text-center">
          <h4 className="text-lg font-bold">Total Clicks</h4>
          <p className="text-2xl font-semibold">{data.totalClicks}</p>
        </div>
        <div className="bg-green-700 p-6 rounded-lg shadow-lg text-center">
          <h4 className="text-lg font-bold">Unique Users</h4>
          <p className="text-2xl font-semibold">{data.uniqueUser}</p>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-center text-xl font-bold mb-4">Clicks by Date</h2>
        <LineChart
          width={800}
          height={300}
          data={data.clicksByDate}
          className="mx-auto"
        >
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="clickCount"
            stroke="#82ca9d"
            dot={{ r: 5 }}
          />
        </LineChart>
      </div>

      <div className="mb-12">
        <h2 className="text-center text-xl font-bold mb-4">
          OS Type Distribution
        </h2>
        <PieChart width={400} height={400} className="mx-auto">
          <Tooltip
            formatter={(value, name) => [`${value} clicks`, name]}
            contentStyle={{
              backgroundColor: "#f4f4f8",
              borderRadius: "8px",
              border: "1px solid #ddd",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            itemStyle={{
              color: "#333",
              fontSize: "14px",
              fontFamily: "'Arial', sans-serif",
            }}
            labelStyle={{
              fontSize: "12px",
              color: "#555",
            }}
          />
          <Pie
            data={data.osType}
            dataKey="uniqueClicks"
            nameKey="osName"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#82ca9d"
          >
            {data.osType.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </div>

      <div className="mb-12">
        <h2 className="text-center text-xl font-bold mb-4">
          Device Type Distribution
        </h2>
        <BarChart
          width={800}
          height={300}
          data={data.deviceType}
          className="mx-auto"
        >
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="deviceName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="uniqueClicks" fill="#8884d8" />
          <Bar dataKey="uniqueUsers" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  );
};
