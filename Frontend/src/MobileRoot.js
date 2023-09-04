

import { Outlet } from "react-router-dom";
import MobileSearch from "./Components/MobileSearch";

const MobileRoot = () => {


  return(  
   <> 
   <MobileSearch />
  <Outlet/>
  </>
  )


}



export default MobileRoot ;