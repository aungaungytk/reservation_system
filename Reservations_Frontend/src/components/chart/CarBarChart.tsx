import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector } from "../../redux/features/Hook";
import { Chart, registerables } from "chart.js/auto";
import BarChart, { ReservationCountData } from "./CarChart.js";

Chart.register(...registerables);

const CarBarChart: React.FC = () => {
  const authRedux = useAppSelector((state) => state.auth);
  const [chartData, setChartData] = useState<ReservationCountData[]>([]);

  const monthLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const MonthConverter = (monthNumber: number) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Subtract 1 from the monthNumber since JavaScript Date object uses 0-based index for months
    const monthName = monthNames[monthNumber - 1];

    return monthName;
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getReservationData().then((response: any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const extractedData = response.data.map((item: any) => {
        const month = MonthConverter(item.month);
        return {
          month: month,
          count: item.count,
        };
      });
      const ChartData = updateChartData(extractedData);
      setChartData(ChartData);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateChartData = (formattedData: ReservationCountData[]) => {
    const chartData = monthLabels.map((monthLabel) => {
      return {
        month: monthLabel,
        count: 0,
      };
    });

    formattedData.forEach((data) => {
      const index = monthLabels.indexOf(data.month);
      if (index !== -1) {
        chartData[index].count = data.count;
      }
    });

    return chartData;
  };

  const getReservationData = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:8000/api/car_reserve_count_by_month", {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };

  return <BarChart chartData={chartData} monthLabels={monthLabels} />;
};

export default CarBarChart;
