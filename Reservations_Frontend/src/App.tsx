import { Routes, Route, Navigate } from "react-router-dom";
import { DarkModeContext } from "./context/darkModeContext";
import { useContext } from "react";
import AuthProvider from "./redux/authProvider";
import { useAppSelector } from "./redux/features/Hook";
import { AuthRole } from "./redux/features/type/authType";
import Register from "./page/register/register";
import Error404 from "./page/error/Error404";
import AdminView from "./page/adminView/AdminView";
import UserView from "./page/userView/UserView";
import Login from "./page/login/login";
import CarStatusUpdate from "./components/car/AdminCar";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const authRedux = useAppSelector((state) => state.auth);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <AuthProvider>
        <Routes>
          <Route path="/adminCar" element={<CarStatusUpdate />} />

          <Route path="/register" element={<Register />} />
          {authRedux.auth === true ? (
            <>
              <Route path="/" element={<Login />} />
              {(authRedux.role === AuthRole.Superadmin ||
                authRedux.role === AuthRole.Admin) && (
                <Route
                  path={`/${authRedux.role}-dashboard/*`}
                  element={<AdminView />}
                />
              )}
              {authRedux.role === AuthRole.staff && (
                <Route
                  path={`/${authRedux.role}-dashboard/*`}
                  element={<UserView />}
                />
              )}
            </>
          ) : (
            <>
              <Route
                path="/"
                element={<Navigate to="/login" replace={true} />}
              />
              <Route path="/login" element={<Login />} />
            </>
          )}
          <Route path="/*" element={<Error404 />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
