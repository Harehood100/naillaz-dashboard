"use client";

import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default function ExpensesChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: "doughnut",
      data: {
        labels: ["Housing", "Food", "Transport", "Utilities", "Shopping", "Other"],
        datasets: [{
          data: [3200, 240, 450, 180, 320, 860],
          backgroundColor: [
            "#3b82f6", "#f59e0b", "#10b981",
            "#8b5cf6", "#ef4444", "#64748b"
          ],
          borderWidth: 0,
          hoverOffset: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: { color: "#9ca3af", font: { size: 12 }, padding: 16 }
          }
        },
        cutout: "70%"
      }
    });

    return () => { chartInstance.current?.destroy(); };
  }, []);

  return (
    <div className="expenses-table-card">
      <h3>Spending by Category</h3>
      <div style={{ height: "300px" }}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}
