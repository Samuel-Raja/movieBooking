import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useLocation } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { useEffect, useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import MovieIcon from '@mui/icons-material/Movie';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { BallTriangle } from  'react-loader-spinner'


const MovieTicket = () => {


const location = useLocation();
 
 const data = location.state ;

 const refData = useRef();

 const [isLoading, setIsLoading] = useState(true);

 useEffect(()=> {

    setTimeout(() => setIsLoading(false), 1000 )

 }, [])

 const handleGeneratePDF = async() => {

     const element = refData.current;
     const pdf = new jsPDF('p', 'mm', 'a4', true);
  const canvas = await html2canvas( element,  { allowTaint: true, useCORS: true });
  const imgData = canvas.toDataURL('image/png');

  // Set the image width and height to fit the PDF page
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  const imgWidth = canvas.width ;
  const imgHeight = canvas.height;
 
   const ratio = Math.min(pdfWidth/imgWidth, pdfHeight/imgHeight );

   const imgX = (pdfWidth - imgWidth * ratio )/2 ;

   const imgY = 0 ;

   pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);

//   pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(`${data.Name}.pdf`);


 }



 return (
     <>

       { isLoading && 
       <div className='d-flex justify-content-center m-5'>
        <BallTriangle
  height={300}
  width={300}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperClass={{}}
  wrapperStyle=""
  visible={true}
/>
 </div> }

 { !isLoading &&   <div>
   <div className='ticket_main_div'  >
  <Card className='ticket-card d-flex' ref={refData} >
   
    <Card.Img variant="top" className='ticket-img-height'  src={data.Src} />
    <Card.Body>
      <Card.Title className=' d-flex  justify-content-center'><h3>{data.Name}</h3></Card.Title>
      
      <Table >
     <tbody>
      <tr>
        <td>Date:</td>
        <td>Sat, 10 Sep, 2023</td>
        <td>Time:</td>
        <td>02:00 PM</td>
      </tr>
    </tbody>
    </Table>

    <Table >
     <tbody>
      <tr>
        <td>Venue</td>
        <td>CC2-INOX, Kolkata </td>
        <td>Seat</td>
        <td>{data.Ticket}</td>
      </tr>
    </tbody>
    </Table>
    
     
      <div className='d-flex justify-content-center outter-qr'>
      
      <QrCode2Icon style={{width: "100px" , height : "100px" }} />
     
      </div>
     
    </Card.Body>
    
  </Card>
  
  </div>

  <div className='d-flex  justify-content-center'>
      <Button onClick={handleGeneratePDF}  variant="primary">Download Ticket</Button>
      </div>

  </div> }
  </>

  );


}


export default MovieTicket ;