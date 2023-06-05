import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js/auto";

export interface ReservationCountData {
  month: string;
  count: number;
}
interface ChartDataProp {
  chartData: ReservationCountData[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  monthLabels: any;
}
Chart.register(...registerables);
const RoomChart: React.FC<ChartDataProp> = ({ chartData, monthLabels }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy(); // Destroy the previous chart instance
        }

        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: monthLabels,
            datasets: [
              {
                label: "# of Reservations",
                data: chartData.map((data) => data.count),
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: "Room Reservation Bar Chart",
                position: "bottom",
                font: { weight: "bold", size: 18 },
                align: "center",
                padding: 5,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 3,
                },
              },
            },
          },
        });
      }
    }
  }, [chartData]);

  return <canvas ref={chartRef} />;
};

export default RoomChart;
