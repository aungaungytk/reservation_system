
import Navbar from "../../components/navbar/navbar";
import TeamReport from "../../components/report/teamReport";
import { Sidebar } from "../../components/sidebar/AdminSidebar";

export const ReportTeam  = () => {
    return(
        <div className='home'>
            <Sidebar/>
            <div className="homeContainer">
                <div style={{ position:"sticky" }}><Navbar/></div>
                <TeamReport/>
            </div>
            
        </div>
    );
};