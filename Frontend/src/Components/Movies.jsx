
import Card from 'react-bootstrap/Card';

//import data from '../data';

import {  useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useEffect, useState } from 'react';


const Movies = () => {

  const [movieData, setMovieData] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL;

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

  const navigate = useNavigate();

  const searchItem = useSelector(state =>  state.search_movies.value) ;
 
  const searchMovies = movieData.filter(item => item.Name.toUpperCase().includes(searchItem.toUpperCase()));

  const  movie = searchMovies ? searchMovies : movieData ;

  
  const notFound = !movie.length ;

 


  const handleMovieDetails = (value) => 
  {

       console.log("Clicked")

      navigate("/movie-details", {state: value })


  }


  
return (

   <> 
    <div className="container">
    <div className="row row-cols-lg-4 row-cols-sm-2 row-cols-2 row-cols-md-3 ">
    { movie.map(item =>
     <div className="col mb-5" key={item._id}>
     <Card as = "Button"  className='card-width' onClick={() => handleMovieDetails(item) } >
      <Card.Img variant="top" className="card-img"  src= {item.Src} />
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



       
      





export default Movies;
