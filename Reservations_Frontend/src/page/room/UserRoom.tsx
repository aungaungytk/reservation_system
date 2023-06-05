import Navbar from "../../components/navbar/Navbar";
import { Sidebar } from "../../components/sidebar/UserSidbar";
import Room from "./Room";


export const UserRoom  = () => {
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