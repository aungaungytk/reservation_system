// import React from 'react';
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import CarRentalIcon from "@mui/icons-material/CarRental";
import { Link, useLocation } from "react-router-dom";
import AcePlus from "../img/mainLogo.png";
import { AuthRole } from "../../redux/features/type/authType";
import {  useAppSelector } from "../../redux/features/Hook";
export const Sidebar = () => {
  const authRedux = useAppSelector((state) => state.auth);
  const location = useLocation();
  const isActive = (route:string)=>{
    return location.pathname=== `/${authRedux.role}-dashboard/${route}`;
  }
  return (
    <div className="sidebar">
      <Link to="/" style={{ textDecoration: "none" }}>
        <img src={AcePlus} alt="" width={150} className="img" />
      </Link>
      <hr />
      {authRedux.role === AuthRole.staff && (
        <>
          <div className="center">
            <ul>
              <p className="title">Reservation</p>
              <Link
                to={`/${authRedux.role}-dashboard/home`}
                style={{ textDecoration: "none" }}
              >
                <li  
                  className={isActive("home")? "active":""}
                >
                  <MeetingRoomIcon className="icon" />
                  <span>Rooms</span>
                </li>
              </Link>
              <Link
                to={`/${authRedux.role}-dashboard/car-reservation`}
                style={{ textDecoration: "none" }}
              >
                <li className={isActive("car-reservation")? "active" : ""}>
                  <CarRentalIcon className="icon" />
                  <span>Cars</span>
                </li>
              </Link>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};
