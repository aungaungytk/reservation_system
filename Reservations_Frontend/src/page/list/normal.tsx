import { useContext } from "react";
import NormalUser from "../../components/User/normaluser";
import Navbar from "../../components/navbar/Navbar";
import { Sidebar } from "../../components/sidebar/AdminSidebar";
import { DarkModeContext } from "../../context/darkModeContext";


export const NormalUserList  = () => {
    const {darkMode} =useContext(DarkModeContext)

    return(
        <div className='home'>
            <Sidebar/>
            <div className="homeContainer">
                <Navbar/>
                <h1 className={darkMode? "dark_title":"page_title"}>Normal User List Process Page</h1>
                <NormalUser/>
            </div>
    </div>
    );
};