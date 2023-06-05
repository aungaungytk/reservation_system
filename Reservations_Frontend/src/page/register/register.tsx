import React, { useEffect, useState } from "react";
import CustomPhoneInput from "react-phone-input-2";

import "react-phone-input-2/lib/style.css";
import { Link } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import AcePlus from "../../components/img/ACEPlus.png";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";

interface Team {
  id: number;
  name: string;
}
const Register: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [teamName, setTeamName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [employee_id, setEmployeeId] = useState("");
  const [status, setStatus] = useState(false);
  const [role, setRole] = useState(3);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [cfmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [employeeError, setEmployeeError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [cPasswordError, setcPasswordError] = useState("");
 

  const [teamList, setTeamList] = useState<[Team]>([
    {
      id: 0,
      name: "",
    },
  ]);

  useEffect(() => {
    getTeams().then((response: any) => {
      setTeamList(response.data.data);
    });
  }, []);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/register", {
        name: userName,
        email: email,
        employee_id: employee_id,
        password: password,
        status: status,
        team_id: teamName,
        role_id: role,
        phone: phone,
        password_confirmation: cfmPassword,
      })
      .then(function (response) {

        if (response.status == 200) {
          setUserName("");
          setEmail("");
          setConfirmPassword("");
          setPassword("");
          setTeamName("");
          setMessage("");
          setPhone("");
          setEmployeeId("");
          setOpen(true);
        }
      })

      .catch((error) => {
        if (error.response.data.message.email) {
          setEmailError(error.response.data.message.email[0]);
        }

        if (error.response.data.message.password) {
          setPasswordError(error.response.data.message.password[0]);
        }
        if (error.response.data.message.name) {
          setNameError(error.response.data.message.name[0]);
        }

        if (error.response.data.message.password_confirmation) {
          setcPasswordError(
            error.response.data.message.password_confirmation[0]
          );
        }
        if (error.response.data.message.employee_id) {
          setEmployeeError(error.response.data.message.employee_id[0]);
        }

        if (error.response.data.message.phone) {
          setPhoneError(error.response.data.message.phone[0]);
        }
        console.log(error);
      });
    setNameError("");
    setEmailError("");
    setEmployeeError("");
    setPasswordError("");
    setcPasswordError("");
    setPhoneError("");
    setMessage("");
  };
  const handleClose = () => {
    setOpen(false);
  };
  const getTeams = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://127.0.0.1:8000/api/teams")
        .then((response) => {
          setTeamList(response.data.data);
          if (response.data.data.length > 0) {
            setTeamName(response.data.data[0].id.toString());
          }
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };

  return (
    <div className="register">
      <div className="register_wrapper">
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="txt-register">
              {" "}
              <span style={{ marginTop: "3px" }}>Register Form</span>{" "}
              <HowToRegIcon fontSize="medium" />
            </div>
            {message ? <p className="errorMessage">{message}</p> : ""}
            <div className="name-group">
              <input
                type="text"
                id="username"
                name="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="username"
              />
            </div>
            {nameError && <div className="errorMessage">{nameError}</div>}

            <div className="emaiil-group">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user.aceplus@gmail.com"
              />
            </div>
            {emailError && <div className="errorMessage">{emailError}</div>}
            <div className="password-group">
              <input
                type="text"
                name="employeeId"
                value={employee_id}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="ACE-****"
              />
            </div>
            {employeeError && (
              <div className="errorMessage">{employeeError}</div>
            )}

            <div className="phone-group">
              <CustomPhoneInput
                country="mm"
                value={phone}
                onChange={(phone) => setPhone(phone)}
              />
            </div>
            {phoneError && <div className="errorMessage">{phoneError}</div>}
            <div className="team-group">
              {teamList === null ? (
                <p>Loading teams...</p>
              ) : teamList.length === null ? (
                <p>No teams found</p>
              ) : (
                <select
                  className="team"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                >
                  {teamList.map((team) => (
                    <option key={team.id} value={team.id.toString()}>
                      {team.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="password">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
            {passwordError && (
              <div className="errorMessage">{passwordError}</div>
            )}
            <div className="confirmPassword">
              <input
                type="password"
                id="confirmPassword"
                name="cfm_Password"
                value={cfmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Enter confirm password"
              />
            </div>
            {cPasswordError && (
              <div className="errorMessage">{cPasswordError}</div>
            )}

            <div className="submit">
              <button type="submit">Register Me</button>
            </div>
            <div className="txt-link">
              <span className="text">
                Already have an account?{" "}
                <Link to="/login" className="login-link">
                  Login
                </Link>
              </span>
            </div>
          </form>
          <Dialog open={open} onClose={handleClose} className="dialog">
            <DialogTitle className="dialog__title">
              <h1>Successfully Registered!</h1>
              <div className="dialog__thanks-text">
                Thank you for registering with us
              </div>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <div className="dialog__img">
                  <div className="dialog__circle">
                    <img
                      src="../src/components/img/email-icon.jpg"
                      alt="Small Photo"
                      style={{ width: "100px", height: "100px" }}
                    />
                  </div>
                </div>
                {`Please wait for admin approved to login and we will send message to
                your email address after admin has approved.`}
              </DialogContentText>
            </DialogContent>
            <div className="dialog__button-group">
              <Button onClick={handleClose} style={{ textAlign: "center" }}>
                Close
              </Button>
            </div>
          </Dialog>
        </div>
        <div className="inner-wrapper">
          <div className="inner-right">
            <div style={{ marginTop: "0" }}>
              <img src={AcePlus} alt="" width={180} />
            </div>
            <div className="waviy">
              <span style={{ "--i": 1 } as React.CSSProperties}>OFFICE </span>
              <span style={{ "--i": 2 } as React.CSSProperties}>MEETING</span>
              <span style={{ "--i": 3 } as React.CSSProperties}>ROOM</span>
              <span style={{ "--i": 4 } as React.CSSProperties}>&</span>
              <span style={{ "--i": 5 } as React.CSSProperties}>CAR</span>
              <span style={{ "--i": 6 } as React.CSSProperties}>
                RESERVATION
              </span>
              <span style={{ "--i": 7 } as React.CSSProperties}>SYSTEM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
