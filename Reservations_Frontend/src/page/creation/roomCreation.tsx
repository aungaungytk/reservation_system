import { useContext } from "react";
import AdminRoomComponent from "../../components/create/room";
import Navbar from "../../components/navbar/Navbar";
import { Sidebar } from "../../components/sidebar/AdminSidebar";
import { DarkModeContext } from "../../context/darkModeContext";

export const RoomCreation  = () => {
    const {darkMode}= useContext(DarkModeContext);
    return(
        <div className='home'>
            <Sidebar/>
            <div className="homeContainer">
                <Navbar/>
                <h1 className={darkMode? "dark_title":"page_title"}>Room Creation Page </h1>
                <AdminRoomComponent/>
            </div>
            
        </div>
    );
};