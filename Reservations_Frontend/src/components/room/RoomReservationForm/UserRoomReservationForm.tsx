import Navbar from "../../navbar/Navbar";
import { Sidebar } from "../../sidebar/UserSidbar";
import RoomReservationForm from "./RoomReservationForm";

export const UserRoomReservationForm = () => {
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
