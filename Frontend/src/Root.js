

import { Outlet } from "react-router-dom";
import NavBar from "./Components/Navbar/NavBar";

const RootLayout = () => {


  return(  
   <> 
  <NavBar/>
  <Outlet/>
  </>
  )


}



export default RootLayout ;