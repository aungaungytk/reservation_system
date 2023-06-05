import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { Route, Routes } from "react-router-dom";
import { Car } from "../car/UserCar";
import AuthProvider from "../../redux/authProvider";
import { UserRoom } from "../room/UserRoom";
import { CarBooking } from "../car/booking/CarBooking";
import { UserRoomReservationForm } from "../../components/room/RoomReservationForm/UserRoomReservationForm";
import { UserProfileList } from "../profile/userprofile";
import Error404 from "../error/Error404";

function UserView() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <AuthProvider>
        <Routes>
          <Route path="/home" element={<UserRoom />} />
          <Route
            path="/room-reservation/reserve/"
            element={<UserRoomReservationForm />}
          />
          <Route path="/room-reservation" element={<UserRoom />} />
          <Route path="/car-reservation" element={<Car />} />
          <Route path="/car-reservation/car-booking" element={<CarBooking />} />
          <Route path="/personal-profile" element={<UserProfileList />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default UserView;
