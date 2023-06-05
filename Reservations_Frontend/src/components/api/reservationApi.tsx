import axios from "axios";
import { useQuery } from "react-query";
import { reject } from "lodash";
import { useAppSelector } from "../../redux/features/Hook";
import { RoomDataInterface} from "../report/roomReservation";
import { DataCarInterface } from "../report/carReservation";

export const useRoomReserveDataQuery = () => {
    const authRedux = useAppSelector((state) => state.auth);
  
    return useQuery<{ data: RoomDataInterface[] }, Error>(
      "carReserveData",
      async () => {
        const axiosConfig = {
          timeout: 5000,
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        };
  
        const response = await axios.get(
          "http://127.0.0.1:8000/api/room_reservation",
          axiosConfig
        );
  
        return { data: response.data.data };
      },
      {
        onError: (reason) => {
          reject(reason);
          throw reason;
        },
      }
    );
  };


  export const useCarReserveDataQuery = () => {
    const authRedux = useAppSelector((state) => state.auth);
  
    return useQuery<{ data: DataCarInterface[] }, Error>(
      "roomReserveData",
      async () => {
        const axiosConfig = {
          timeout: 5000,
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        };
  
        const response = await axios.get(
          "http://127.0.0.1:8000/api/car_reservation",
          axiosConfig
        );
  
        return { data: response.data.data };
      },
      {
        onError: (reason) => {
          reject(reason);
          throw reason;
        },
      }
    );
  };
  