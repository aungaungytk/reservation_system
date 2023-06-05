import NormalUser from "../../components/User/normaluser"
import Navbar from "../../components/navbar/navbar"
import { Sidebar } from "../../components/sidebar/AdminSidebar"

export const UserNormal = ()=> {
    return(
        <div className='home'>
            <Sidebar/>
            <div className="homeContainer">
                <Navbar/>
                <h1 style={{ textAlign:"center" , fontSize:"25px" , fontWeight:"700", marginTop:"10px"}}>Normal user  Page</h1>
                <div style={{ marginRight:"15px", marginTop:"50px" }}>
                <NormalUser/>
                </div>
            </div>
            
        </div>
    )
}