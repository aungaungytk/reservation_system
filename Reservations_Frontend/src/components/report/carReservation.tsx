import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { DarkModeContext } from "../../context/darkModeContext";
import SearchComponent from "../search/search";
import { useCarReserveDataQuery } from "../api/reservationApi";
import ReactLoading from "react-loading";
import { Paper, TableContainer } from "@mui/material";
import { TimeFormatConverter } from "../room/RoomReservation";
export interface DataCarInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  car: any;
  id: number;
  date: string;
  title: string;
  start_time: number;
  end_time: number;
  destination: string;
  no_of_traveller: number;
  status: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: { id: number; name: string; team: any };
  team: string;
  licence_no: string;
  approved_by: string;
  remark:string;
}

function CarReservationReport(): JSX.Element {
  const { darkMode } = useContext(DarkModeContext);
  const [carData, setCarData] = useState<DataCarInterface[]>([]);
  const [filterText, setFilterText] = useState("");
  const [, setInitialLoading] = useState(false);

  const { data: CarDataReserveQuery, isFetching: isCarReserveFetching } =
    useCarReserveDataQuery();
  useEffect(() => {
    if (CarDataReserveQuery && !isCarReserveFetching) {
      setInitialLoading(true);
      setCarData(CarDataReserveQuery.data);
    }
  }, [CarDataReserveQuery, isCarReserveFetching]);

  const columns: TableColumn<DataCarInterface>[] = useMemo(
    () => [
      {
        name: "Date",
        selector: (row: DataCarInterface) => row.date,
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
        name: "Team Name",
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
        selector: (row: DataCarInterface) =>
          row.status == 1 ? "success" : "pending",
      },
    ],
    []
  );

  const filteredData = useMemo(() => {
    if (filterText.trim() === "") {
      return carData;
    } else {
      return carData.filter((item) => {
        const searchText = filterText.toLowerCase();
        return (
          item.date.toString().includes(searchText) ||
          item.car.licence_no.toString().toLowerCase().includes(searchText) ||
          item.car.toString().toLowerCase().includes(searchText) ||
          item.destination.toString().toLowerCase().includes(searchText) ||
          item.end_time.toString().toLowerCase().includes(searchText) ||
          item.start_time.toString().toLowerCase().includes(searchText) ||
          String(item.no_of_traveller).includes(searchText) ||
          item.user.team.name.toLowerCase().includes(searchText) ||
          item.user.name.toString().toLowerCase().includes(searchText) ||
          item.title.toString().toLowerCase().includes(searchText)
        );
      });
    }
  }, [carData, filterText]);

  const handleFilterTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  const handleClearFilter = () => {
    setFilterText("");
  };
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
    ): (
      <>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 className={darkMode ? 'dark_title' : 'page_title'}>
          Car Reservation List Report
        </h1>
        <SearchComponent
          onFilter={handleFilterTextChange}
          onClear={handleClearFilter}
          filterText={filterText}
        />
      </div>
      <div style={{ maxWidth: "100%", overflowX: "auto" }}>
      <TableContainer component={Paper} style={{ maxWidth: 1300 }}>

        <DataTable
          responsive
          columns={columns}
          className={darkMode ? "darkTable" : ""}
          data={filteredData}
          fixedHeaderScrollHeight="100px"
          theme="solarized"
          pagination
          customStyles={{
            table: {
              style: {
                maxWidth: "100%",

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
      </div>
      </>
    )}
      
    </>
  );
}

export default CarReservationReport;
