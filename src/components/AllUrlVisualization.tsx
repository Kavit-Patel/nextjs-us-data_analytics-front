import {
  IAllClicksByDate,
  IAllDeviceType,
  IAllOsType,
  IAllUrlData,
} from "@/types";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

export const AllUrlVisualization = ({ data }: { data: IAllUrlData }) => {
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#d0ed57"];

  const osData = data.stats.osType.map((item: IAllOsType) => ({
    name: item.osName,
    value: item.uniqueClicks,
  }));

  const deviceData = data.stats.deviceType.map((item: IAllDeviceType) => ({
    name: item.deviceName,
    value: item.uniqueClicks,
  }));

  return (
    <div className="w-screen h-full bg-gradient-to-b from-gray-900 to-blue-900 text-slate-400 p-8 flex flex-col gap-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Analytics Overview</h2>
        <div className="flex justify-center gap-4 text-lg">
          <div className="bg-slate-800 p-4 rounded-lg shadow-md">
            <p>Total URLs</p>
            <h3 className="text-2xl font-semibold">{data.stats.totalUrls}</h3>
          </div>
          <div className="bg-slate-800 p-4 rounded-lg shadow-md">
            <p>Total Clicks</p>
            <h3 className="text-2xl font-semibold">{data.stats.totalClicks}</h3>
          </div>
          <div className="bg-slate-800 p-4 rounded-lg shadow-md">
            <p>Unique Users</p>
            <h3 className="text-2xl font-semibold">{data.stats.uniqueUsers}</h3>
          </div>
        </div>
      </div>
      <div className=" py-4 shadow-2xl">
        <h3 className="text-center text-2xl font-bold mb-2">
          Clicks by Date (Per URL)
        </h3>
        <PerfectScrollbar>
          <div className=" max-h-72 flex flex-col md:flex-row justify-center flex-wrap gap-8 ">
            {data.stats.clicksByDate.map((item: IAllClicksByDate) => (
              <div
                key={item.url}
                className="bg-slate-800 p-6 rounded-lg shadow-md text-center"
              >
                <h4 className="text-lg font-semibold mb-4">{item.url}</h4>
                <LineChart
                  width={300}
                  height={200}
                  data={item.urlStats}
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
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </div>
            ))}
          </div>
        </PerfectScrollbar>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="bg-slate-800 p-6 rounded-lg shadow-md flex flex-col items-center w-fit">
          <h3 className="text-center text-xl font-semibold mb-4">
            OS Distribution
          </h3>
          <PieChart width={300} height={300}>
            <Pie
              data={osData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {osData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg shadow-md flex flex-col items-center w-fit">
          <h3 className="text-center text-xl font-semibold mb-4">
            Device Distribution
          </h3>
          <PieChart width={300} height={300}>
            <Pie
              data={deviceData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#82ca9d"
              label
            >
              {deviceData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
    </div>
  );
};
