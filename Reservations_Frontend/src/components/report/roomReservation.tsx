import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { DarkModeContext } from "../../context/darkModeContext";
import SearchComponent from "../search/search";
import { useRoomReserveDataQuery } from "../api/reservationApi";
import ReactLoading from "react-loading";
import { TimeFormatConverter } from "../room/RoomReservation";
import { Paper, TableContainer } from "@mui/material";
export interface RoomDataInterface {
  car: any;
  id: number;
  date: string;
  title: string;
  start_time: number;
  end_time: number;
  description: string;
  room: { id: number; name: string };
  user: { id: number; name: string; team: any };
}

function RoomReservationReport(): JSX.Element {
  const { darkMode } = useContext(DarkModeContext);
  const [roomData, setRoomData] = useState<RoomDataInterface[]>([]);
  const [filterText, setFilterText] = useState("");
  const { data: carDataQuery, isFetching: iscarFetching } =
  useRoomReserveDataQuery();
  useEffect(() => {
    if (carDataQuery && !iscarFetching) {
      setRoomData(carDataQuery.data);
    }
  }, [carDataQuery,iscarFetching]);

  const columns: TableColumn<RoomDataInterface>[] = useMemo(
    () => [
      {
        name: "Date",
        selector: (row: RoomDataInterface) => row.date,
      },
      {
        name: "Reserved By",
        selector: (row: RoomDataInterface) => row.user.name,
      },
      {
        name: "Team Name",
        selector: (row: RoomDataInterface) => row.user.team.name,
      },
      {
        name: "Room Name",
        selector: (row: RoomDataInterface) => row.room.name,
      },
      {
        name: "Title",
        selector: (row: RoomDataInterface) => row.title,
      },
      {
        name: "Description",
        selector: (row: RoomDataInterface) => row.description,
      },
      {
        name: "Start Time",
        selector: (row: RoomDataInterface) => TimeFormatConverter(row.start_time),
      },
      {
        name: "End Time",
        selector: (row: RoomDataInterface) => TimeFormatConverter(row.end_time),
      },
    ],
    []
  );

  const filteredData = useMemo(() => {
    if (filterText.trim() === "") {
      return roomData;
    } else {
      return roomData.filter((item) => {
        const searchText = filterText.toLowerCase();
        return (
          item.date.toString().includes(searchText) ||
          item.title.toLowerCase().includes(searchText) ||
          item.description.toLowerCase().includes(searchText) ||
          item.room.name.toLowerCase().includes(searchText) ||
          item.end_time.toString().toLowerCase().includes(searchText) ||
          item.start_time.toString().toLowerCase().includes(searchText) ||
          item.user.team.name.toLowerCase().includes(searchText) ||
          item.user.name.toLowerCase().includes(searchText)
        );
      });
    }
  }, [roomData, filterText]);

  const handleFilterTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  const handleClearFilter = () => {
    setFilterText("");
  };
  return (
    <>
    {iscarFetching ? (
      <div style={{ display: "flex", justifyContent: "center" }}>
      <ReactLoading
        color={"blue"}
        type={"spin"}
        height={"80px"}
        width={"80px"}
      />
    </div>
    ):(
      <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 className={darkMode ? 'dark_title' : 'page_title'}>
          Room Reservation List Report
        </h1>
        <SearchComponent
          onFilter={handleFilterTextChange}
          onClear={handleClearFilter}
          filterText={filterText}
        />
      </div>
      <TableContainer component={Paper} style={{ maxWidth: 1300 }}>

      <DataTable
        columns={columns}
        className={darkMode ? "darkTable" : ""}
        data={filteredData}
        theme="solarized"
        style={{ maxWidth:"700px" }}
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

      </>
    )}
      
    </>
  );
}

export default RoomReservationReport;
