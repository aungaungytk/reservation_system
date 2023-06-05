import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { Route, Routes } from "react-router-dom";
import { AdminDashboard } from "../dashboard/admin-dashboard";
import { ProUserList } from "../list/pro";
import { NormalUserList } from "../list/normal";
import { Car } from "../car/AdminCar";
import { AdminRoom } from "../room/AdminRoom";
import { RoomCreation } from "../creation/roomCreation";
import { TeamCreation } from "../creation/teamCreation";
import { ReportTeam } from "../report/teamReport";
import { ReservationCarReport } from "../report/carReservationReport";
import { ReservationRoomReport } from "../report/roomReservationReport";
import { AdminViewReservationForm } from "../../components/room/RoomReservationForm/AdminViewReservationForm";
import CreateCar from "../creation/CarCRUD";
import { Profile } from "../profile/profile";
import Error404 from "../error/Error404";

function AdminView() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Routes>
        <Route path="/home" element={<AdminDashboard />} />
        <Route path="/pro-user" element={<ProUserList />} />
        <Route path={`/normal-user`} element={<NormalUserList />} />
        <Route path={`/car`} element={<Car />} />
        <Route path={`/room-reservation`} element={<AdminRoom />} />
        <Route
          path={`/room-reservation/reserve`}
          element={<AdminViewReservationForm />}
        />

        <Route path={`/car-creation`} element={<CreateCar />} />
        <Route path={`/team-report`} element={<ReportTeam />} />

        <Route
          path={`/car-reservation-report`}
          element={<ReservationCarReport />}
        />
        <Route
          path={`/room-reservation-report`}
          element={<ReservationRoomReport />}
        />
        <Route path={`/room-creation`} element={<RoomCreation />} />
        <Route path={`/team-creation`} element={<TeamCreation />} />
        <Route path="/personal-profile" element={<Profile />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default AdminView;
