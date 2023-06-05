import RoomReservationChart from "../../components/chart/RoomBarChart";
import CarBarChart from "../../components/chart/CarBarChart";
import RoomPieChart from "../../components/chart/RoomPieChart";
import CarPieChart from "../../components/chart/CarPieChart";

const Charts = () => {
  return (
    <div className="charts">
      <div
        className="width-50 align-center"
        style={{
          marginRight: "30px",
          padding: "20px",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          borderRadius: "10px",
        }}
      >
        <RoomReservationChart />
      </div>
      <div
        className="width-50 align-center"
        style={{
          padding: "20px",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          borderRadius: "10px",
        }}
      >
        <CarBarChart />
      </div>
      <div
        className="width-50 align-center mt"
        style={{
          marginRight: "30px",
          padding: "20px",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          borderRadius: "10px",
        }}
      >
        <RoomPieChart />
      </div>
      <div
        className="width-50 align-center mt"
        style={{
          padding: "20px",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          borderRadius: "10px",
        }}
      >
        <CarPieChart />
      </div>
    </div>
  );
};

export default Charts;