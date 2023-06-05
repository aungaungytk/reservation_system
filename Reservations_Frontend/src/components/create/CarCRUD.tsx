/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Dialog, DialogContent } from "@mui/material";
import { useAppSelector } from "../../redux/features/Hook";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import CarDataTable from "./CreateCarDataTable";
import { DarkModeContext } from "../../context/darkModeContext";
import { useCarListDataQuery } from "../api/api";
import ReactLoading from "react-loading";
export interface CarData {
  id: number;
  brand: string;
  licence_no: string;
  capacity: number;
}
const CarCRUD = () => {
  const authRedux = useAppSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [, setCarData] = useState<CarData[]>([]);
  const [refresh, setRefresh] = useState(false);
  const { darkMode } = useContext(DarkModeContext);
  const [brandError, setBrandError] = useState("");
  const [licenceError, setLicenceError] = useState("");
  const [capacityError, setCapacityError] = useState("");
  const initialValue: CarData = {
    id: 0,
    brand: "",
    capacity: 1,
    licence_no: "",
  };
  const [inputValue, setInputValue] = useState(initialValue);
  const { data: userCarQuery, isFetching: isCarFetching } =
    useCarListDataQuery();
  useEffect(() => {
    if (userCarQuery && !isCarFetching) {
      setCarData(userCarQuery.data);
      setRefresh(false);
    }
  }, [userCarQuery, isCarFetching]);
  // useEffect(() => {
  //   fetchCarList().then((response: any) => {
  //     setCarData(response.data);
  //     setRefresh(false);
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [refresh]);

  // const fetchCarList = () => {
  //   return new Promise((resolve, reject) => {
  //     axios
  //       .get("http://127.0.0.1:8000/api/cars", {
  //         headers: {
  //           Authorization: `Bearer ${authRedux.token}`,
  //         },
  //       })
  //       .then((response) => {
  //         resolve(response.data);
  //         setRefresh(true);
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //   });
  // };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleAddNewCar = () => {
    setOpen(true);
    setInputValue(initialValue);
    setBrandError("");
    setCapacityError("");
    setLicenceError("");
  };
  const handleCreate = (_e: any) => {
    sendDataToBackend({ inputValue });
    setBrandError("");
    setCapacityError("");
    setLicenceError("");
    setInputValue(initialValue);
  };

  const sendDataToBackend = (data: { inputValue: CarData }) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          "http://127.0.0.1:8000/api/cars",
          JSON.stringify(data.inputValue),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authRedux.token}`,
            },
          }
        )
        .then((response) => {
          resolve(response.data);
          setOpen(false);
          console.log(response.data);
          window.location.reload();
        })
        .catch((error) => {
          setOpen(true);
          if (error.response.data.message.brand) {
            setBrandError(error.response.data.message.brand);
          }
          if (error.response.data.message.licence_no) {
            setLicenceError(error.response.data.message.licence_no[0]);
          }
          if (error.response.data.message.capacity) {
            setCapacityError(error.response.data.message.capacity[0]);
          }
        });
    });
  };
  const onBackDropClick = () => {
    setOpen(false);
    setInputValue(initialValue);
    setBrandError("");
    setCapacityError("");
    setLicenceError("");
  };

  return (
    <>
      {isCarFetching ? (
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
          <div style={{ marginLeft: "13px" }}>
            <Button
              className={darkMode ? "dark_btn" : ""}
              onClick={(e: any) => {
                e.preventDefault();
                handleAddNewCar();
              }}
              size="medium"
              variant="contained"
              disableRipple
              sx={{ margin: "0px 20px 20px 0px" }}
            >
              Add New
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
              <DialogContent>
                <div className="form">
                  <h1>Add New Car</h1>
                  <form>
                    <div className="elem-group">
                      <label htmlFor="brand">Brand / Model:</label>
                      <input
                        type="text"
                        name="brand"
                        value={inputValue.brand}
                        onChange={handleInputChange}
                      />
                    </div>
                    {brandError && (
                      <div className="errorMessage">{brandError}</div>
                    )}
                    <div className="elem-group">
                      <label htmlFor="licence_no">Licence No:</label>
                      <input
                        type="text"
                        name="licence_no"
                        value={inputValue.licence_no}
                        onChange={handleInputChange}
                      />
                    </div>
                    {licenceError && (
                      <div className="errorMessage">{licenceError}</div>
                    )}

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
                        onClick={handleCreate}
                        variant="contained"
                        color="primary"
                        size="small"
                      >
                        Create
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
                  </form>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <CarDataTable />
        </>
      )}
    </>
  );
};

export default CarCRUD;
