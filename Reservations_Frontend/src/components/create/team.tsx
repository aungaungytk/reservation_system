import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  Paper,
  TableContainer,
} from "@mui/material";
import DataTable, { TableColumn } from "react-data-table-component";
import { DarkModeContext } from "../../context/darkModeContext";
import axios from "axios";
import { useAppSelector } from "../../redux/features/Hook";
import DriveFileRenameOutlineTwoToneIcon from "@mui/icons-material/DriveFileRenameOutlineTwoTone";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useTeamDataQuery } from "../api/api";
import ReactLoading from "react-loading";
interface DataRow {
  id: number;
  name: string;
}

function Team(): JSX.Element {
  const { darkMode } = useContext(DarkModeContext);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<DataRow[]>([]);
  const [teamData, setTeamData] = useState<DataRow[]>([]);
  const [, setIsUpdated] = useState(false);
  const [formValues, setFormValues] = useState<DataRow>({
    id: 0,
    name: "",
  });
  const [teamError, setTeamError] = useState("");
  const authRedux = useAppSelector((state) => state.auth);
  const { data: teamDataQuery, isFetching: isTeamFetching } =
    useTeamDataQuery();
  useEffect(() => {
    if (teamDataQuery && !isTeamFetching) {
      setTeamData(teamDataQuery.data);
      setIsUpdated(true);
    }
  }, [teamDataQuery, isTeamFetching]);
  const [teamUpdateError, setTeamUpdateError] = useState("");

  const handleFormChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { name, value } = event.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleCreate = () => {
    axios
      .post(
        "http://127.0.0.1:8000/api/teams",
        {
          name: formValues.name,
        },
        {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        }
      )
      .then(() => {
        setIsUpdated(true);
        setFormValues({ id: 0, name: "" });
        setTeamError("");
        setFormValues("");
        window.location.reload();
      })
      .catch((error) => {
        if (error.response.data.message.name) {
          setTeamError(error.response.data.message.name[0]);
        }
      });
  };

  const handleEdit = (row: DataRow) => {
    setFormValues({ ...row });
    setOpen(true);
  };
  const handleUpdate = () => {
    setIsUpdated(true);
    const updatedUser: DataRow = {
      ...formValues,
    };

    return new Promise<void>((resolve, reject) => {
      axios
        .patch(
          `http://127.0.0.1:8000/api/teams/${formValues.id}`,
          {
            id: updatedUser.id,
            name: updatedUser.name,
          },
          {
            headers: {
              Authorization: `Bearer ${authRedux.token}`,
            },
          }
        )
        .then(() => {
          const updatedUsers = user.map((item) =>
            item.id === formValues.id ? updatedUser : item
          );
          setUser(updatedUsers);
          setOpen(false);
          setIsUpdated(true);
          resolve();
          window.location.reload();
        })
        .catch((error) => {
          reject(error);
          setOpen(true);
          if (error.response.data.message.name) {
            setTeamUpdateError(error.response.data.message.name[0]);
          }
        });
    });
  };

  const handleDelete = (row: number) => {
    return new Promise<void>((resolve, reject) => {
      axios
        .delete(`http://127.0.0.1:8000/api/teams/${row}`, {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        })
        .then(() => {
          setTeamData((prevData) => prevData.filter((item) => item.id !== row));
          setIsUpdated(true);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const columns: TableColumn<DataRow>[] = [
    {
      name: "Team_id",
      selector: (row: DataRow) => row.id,
    },
    {
      name: "Team_Name",
      selector: (row: DataRow) => row.name,
    },
    {
      name: "Actions",
      cell: (row: DataRow) => (
        <>
          <div style={{ display: "flex" }}>
            <DriveFileRenameOutlineTwoToneIcon
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
              sx={{ marginLeft: "5px" }}
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
  return (
    <>
      {isTeamFetching ? (
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
          <form
            id="teamForm"
            style={{
              display: "flex",
              margin: "0 auto",
              width: "60%",
              marginBottom: "30px",
            }}
            onSubmit={(e) => {
              e.preventDefault();
              handleCreate();
            }}
          >
            <label
              htmlFor="name"
              style={{ marginTop: "20px", marginRight: "10px" }}
            >
              Create team Name:
            </label>
            <div>
              <input
                type="text"
                name="name"
                key={formValues.id}
                onChange={handleFormChange}
                style={{
                  width: "300px",
                  height: "50px",
                  marginTop: "5px",
                  marginRight: "5px",
                  border: "0.1px solid #000",
                  boxShadow: "2px 2px 2px #000",
                  borderRadius: "10px",
                }}
              />
              {teamError && (
                <div className="errorMessage" style={{ marginTop: "15px" }}>
                  {teamError}
                </div>
              )}
            </div>

            <div>
              <Button
                className={darkMode ? "dark_btn" : ""}
                variant="contained"
                color="primary"
                size="large"
                sx={{ margin: " 10px 10px 0px 10px" }}
                type="submit"
              >
                Create Team
              </Button>
            </div>
          </form>

          <TableContainer component={Paper} style={{ maxWidth: 1300 }}>
            <DataTable
              columns={columns}
              className={darkMode ? "darkTable" : ""}
              data={teamData}
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
                <form>
                  <div className="elem-group">
                    <label htmlFor="status">Team Name:</label>
                    <input
                      key={formValues.id}
                      type="text"
                      name="name"
                      value={formValues.name}
                      onChange={handleFormChange}
                      style={{ marginTop: "20px", marginBottom: "20px" }}
                    />
                  </div>
                  {teamUpdateError && (
                    <div className="errorMessage">{teamUpdateError}</div>
                  )}
                  <div className="btn-group">
                    <Button
                      onClick={handleUpdate}
                      variant="contained"
                      color="primary"
                      size="small"
                    >
                      Update
                    </Button>
                  </div>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
}

export default Team;
