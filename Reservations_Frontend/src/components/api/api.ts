import axios from "axios";
import { useQuery } from "react-query";
import { reject } from "lodash";
import { useAppSelector } from "../../redux/features/Hook";
import { DataRow } from '../User/proUser';
import { CarData } from '../car/CarDataTable';
import { RoomData } from "../create/room";
export const useTeamUserDataQuery = () => {
    const authRedux = useAppSelector((state) => state.auth);
  
    return useQuery<{ data: DataRow[] }, Error>(
      "getData",
      async () => {
        const axiosConfig = {
          timeout: 5000,
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        };
  
        const response = await axios.get(
          "http://127.0.0.1:8000/api/users",
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
export const useUserDataQuery = () => {
  const authRedux = useAppSelector((state) => state.auth);

  return useQuery<{ data: DataRow[] }, Error>(
    "userData",
    async () => {
      const axiosConfig = {
        timeout: 5000,
        headers: {
          Authorization: `Bearer ${authRedux.token}`,
        },
      };

      const response = await axios.get(
        "http://127.0.0.1:8000/api/pro_user",
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
export const useTeamDataQuery = () => {
    const authRedux = useAppSelector((state) => state.auth);
  
  return useQuery<{ data: DataRow[] }, Error>(
      "teamData",
      async () => {
        const axiosConfig = {
          timeout: 5000,
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        };
  
        const response = await axios.get(
          "http://127.0.0.1:8000/api/teams",
          axiosConfig
        );
        
        return { data: response.data.data};

      },
      {
        onError: (reason) => {
          reject(reason);
          throw reason;
        },
      }
    );
  };
  export const useNormalQuery = () => {
    const authRedux = useAppSelector((state) => state.auth);
  
    return useQuery<{ data: DataRow[] }, Error>(
      "userData",
      async () => {
        const axiosConfig = {
          timeout: 5000,
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        };
  
        const response = await axios.get(
          "http://127.0.0.1:8000/api/staff",
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
  export const useRoleDataQuery = () => {
    const authRedux = useAppSelector((state) => state.auth);
  
    return useQuery<{ data: DataRow[] }, Error>(
      "roleData",
      async () => {
        const axiosConfig = {
          timeout: 5000,
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        };
  
        const response = await axios.get(
          "http://127.0.0.1:8000/api/roles",
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
  export const useCarListDataQuery = () => {
    const authRedux = useAppSelector((state) => state.auth);
  
    return useQuery<{ data: CarData[] }, Error>(
      "roleData",
      async () => {
        const axiosConfig = {
          timeout: 5000,
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        };
  
        const response = await axios.get(
          "http://127.0.0.1:8000/api/cars",
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

  export const useRoomListDataQuery = () => {
    const authRedux = useAppSelector((state) => state.auth);
  
    return useQuery<{ data: RoomData[] }, Error>(
      "roomData",
      async () => {
        const axiosConfig = {
          timeout: 5000,
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        };
  
        const response = await axios.get(
          "http://127.0.0.1:8000/api/rooms",
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
  