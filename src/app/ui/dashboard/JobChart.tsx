"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale,
  ChartOptions,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale
);

export default function JobChart({ chartData }: { chartData: any }) {
  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          title: (ctx) => "Fecha: " + ctx[0].label,
          label: (ctx) => `${ctx.dataset.label}: ${ctx.formattedValue}`,
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: { unit: "day" },
        ticks: { autoSkip: true, maxRotation: 0 },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h5 className="text-lg font-semibold text-gray-800 mb-4">
        Histórico de Ejecuciones
      </h5>
      <div className="relative h-64">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
}
