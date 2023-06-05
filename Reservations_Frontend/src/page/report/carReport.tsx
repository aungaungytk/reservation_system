import Navbar from "../../components/navbar/navbar";
import CarReport from "../../components/report/carReport";
import { Sidebar } from "../../components/sidebar/AdminSidebar";

export const ReportCar  = () => {
    return(
        <div className='home'>
            <Sidebar/>
            <div className="homeContainer">
                <div><Navbar/></div>
                <CarReport/>
            </div>
            
        </div>
    );
};