import Navbar from "../../components/navbar/Navbar";
import PersonalProfile from "../../components/profile/profile";
import { Sidebar } from "../../components/sidebar/AdminSidebar";


export const Profile  = () => {
    return(
        <div className='home'>
            <Sidebar/>
            <div className="homeContainer">
                <Navbar/>
                <PersonalProfile/>
            </div>
    </div>
   
    );
};