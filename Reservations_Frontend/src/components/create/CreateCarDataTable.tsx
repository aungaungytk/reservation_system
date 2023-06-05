/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Dialog,
  DialogContent,
  Paper,
  TableContainer,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { useAppSelector } from "../../redux/features/Hook";
import { DarkModeContext } from "../../context/darkModeContext";
import DriveFileRenameOutlineTwoToneIcon from "@mui/icons-material/DriveFileRenameOutlineTwoTone";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
interface CarData {
  id: number;
  brand: string;
  licence_no: string;
  capacity: number;
}
const CarDataTable = () => {
  const { darkMode } = useContext(DarkModeContext);
  const authRedux = useAppSelector((state) => state.auth);
  const [carData, setCarData] = useState<CarData[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);
  const [bradError, setBrandError] = useState("");
  const [licenceError, setLicenceError] = useState("");
  const [capacityError, setCapacityError] = useState("");
  const authToken = authRedux.token;
  const [inputValue, setInputValue] = useState<CarData>({
    id: 0,
    brand: "",
    capacity: 0,
    licence_no: "",
  });
  useEffect(() => {
    fetchCarList().then((response: any) => {
      setCarData(response.data);
      setRefresh(false);
    });
  }, [refresh]);

  const fetchCarList = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://127.0.0.1:8000/api/cars", {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const columns: TableColumn<CarData>[] = [
    {
      name: "Brand/Model",
      selector: (row: CarData) => row.brand,
    },
    {
      name: "Licence Plate",
      selector: (row: CarData) => row.licence_no,
    },
    {
      name: "Capacity",
      selector: (row: CarData) => row.capacity,
    },

    {
      name: "Actions",
      cell: (row: CarData) => (
        <>
          <div style={{ display: "flex" }}>
            <DriveFileRenameOutlineTwoToneIcon
              sx={{ cursor:"pointer" }}
              color="success"
              fontSize="large"
              onClick={(e: any) => {
                e.preventDefault();
                handleEdit(row);
              }}
            />
            <DeleteForeverIcon
              fontSize="large"
              color="error"
              sx={{ marginLeft: "5px", cursor:"pointer" }}
              onClick={(e: any) => {
                e.preventDefault();
                handleDelete(row.id);
              }}
            />
          </div>
        </>
      ),
    },
  ];

  const handleEdit = (data: CarData) => {
    setInputValue({ ...data });
    setOpen(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    sendDataToBackend();
    setRefresh(true);
    setBrandError("");
    setCapacityError("");
    setLicenceError("");
  };

  const sendDataToBackend = () => {
    const updatedCar: CarData = {
      ...inputValue,
    };

    axios
      .patch(`http://127.0.0.1:8000/api/cars/${inputValue.id}`, inputValue, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(() => {
        const updatedCars = carData.map((item) =>
          item.id === inputValue.id ? updatedCar : item
        );
        setCarData(updatedCars);
        setOpen(false);
        setRefresh(true);
      })
      .catch((error) => {
        setOpen(true);
        if (error.response.data.message.brand) {
          setBrandError(error.response.data.message.brand);
        }
        if (error.response.data.message.licence_no) {
          setLicenceError(error.response.data.message.licence_no);
        }
        if (error.response.data.message.capacity) {
          setCapacityError(error.response.data.message.capacity);
        }
      });
  };

  const onBackDropClick = () => {
    setOpen(false);
  };
  const handleDelete = (id: number) => {
    return new Promise<void>((resolve, reject) => {
      axios
        .delete(`http://127.0.0.1:8000/api/cars/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then(() => {
          setCarData((prevData) => prevData.filter((item) => item.id !== id));
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  return (
    <>
      <TableContainer component={Paper} style={{ maxWidth: 1300 }}>
        <DataTable
          columns={columns}
          className={darkMode ? "darkTable" : ""}
          data={carData}
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

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <div className="form">
            <div className="elem-group">
              <label htmlFor="brand">Brand / Model:</label>
              <input
                type="text"
                name="brand"
                value={inputValue.brand}
                onChange={handleInputChange}
              />
            </div>
            {bradError && <div className="errorMessage">{bradError}</div>}
            <div className="elem-group">
              <label htmlFor="licence_no">Licence No:</label>
              <input
                type="text"
                name="licence_no"
                value={inputValue.licence_no}
                onChange={handleInputChange}
              />
            </div>
            {licenceError && <div className="errorMessage">{licenceError}</div>}

            <div className="elem-group">
              <label htmlFor="Capacity">Capacity:</label>
              <input
                type="number"
                name="capacity"
                value={inputValue.capacity}
                onChange={handleInputChange}
              />
            </div>
            {capacityError && (
              <div className="errorMessage">{capacityError}</div>
            )}

            <div className="button-group">
              <Button
                onClick={handleUpdate}
                variant="contained"
                color="primary"
                size="small"
              >
                Update
              </Button>
              <Button
                onClick={onBackDropClick}
                variant="contained"
                color="primary"
                size="small"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CarDataTable;
