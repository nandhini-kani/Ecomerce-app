"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
  });

  // FETCH DATA FROM API
  const loadData = async () => {
    const res = await fetch("/api/admin/stats");
    const data = await res.json();
    setStats(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const chartData = [
    { name: "Products", value: stats.totalProducts },
    { name: "Orders", value: stats.totalOrders },
  ];

  const COLORS = ["#4F46E5", "#F59E0B"];

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📊 Admin Dashboard</h1>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Products Card */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-200 transition hover:scale-[1.02]">
          <p className="text-gray-600 text-lg">Total Products</p>
          <h2 className="text-4xl font-extrabold text-blue-700 mt-2">
            {stats.totalProducts}
          </h2>
        </div>

        {/* Orders Card */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-200 transition hover:scale-[1.02]">
          <p className="text-gray-600 text-lg">Total Orders</p>
          <h2 className="text-4xl font-extrabold text-yellow-600 mt-2">
            {stats.totalOrders}
          </h2>
        </div>
      </div>

      {/* PIE CHART CARD */}
      <div className="bg-white mt-10 p-8 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          📈 Products vs Orders
        </h2>

        <div className="w-full h-80">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
