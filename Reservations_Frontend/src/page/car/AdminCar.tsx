import Navbar from "../../components/navbar/Navbar";
import { Sidebar } from "../../components/sidebar/AdminSidebar";
import AdminCarRequest from "../../components/car/AdminCar";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";

// import React from 'react';
export const Car  = () => {
    const {darkMode} = useContext(DarkModeContext);
    return(
        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <h1 className={darkMode? "dark_title":"page_title"}>Car Reservation Requests Page</h1>

                <div>
                    <AdminCarRequest />
                    
                </div>

            </div>
        </div>
    );
};