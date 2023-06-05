import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/features/Hook";
import { setAuth } from "../../redux/features/auth/authSlice";
import { AuthRole } from "../../redux/features/type/authType";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import axios from "axios";
import AcePlus from "../../components/img/ACEPlus.png";

function getUserData({ email, password }: any) {
  return new Promise((resolve, reject) => {
    axios
      .post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      })
      .then(function (response: { data: unknown }) {
        resolve(response.data);
      })
      .catch((reason: any) => {
        reject(reason);
      });
  });
}
const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [input, setInput] = React.useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = React.useState("LOGIN");
  const authRedux = useAppSelector((state) => state.auth);
  const [alert, setAlert] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState("");

  async function onClickHandle(ev: any) {
    ev.preventDefault();

    setStatus("PROCESSING......");
    getUserData(input)
      .then((res: any) => {
        setStatus("SUCCESS");
        dispatch(
          setAuth({
            auth: true,
            role: res.role,
            token: res.token,
            user: {
              id: res.user.id,
              email: res.user.email,
              name: res.user.name,
            },
          })
        );

        navigate(`/${res.role}-dashboard/home`);
      })
      .catch((error) => {
        setStatus("LOGIN");
        setAlert(true);
        if (error.response.data.message.email) {
          setEmailError(error.response.data.message.email[0]);
        }

        if (error.response.data.message.password) {
          setPasswordError(error.response.data.message.password[0]);
        }

        if (error.response.data.message.error) {
          setMessage(error.response.data.message.error);
        }
      });
    setEmailError("");
    setPasswordError("");
    setMessage("");
  }
  React.useEffect(() => {
    if (authRedux.auth === true) {
      if (authRedux.role === AuthRole.Admin) navigate("/Admin-dashboard/home");
      if (authRedux.role === AuthRole.staff) navigate("/staff-dashboard/home");
      if (authRedux.role === AuthRole.Superadmin)
        navigate("/SuperAdmin-dashboard/home");
    }
  }, []);
  return (
    <div className="login">
      <div className="container" id="container">
        <div className="form-container">
          <form onSubmit={onClickHandle}>
            <div className="txt-login">
              <span style={{ marginTop: "3px" }}>Login Form</span>
              <AccountCircleOutlinedIcon />
            </div>
            {message && <div className="errorMessage">{message}</div>}

            <input
              type="email"
              name="email"
              value={input.email}
              onChange={(e) => {
                setInput({ ...input, email: e.target.value });
              }}
              required
            />
            {emailError && <div className="errorMessage">{emailError}</div>}
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={(e) => {
                setInput({ ...input, password: e.target.value });
              }}
              required
            />
            {passwordError && (
              <div className="errorMessage">{passwordError}</div>
            )}

            <button type="submit" onClick={onClickHandle}>
              {status}
            </button>

            <div className="text-link">
              <span className="text">
                Not a member?
                <Link to="/register" className="register-link">
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay-right">
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

export default Login;
