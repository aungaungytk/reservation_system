import Team from "../../components/create/team";
import Navbar from "../../components/navbar/Navbar";
import { Sidebar } from "../../components/sidebar/AdminSidebar";

export const TeamCreation  = () => {
    return(
        <div className='home'>
            <Sidebar/>
            <div className="homeContainer">
                <div style={{ position:"sticky" }}><Navbar/></div>
                <Team/>
            </div>
            
        </div>
    );
};