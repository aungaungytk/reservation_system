import { useContext } from "react";
import CarCRUD from "../../components/create/CarCRUD";
import Navbar from "../../components/navbar/Navbar";
import { Sidebar } from "../../components/sidebar/AdminSidebar";
import { DarkModeContext } from "../../context/darkModeContext";

const CarCreate = () => {
    const {darkMode}= useContext(DarkModeContext);
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <h1
          className={darkMode? "dark_title":"page_title"}
        >
          Car Creation Page
        </h1>
        <div>
          <CarCRUD />
        </div>
      </div>
    </div>
  );
};

export default CarCreate;