"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

const data = [
  { month: "JAN", amount: 20, color: "#ef4444" },
  { month: "FEB", amount: 40, color: "#d97706" },
  { month: "MAR", amount: 35, color: "#d97706" },
  { month: "APR", amount: 28, color: "#d97706" },
  { month: "MAY", amount: 75, color: "#15803d" },
  { month: "JUN", amount: 10, color: "#ef4444" },
  { month: "JUL", amount: 65, color: "#15803d" },
  { month: "AUG", amount: 75, color: "#15803d" },
  { month: "SEP", amount: 28, color: "#f59e0b" },
];

export default function SavingsChart() {
  return (
    <div className="savings-chart-card">
      <div className="chart-header">
        <h2>Aggregate Monthly Savings</h2>
        <p>Historical data over the last 6 months</p>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 10, left: 0, bottom: 9.5 }}
          >
            <CartesianGrid stroke="#1e293b" vertical={false} />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              padding={{ left: 20, right: 20 }}
            />

            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip cursor={{ fill: "transparent" }} />

            <Bar dataKey="amount" radius={[4, 4, 0, 0]} barSize={40}>
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
