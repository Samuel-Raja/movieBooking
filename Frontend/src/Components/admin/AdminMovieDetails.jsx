
import { useLocation, useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';


const AdminMovieDetails = () => {

 const location = useLocation();

 const navigate = useNavigate();

  const data = location.state;

  const handleBookNow = () => {

     
   navigate("/seat-booking", {state : data} );

  }

   return(

    <>
    <div  className="bg-dark d-flex text-white">
     <Image src={data.Src}  className="w-25" />
      <div>
     <h1 className="m-5">{data.Name}</h1>
     {/* <Button className="m-5" variant="danger" size="lg" onClick={handleBookNow}  >Book Now</Button> */}
     </div>
     
     </div>
    
    
    </> 

   )


}


export default AdminMovieDetails;