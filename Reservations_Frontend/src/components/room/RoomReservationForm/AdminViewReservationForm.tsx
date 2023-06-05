import Navbar from "../../navbar/navbar";
import { Sidebar } from "../../sidebar/AdminSidebar";
import RoomReservationForm from "./RoomReservationForm";

export const AdminViewReservationForm = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <RoomReservationForm />
      </div>
    </div>
  );
};
