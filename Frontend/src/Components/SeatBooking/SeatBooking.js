
import './seatbooking.css'

import movie_screen from './screen-thumb.png'
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Button  from 'react-bootstrap/Button';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';


const SeatBooking = () => {

    const chair = [1,2,3, 4, 5, 6, 7, 8];
    const gold_row = ["G1", "G2", "G3","G4","G5"];
    const diamond_row = ["D1","D2"];
    const navigate = useNavigate()

    const [price, setPrice] = useState(0);

    const [value , setValue ] = useState([]);

    const location = useLocation();

     let movie = location.state;

    
    const handleSeat = (seat, column) => {


    setValue(prev => {
        
        if(value.find(x => x[column] === seat ) ) {

          const data = value.filter(y => y[column] !== seat)  ;

          if(column.includes("G"))
          setPrice(prev =>  prev - 220 );

          if(column.includes("D"))
          setPrice(prev => prev - 300 );

          return data ; 

        }

        if(column.includes("G"))
        setPrice(prev =>  prev + 220);

        if(column.includes("D"))
        setPrice(prev =>  prev + 300); 

                
        return  [ ...prev, {[column] : seat } ]
    
    
        } )


    }



    const handleTicket = () => {

        movie.Ticket = value.length ;
        movie.Price = price;

        navigate("/booking-summery", {state: movie} );
    }

  


    return (

        <>
      <Navbar className="bg-body-tertiary" fixed="top" >
      <Container>
    
        <Navbar.Brand as = "button"  className='fs-6' onClick={() => navigate(-1) } ><ArrowBackIosNewOutlinedIcon/> {movie.Name}</Navbar.Brand>
    
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
          
          <h5><Badge bg="success">{value.length} Ticket </Badge></h5>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>

        <div className='body-new'>
        
    <ul className="showcase mt-5">
        <li>
            <div className="seat"></div>
            <small>Available</small>
        </li>
        <li>
            <div className="seat selected"></div>
            <small>Selected</small>
        </li>
        <li>
            <div className="seat occupied"></div>
            <small>Occupied</small>
        </li>
    </ul>

    <div className="container-new">
        <div className="movie-screen">
            <img src= {movie_screen}  alt='screen' />
        </div>

        <div className="row-container-new ">
            {
               gold_row.map(gold => <div className='row-new' key={gold} >

                {chair.map(item => {
                    
                    if((item ===4 && gold === 'G2' ) || (item === 2 && gold === 'G4') || ((item === 7 || item === 8 ) && gold === 'G3'  ) )
                    {
                     return <div key={item} className="seat occupied"></div>

                    }
                    

                    if(value.find(x => x[gold] === item ) )
                    return <div key={item} className= "seat selected" onClick={() => handleSeat(item, gold)} ></div>;

                    else
                    return <div key={item} className= "seat" onClick={() => handleSeat(item, gold)} ></div>
               
                     

                      } ) }
                   
               </div> ) 
            }
               
            <h5 className='subtitle'>GOLD - ₹220</h5>
            {
               diamond_row.map(diamond => <div className='row-new' key={diamond} >

                {chair.map(item => { 
                    
                    if(item === 1 && diamond === "D1"  )
                    return <div key={item} className="seat occupied"></div>;

                    if(value.find(x => x[diamond] === item ) )
                    return <div key={item} className= "seat selected" onClick={() => handleSeat(item, diamond)} ></div>;

                    else
                    return <div key={item} className= "seat" onClick={() => handleSeat(item, diamond)} ></div>

                     }  ) } 

                    </div> 

                   )
                     
            }
                   
           
            <h5 className='subtitle'>DIAMOND - ₹300</h5>

           
        </div>

    </div>
   
    </div>

    { 
        value.length > 0 && 
         
    <Navbar className="bg-body-tertiary" sticky="bottom" >
      <Container className="justify-content-center">
     <Button  onClick={handleTicket}  variant="danger"  className='w-50' >Pay Rs.{price}</Button>
     </Container>
    </Navbar>

    }


    </>

    )

}


export default SeatBooking;