import Navbar from "../../components/navbar/Navbar";
import CarReservationReport from "../../components/report/carReservation";
import { Sidebar } from "../../components/sidebar/AdminSidebar";

export const ReservationCarReport  = () => {
    return(
        <div className='home'>
            <Sidebar/>
            <div className="homeContainer">
                <div style={{ position:"sticky" }}><Navbar/></div>
                <CarReservationReport/>
            </div>
            
        </div>
    );
};