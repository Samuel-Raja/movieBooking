
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
//import data from '../data';

import {  useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useEffect, useState } from 'react';


const AdminMovies = () => {

  const [movieData, setMovieData] = useState([]);

  const navigate = useNavigate();

   const isAdmin = useSelector(state=> state.search_movies.isAdmin);

   const apiUrl = process.env.REACT_APP_API_URL;

   if(!isAdmin){

      navigate('/');
  
   }

  useEffect(() => {

    const fetchMovies = async() => {

      try{

        const response = await fetch(`${apiUrl}/movies`);

        const jsonData = await response.json() ;

        setMovieData(jsonData);



      } catch(error) {

        console.error('Error fetching data:', error);

      }


    }

    fetchMovies();


  }, [] )

  

  const searchItem = useSelector(state =>  state.search_movies.value) ;
 
  const searchMovies = movieData.filter(item => item.Name.toUpperCase().includes(searchItem.toUpperCase()));

  const  movie = searchMovies ? searchMovies : movieData ;

  
  const notFound = !movie.length ;

 


  const handleMovieDetails = (value) => 
  {

       console.log("Details")

      navigate("/admin/admin_movie_details", {state: value })


  }

 
  const handleEdit = (data) => {

     console.log("Edit");

      navigate("/edit-movies", {state: data} )

  }


  
return (

   <> 
    <div className="container">
    <div className="row row-cols-lg-4 row-cols-sm-2 row-cols-2 row-cols-md-3 ">
    { movie.map(item =>
     <div className="col mb-5 position-relative " key={item._id}>
     <Card  as = "Button"  className='card-width' onClick={() => handleMovieDetails(item) } >
      <Card.Img variant="top" className="card-img"  src= {item.Src} />
      <div className='d-flex justify-content-around position-absolute top-50 start-50 '>
      <Button variant="warning"   onClick={(e) =>{ e.stopPropagation(); handleEdit(item)}} >
       <EditIcon className='text-danger'/>
      </Button>
      </div>
       </Card>
    
     
    
      
      <Card.Title className='m-auto'>{item.Name}</Card.Title>
     
      
      
      
    </div>
    ) }
    </div>
    
    </div>
   
    {notFound && <h1 className='d-flex justify-content-center mt-5'>Could not find {searchItem}</h1> }

   </>
  );


}



       
      





export default AdminMovies;
