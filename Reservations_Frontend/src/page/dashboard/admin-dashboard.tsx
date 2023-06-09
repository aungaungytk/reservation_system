/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { Sidebar } from "../../components/sidebar/AdminSidebar";
import axios from "axios";
import { useAppSelector } from "../../redux/features/Hook";
import { Card } from "../../components/card/card";
import Charts from "../chart/Charts";
import debounce from "lodash/debounce";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";

export interface roomReservationData {
  date: string;
  description: string;
  end_time: string;
  id: number;
  room_id: number;
  start_time: number;
  title: string;
  user_id: number;
}

export interface carReservationData {
  date: string;
  title: string;
  start_time: number;
  end_time: string;
  destination: string;
  no_of_traveller: number;
  status: number;
  id: number;
  car_id: number;
  user_id: number;
  remark: string;
  approved_by: string;
}

export const AdminDashboard: React.FC = () => {
  const authRedux = useAppSelector((state) => state.auth);
  const [carCount, setCarCount] = useState(0);
  const [roomCount, setroomCount] = useState(0);
  const [carReserveCount, setCarReserveCount] = useState(0);
  const [roomReserveCount, setRoomReserveCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          roomCountRes,
          carCountRes,
          carReserveCountRes,
          roomReserveCountRes,
        ]: any = await Promise.all([
          getRoomCount(),
          getCarCount(),
          getCarReserveCount(),
          getRoomReserveCount(),
        ]);

        setroomCount(roomCountRes.data);
        setCarCount(carCountRes.data);
        setCarReserveCount(carReserveCountRes.data);
        setRoomReserveCount(roomReserveCountRes.data);
        setIsLoading(false); 
      } catch (error) {
        console.log(error);
        setIsLoading(false); 
      }
    };

    const debouncedFetchData = debounce(fetchData, 500); 

    debouncedFetchData();

    return () => {
      debouncedFetchData.cancel();
    };
  }, []);

  const getRoomCount = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:8000/api/room_count", {
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

  const getCarCount = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:8000/api/car_count", {
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

  const getCarReserveCount = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:8000/api/car_reserve_count", {
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

  const getRoomReserveCount = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:8000/api/room_reserve_count", {
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

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ReactLoading
              color={"blue"}
              type={"spin"}
              height={"80px"}
              width={"80px"}
            />
          </div>
        ) : (
          <>
            <div className="dashboard-container" style={{ padding: "5px" }}>
              <Link
                to={`/${authRedux.role}-dashboard/room-creation`}
                style={{ textDecoration: "none", color: "gray" }}
              >
                <Card title="Total Room" count={roomCount} />
              </Link>

              <Link
                to={`/${authRedux.role}-dashboard/car-creation`}
                style={{ textDecoration: "none", color: "gray" }}
              >
                <Card title="Total Car" count={carCount} />
              </Link>

              <Link
                to={`/${authRedux.role}-dashboard/room-reservation-report`}
                style={{ textDecoration: "none", color: "gray" }}
              >
                <Card title="Total Room Reservation" count={roomReserveCount} />
              </Link>

              <Link
                to={`/${authRedux.role}-dashboard/car-reservation-report`}
                style={{ textDecoration: "none", color: "gray" }}
              >
                <Card title="Total Car Reservation" count={carReserveCount} />
              </Link>
            </div>
            <div style={{ marginBottom: "50px" }}>
              <Charts />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
