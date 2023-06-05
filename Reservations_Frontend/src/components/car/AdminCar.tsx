import Switch from "@mui/material/Switch/Switch";
import DataTable from "react-data-table-component";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { useAppSelector } from "../../redux/features/Hook";
import axios from "axios";
import { Paper, TableContainer } from "@mui/material";
import {
  TimeFormatConverter,
  formattedTime,
  getCurrentDate,
  getFormattedDate,
} from "../room/RoomReservation";
import { useCarReserveDataQuery } from "../api/reservationApi";
import ReactLoading from "react-loading";

interface DataCarInterface {
  car: any;
  id: number;
  date: string;
  title: string;
  start_time: number;
  end_time: number;
  destination: string;
  no_of_traveller: number;
  status: number | boolean;
  user: { id: number; name: string; team: any };
  team: string;
  remark: string;
  licence_no: string;
  approved_by: string;
}

function AdminCarRequest(): JSX.Element {
  const { darkMode } = useContext(DarkModeContext);
  const authRedux = useAppSelector((state) => state.auth);
  const [car, setCar] = useState<DataCarInterface[]>([]);
  const { data: carDataReserveQuery, isFetching: isCarReserveFetching } =
    useCarReserveDataQuery();
  useEffect(() => {
    if (carDataReserveQuery) {
      setCar(carDataReserveQuery.data);
    }
  }, [carDataReserveQuery]);
  const handleStatusChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    row: DataCarInterface
  ) => {
    const { checked } = event.target;

    const updatedUser: DataCarInterface = {
      ...row,
      status: checked,
    };
    axios
      .patch(
        `http://127.0.0.1:8000/api/car_reservation/${row.id}`,
        {
          date: updatedUser.date,
          title: updatedUser.title,
          start_time: updatedUser.start_time,
          end_time: updatedUser.end_time,
          destination: updatedUser.destination,
          user_id: updatedUser.user.id,
          car_id: updatedUser.car.id,
          no_of_traveller: updatedUser.no_of_traveller,
          status: checked,
          remark: updatedUser.remark,
          approved_by: updatedUser.approved_by,
        },
        {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        }
      )
      .then(() => {
        const updatedUsers = car.map((item) =>
          item.id === row.id ? updatedUser : item
        );
        setCar(updatedUsers);
      })
      .catch((error) => {
        console.error("Error updating user status:", error);
      });
  };

  const columns = [
    {
      name: "Date",
      selector: (row: DataCarInterface) => row.date,
    },
    {
      name: "Brand",
      selector: (row: DataCarInterface) => row.car.brand,
    },
    {
      name: "Licence No",
      selector: (row: DataCarInterface) => row.car.licence_no,
    },
    {
      name: "Reserved By",
      selector: (row: DataCarInterface) => row.user.name,
    },
    {
      name: "Team",
      selector: (row: DataCarInterface) => row.user.team.name,
    },
    {
      name: "Title",
      selector: (row: DataCarInterface) => row.title,
    },
    {
      name: "Destination",
      selector: (row: DataCarInterface) => row.destination,
    },
    {
      name: "Passengers",
      selector: (row: DataCarInterface) => row.no_of_traveller,
    },
    {
      name: "Start Time",
      selector: (row: DataCarInterface) => TimeFormatConverter(row.start_time),
    },
    {
      name: "End Time",
      selector: (row: DataCarInterface) => TimeFormatConverter(row.end_time),
    },

    {
      name: "Status",
      cell: (row: DataCarInterface) => (
        <Switch
          checked={Boolean(row.status)}
          onChange={(event) => handleStatusChange(event, row)}
          disabled={
            (new Date(row.date) <= new Date() &&
              row.start_time.toString() < formattedTime) ||
            getCurrentDate() > getFormattedDate(new Date(row.date))
          }
        />
      ),
    },
  ];

  return (
    <>
      {isCarReserveFetching ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ReactLoading
            color={"blue"}
            type={"spin"}
            height={"80px"}
            width={"80px"}
          />
        </div>
      ) : (
        <TableContainer component={Paper} style={{ maxWidth: 1300 }}>
          <DataTable
            columns={columns}
            className={darkMode ? "darkTable" : ""}
            data={car}
            theme="solarized"
            pagination
            customStyles={{
              table: {
                style: {
                  backgroundColor: "#000",
                },
              },
              headRow: {
                style: {
                  backgroundColor: "#e0e2e7",
                  color: "#000",
                },
              },
            }}
          />
        </TableContainer>
      )}
    </>
  );
}

export default AdminCarRequest;