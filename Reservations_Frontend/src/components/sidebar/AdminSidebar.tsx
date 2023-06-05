import DashboardIcon from "@mui/icons-material/Dashboard";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import CarRentalIcon from "@mui/icons-material/CarRental";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import PersonIcon from "@mui/icons-material/Person";
import { Link, useLocation } from "react-router-dom";
import AcePlus from "../img/mainLogo.png";
import { AuthRole } from "../../redux/features/type/authType";
import { useAppSelector } from "../../redux/features/Hook";
import Groups3Icon from "@mui/icons-material/Groups3";
import CarRepairTwoToneIcon from "@mui/icons-material/CarRepairTwoTone";
import RoomPreferencesTwoToneIcon from "@mui/icons-material/RoomPreferencesTwoTone";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";

export const Sidebar = () => {
  const authRedux = useAppSelector((state) => state.auth);
  const location = useLocation();

  const isActive = (route: string) => {
    return location.pathname === `/${authRedux.role}-dashboard/${route}`;
  };

  return (
    <div className="sidebar">
      <Link to="/" style={{ textDecoration: "none" }}>
        <img src={AcePlus} alt="" width={150} className="img" />
      </Link>
      <hr />
      {(authRedux.role === AuthRole.Admin ||
        authRedux.role === AuthRole.Superadmin) && (
        <>
          <div className="center">
            <ul>
              <p className="title">MAIN</p>
              <Link
                to={`/${authRedux.role}-dashboard/home`}
                style={{ textDecoration: "none" }}
              >
                <li className={isActive("home") ? "active" : ""}>
                  <DashboardIcon className="icon" />
                  <span>Dashboard</span>
                </li>
              </Link>
              <p className="title">Lists</p>
              <Link
                to={`/${authRedux.role}-dashboard/pro-user`}
                style={{ textDecoration: "none" }}
              >
                <li
                  className={isActive("pro-user") ? "active" : ""}
                >
                  <SupervisedUserCircleIcon className="icon" />
                  <span>Pro User</span>
                </li>
              </Link>
              <Link
                to={`/${authRedux.role}-dashboard/normal-user`}
                style={{ textDecoration: "none" }}
              >
                <li
                  className={isActive("normal-user") ? "active" : ""}
                >
                  <PersonIcon className="icon" />
                  <span>Normal User</span>
                </li>
              </Link>
              <p className="title">Reservation</p>
              <Link
                to={`/${authRedux.role}-dashboard/room-reservation`}
                style={{ textDecoration: "none" }}
              >
                <li
                  className={isActive("room-reservation") ? "active" : ""}
                >
                  <MeetingRoomIcon className="icon" />
                  <span>Rooms</span>
                </li>
              </Link>
              <Link
                to={`/${authRedux.role}-dashboard/car`}
                style={{ textDecoration: "none" }}
              >
                <li
                  className={isActive("car") ? "active" : ""}
                >
                  <CarRentalIcon className="icon" />
                  <span>Cars</span>
                </li>
              </Link>
              <p className="title">Creation Process</p>
              <Link
                to={`/${authRedux.role}-dashboard/team-creation`}
                style={{ textDecoration: "none" }}
              >
                <li
                  className={isActive("team-creation") ? "active" : ""}
                >
                  <Groups3Icon className="icon" />
                  <span>Teams</span>
                </li>
              </Link>
              <Link
                to={`/${authRedux.role}-dashboard/car-creation`}
                style={{ textDecoration: "none" }}
              >
                <li
                  className={isActive("car-creation") ? "active" : ""}
                >
                  <CarRepairTwoToneIcon className="icon" />
                  <span>Cars</span>
                </li>
              </Link>
              <Link
                to={`/${authRedux.role}-dashboard/room-creation`}
                style={{ textDecoration: "none" }}
              >
                <li
                  className={isActive("room-creation") ? "active" : ""}
                >
                  <RoomPreferencesTwoToneIcon className="icon" />
                  <span>Rooms</span>
                </li>
              </Link>
              <p className="title">Report</p>
              <Link
                to={`/${authRedux.role}-dashboard/team-report`}
                style={{ textDecoration: "none" }}
              >
                <li
                  className={isActive("team-report") ? "active" : ""}
                >
                  <Groups3Icon className="icon" />
                  <span>Teams</span>
                </li>
              </Link>
              <Link
                to={`/${authRedux.role}-dashboard/room-reservation-report`}
                style={{ textDecoration: "none" }}
              >
                <li
                  className={isActive("room-reservation-report") ? "active" : ""}
                >
                  <MeetingRoomOutlinedIcon className="icon" />
                  <span>Rooms Reservation</span>
                </li>
              </Link>
              <Link
                to={`/${authRedux.role}-dashboard/car-reservation-report`}
                style={{ textDecoration: "none" }}
              >
                <li
                  className={isActive("car-reservation-report") ? "active" : ""}
                >
                  <CarRentalIcon className="icon" />
                  <span>Cars Reservation</span>
                </li>
              </Link>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};
