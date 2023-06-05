import Navbar from "../../components/navbar/navbar";
import RoomReport from "../../components/report/roomReport";
import { Sidebar } from "../../components/sidebar/AdminSidebar";

export const ReportRoom  = () => {
    return(
        <div className='home'>
            <Sidebar/>
            <div className="homeContainer">
                <div style={{ position:"sticky" }}><Navbar/></div>
                <RoomReport/>
            </div>
            
        </div>
    );
};