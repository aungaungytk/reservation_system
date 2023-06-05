import Button from "@mui/material/Button/Button";
import DataTable, { TableColumn } from "react-data-table-component";
import React, { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { useAppSelector } from "../../redux/features/Hook";
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckIcon from '@mui/icons-material/Check';

import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  TableContainer,
} from "@mui/material";
import "../../style/components/room/MUItable.scss";
import {
  TimeFormatConverter,
  formattedTime,
  getCurrentDate,
  getFormattedDate,
} from "../room/RoomReservation";

interface DataRow {
  car: { id: number; licence_no: string; brand: string };
  id: number;
  date: string;
  title: string;
  carno: string;
  destination: string;
  no_of_traveller: string;
  start_time: number;
  end_time: number;
  status: boolean;
  user: { id: number; name: string; team: { id: number; name: string } };
}
interface TableProps {
  date: string;
}

const TableCar: React.FC<TableProps> = ({ date }) => {
  const { darkMode } = useContext(DarkModeContext);
  const authRedux = useAppSelector((state) => state.auth);
  const [user, setUser] = useState<DataRow[]>([]);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    getCarReservationData().then((response: any) => {
      setUser(response.data);
    });
  }, [date]);

  const getCarReservationData = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `http://localhost:8000/api/getCarReservationSearchByDate/${date}`,
          {
            headers: {
              Authorization: `Bearer ${authRedux.token}`,
            },
          }
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };

  const handleClose = () => {
    setOpenDelete(false);
  };

  const handleDelete = (id: number) => {
    return new Promise<void>((resolve, reject) => {
      axios
        .delete(`http://127.0.0.1:8000/api/car_reservation/${id}`, {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        })
        .then((response) => {
          setOpenDelete(true);
          setUser((prevData) => prevData.filter((item) => item.id !== id));
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const columns = [
    {
      name: "Date",
      selector: (row: DataRow) => row.date,
    },
    {
      name: "Request User",
      selector: (row: DataRow) => row.user.name,
    },
    {
      name: "Brand",
      selector: (row: DataRow) => row.car.brand,
    },
    {
      name: "Licence No",
      selector: (row: DataRow) => row.car.licence_no,
    },

    {
      name: "Title",
      selector: (row: DataRow) => row.title,
    },
    {
      name: "Destination",
      selector: (row: DataRow) => row.destination,
    },
    {
      name: "Start Time",
      selector: (row: DataRow) => TimeFormatConverter(row.start_time),
    },
    {
      name: "End Time",
      selector: (row: DataRow) => TimeFormatConverter(row.end_time),
    },
    {
      name: "Passengers",
      selector: (row: DataRow) => row.no_of_traveller,
    },
    {
      name: "Team Name",
      cell: (row: DataRow) => row.user.team.name,
    },
    {
      name: "Status",
      cell: (row: DataRow) =>
        row.status == true ? (
          <Button color="success">Success</Button>
        ) : (
          <Button color="warning">Pending</Button>
        ),
    },

    {
      name: "Action",
      cell: (row: DataRow) => (
        <Button
          variant="contained"
          color="error"
          size="small"
          sx={{ marginLeft: "5px" }}
          onClick={(e: any) => {
            e.preventDefault();
            handleDelete(row.id);
          }}
          disabled={
            (new Date(row.date) <= new Date() &&
              row.start_time.toString() < formattedTime) ||
            getCurrentDate() > getFormattedDate(new Date(row.date)) ||
            authRedux.user.id !== row.user.id ||
            row.status == true
          }
        >
          <DeleteForeverIcon
            fontSize="large"
            sx={{ marginLeft: "5px", cursor: "pointer" }}
          />{" "}
        </Button>
      ),
    },
  ];

  return (
    <>
      <TableContainer component={Paper} style={{ maxWidth: 1300 }}>
        <DataTable
          columns={columns}
          className={darkMode ? "darkTable" : ""}
          data={user}
          theme="solarized"
          pagination
          style={{ fontSize: "30px" }}
          customStyles={{
            table: {
              style: {
                backgroundColor: "#ee6",
                fontSize: "30 px",
              },
            },
            headRow: {
              style: {
                backgroundColor: "#e0e2e7", // Set your desired header color here
                color: "#000",
                fontSize: "30 px", // Set the text color for the header
              },
            },
          }}
        />
      </TableContainer>
      <Dialog open={openDelete} onClose={handleClose} className="dialog">
        <DialogTitle className="dialog__title"></DialogTitle>
        <DialogContent>
          <DialogContentText>
            <h2 className="dialog__title">
              {" "}
              Your reservation successfully deleted.
            </h2>
          </DialogContentText>
        </DialogContent>
        <div className="dialog__button-group">
          <Button onClick={handleClose} style={{ textAlign: "center" }}>
            Close
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default TableCar;