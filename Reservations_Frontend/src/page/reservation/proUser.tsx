
import ProUser from "../../components/User/proUser"
import Navbar from "../../components/navbar/Navbar"
import { Sidebar } from "../../components/sidebar/AdminSidebar"

export const UserPro = ()=> {
    return(
        <div className='home'>
            <Sidebar/>
            <div className="homeContainer">
                <Navbar/>
                <h1 style={{ textAlign:"center" , fontSize:"25px" , fontWeight:"700", marginTop:"10px"}}>Pro user  Page</h1>
                <div style={{ marginRight:"15px", marginTop:"50px" }}>
                <ProUser/>
                </div>
            </div>
            
        </div>
    )
}