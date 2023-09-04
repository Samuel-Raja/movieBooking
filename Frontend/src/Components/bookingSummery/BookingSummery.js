import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import { useLocation, useNavigate } from 'react-router-dom';
import Image from 'react-bootstrap/Image'
import Navbar from 'react-bootstrap/Navbar';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';

import  "./booking_summery.css"
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


const BookingSummery =  () => {


 const location = useLocation();
 
 const data = location.state;

 const navigate = useNavigate();

 const isLogin = useSelector(state=>  state.search_movies.isLogin);


 useEffect(()=> {

  if(!isLogin){
    navigate('/user-login')
  }

 }, [])



 const handleSummery = () => {


   navigate("/movie-ticket", {state: data} );
   

 }




    return (
        <>

<Navbar className="bg-body-tertiary" sticky="top" >
      <Container>
    
        <Navbar.Brand as = "button"  className='fs-6' onClick={() => navigate(-1) } ><ArrowBackIosNewOutlinedIcon/> {data.Name}</Navbar.Brand>
    
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
          
          <h5><Badge bg="success">{data.Ticket} Ticket </Badge></h5>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>     

<div class="row g-0 bg-body-secondary position-relative">
  <div class="col-md-6 mb-md-0 p-md-4">
    <img src="https://images.ctfassets.net/cnu0m8re1exe/7aZeyiA6QhG9WBov0yF33Z/b1a5d16223ec3db1d04c9e11523883d4/shutterstock_1954316851__1_.jpg?fm=jpg&fl=progressive&w=660&h=433&fit=fill" class="w-100" alt="..."/>
  </div>
  <div class="col-md-6 p-4 ps-md-0">
  <div class="payment">
      <div class="receipt-box">
        <h3>Booking Summery</h3>
        <table class="table-summery">
          <tr>
            <td>Seat</td>
            <td>{data.Ticket} Ticket </td>
          </tr>
          <tr>
            <td>Amount</td>
            <td>Rs. {data.Price}</td>
          </tr>
          <tr>
            <td> Convenience fees</td>
            <td>Rs. {20 * data.Ticket }</td>
          </tr>
          
          <tfoot>
            <tr>
              <td>Sub Total</td>
              <td>{data.Price + (20 * data.Ticket) }</td>
            </tr>
          </tfoot>
        </table>

      </div>
      <div class="payment-info">
        
        <table className='table-summery'>
        
        <tr>
              <td><h5>Amount Payable</h5></td>
              <td><h5>{data.Price + (20 * data.Ticket) }</h5></td>
            </tr>

        </table>
       
       
      </div>
    </div>
  </div>
</div>


      <div  className='d-flex justify-content-center mt-2'>
      <Button variant="danger" className='w-50' onClick={handleSummery} >
         Proceed to Payment
      </Button>
      </div>
    

   
  
        </>

      );

}

export default BookingSummery;