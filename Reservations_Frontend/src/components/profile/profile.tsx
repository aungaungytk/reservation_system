import { useAppSelector } from "../../redux/features/Hook";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Dialog, DialogContent } from "@mui/material";

interface User {
  id: number;
  name: string;
  email: string;
  employee_id: string;
  phone: string;
  team: { id: number; name: string };
}
export default function PersonalProfile() {
  const authRedux = useAppSelector((state) => state.auth);
  const authUser = authRedux.user.id;
  const [open, setOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [user, setUser] = useState<User>({
    name: "",
    id: 0,
    email: "",
    employee_id: "",
    phone: "",
    team: { id: 0, name: "" },
  });

  useEffect(() => {
    getUser().then((response: any) => {
      setUser(response.data);
    });
  }, []);

  const getUser = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(`http://127.0.0.1:8000/api/users/${authUser}`, {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };

  const handleFormChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { value } = event.target;

    setNewPassword(value);
  };

  const handlePasswordChange = () => {
    setOpen(!open);
    setNewPassword("");
  };

  const handleSave = () => {
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `http://127.0.0.1:8000/api/password_change/${authUser}`,
          {
            password: newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${authRedux.token}`,
            },
          }
        )
        .then((response) => {
          setOpen(!open);
          resolve(response.data);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };

  return (
    <>
      <div className="profile-card">
        <div className="left-col">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
            alt="Avatar"
            className="profile-avartar"
          />
          <div className="profile-name">{user.name}</div>
          <div className="profile-team">{user.team.name}</div>
          <div className="btn-wrapper">
            <Button variant="text" onClick={handlePasswordChange}>
              Change Password
            </Button>
          </div>
        </div>
        <div className="right-col">
          <div className="profile-information">Information</div>
          <hr style={{ width: "380px" }} />
          <div className="profile-emp-group">
            <div className="profile-emp-id">Employee ID</div>
            <div className="profile-value-id">{user.employee_id}</div>
          </div>
          <div className="profile-email-group">
            <div className="profile-email">Email</div>
            <div className="profile-value-email">{user.email}</div>
          </div>
          <div className="profile-phone-group">
            <div className="profile-phone">Phone</div>
            <div className="profile-value-phone">{user.phone}</div>
          </div>
        </div>
      </div>

      <Dialog open={open} onClose={() => setOpen(!open)}>
        <DialogContent>
          <div className="form">
            <form>
              <div className="elem-group">
                <label htmlFor="status">New Password:</label>
                <input
                  type="text"
                  name="password"
                  value={newPassword}
                  onChange={handleFormChange}
                  style={{ marginTop: "20px", marginBottom: "20px" }}
                />
              </div>
              <div className="btn-group">
                <Button
                  onClick={handleSave}
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Save
                </Button>

                <Button
                  onClick={() => setOpen(!open)}
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
    </>
  );
}
