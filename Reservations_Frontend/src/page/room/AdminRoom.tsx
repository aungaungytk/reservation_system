import Navbar from "../../components/navbar/Navbar";
import { Sidebar } from "../../components/sidebar/AdminSidebar";
import Room from "./Room";


export const AdminRoom  = () => {
    return(
        <div className='home'>
            <Sidebar/>
            <div className="homeContainer">
                <Navbar/>
                <Room/>
            </div>
            
        </div>
    );
};