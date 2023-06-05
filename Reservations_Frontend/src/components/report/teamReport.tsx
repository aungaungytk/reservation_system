import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";

import DataTable, { TableColumn } from "react-data-table-component";
import { DarkModeContext } from "../../context/darkModeContext";
import SearchComponent from "../search/search";
import { useTeamUserDataQuery } from "../api/api";
import ReactLoading from "react-loading";
import { Paper, TableContainer } from "@mui/material";
interface DataRow {
  id: number;
  name: string;
  team: { id: number; name: string };
}

function TeamReport(): JSX.Element {
  const { darkMode } = useContext(DarkModeContext);
  const [teamData, setTeamData] = useState<DataRow[]>([]);
  const [filterText, setFilterText] = useState("");
  const [, setIsUpdated] = useState(false);

  const { data: userDataQuery, isFetching: isUserFetching } =
    useTeamUserDataQuery();
  useEffect(() => {
    if (userDataQuery && !isUserFetching) {
      setTeamData(userDataQuery.data);
      setIsUpdated(true);
    }
  }, [userDataQuery, isUserFetching]);

  const columns: TableColumn<DataRow>[] = useMemo(
    () => [
      {
        name: "Team_Name",
        selector: (row: DataRow) => row.team.name,
      },
      {
        name: "Member",
        selector: (row: DataRow) => row.name,
      },
    ],
    []
  );

  const filteredData = useMemo(() => {
    if (filterText.trim() === "") {
      return teamData;
    } else {
      return teamData.filter((item) => {
        const searchText = filterText.toLowerCase();
        return (
          item.name.toLowerCase().includes(searchText) ||
          item.team.name.toLowerCase().includes(searchText)
        );
      });
    }
  }, [teamData, filterText]);

  const handleFilterTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  const handleClearFilter = () => {
    setFilterText("");
  };
  return (
    <>
      {isUserFetching ? (
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1 className={darkMode ? "dark_title" : "page_title"}>
              Team List Report
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

export default TeamReport;
