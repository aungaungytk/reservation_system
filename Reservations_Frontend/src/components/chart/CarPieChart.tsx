import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/features/Hook";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { ChartOptions } from "chart.js/auto";

interface TeamData {
  name: string;
  car_reservation_count: number;
}

const CarPieChart = () => {
  const authRedux = useAppSelector((state) => state.auth);
  const authToken = authRedux.token;
  const [teamData, setTeamData] = useState<TeamData[]>([]);

  useEffect(() => {
    getTeamData()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: any) => {
        setTeamData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getTeamData = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(`http://localhost:8000/api/car_reserve_count_by_team`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
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

  const chartData = {
    labels: teamData.map((data) => data.name),
    datasets: [
      {
        data: teamData.map((data) => data.car_reservation_count),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#00FF00",
          "#FF28",
          "#CCA2E5",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#00FF00",
          "#FF28",
          "#CCA2E5",
        ],
      },
    ],
  };
  const config: ChartOptions<"pie"> = {
    type: "pie",
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "right",
        },
        title: {
          display: true,
          text: "Car Reservation Pie Chart",
          position: "bottom",
          font: { weight: "bold", size: 18 },
          align: "center",
        },
      },
    },
  };

  return (
    <div style={{ width: "350px", height: "350px" }}>
      <Pie data={chartData} options={config.options} />
    </div>
  );
};

export default CarPieChart;
