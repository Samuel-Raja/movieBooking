

import { Outlet } from "react-router-dom";
import AdminNavBar from "./AdminNavBar";

const AdminRootLayout = () => {


  return(  
   <> 
  <AdminNavBar/>
  <Outlet/>
  </>
  )


}



export default AdminRootLayout ;