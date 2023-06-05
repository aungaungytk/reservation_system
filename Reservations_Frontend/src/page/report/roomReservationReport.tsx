import Navbar from "../../components/navbar/navbar";
import RoomReservationReport from "../../components/report/roomReservation";
import { Sidebar } from "../../components/sidebar/AdminSidebar";

export const ReservationRoomReport  = () => {
    return(
        <div className='home'>
            <Sidebar/>
            <div className="homeContainer">
                <div style={{ position:"sticky" }}><Navbar/></div>
                <RoomReservationReport/>
            </div>
            
        </div>
    );
};