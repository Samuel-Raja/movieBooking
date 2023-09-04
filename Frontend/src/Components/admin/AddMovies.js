import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from "react-redux";
import { setIsLogin, setToken } from "../../state/searchMovies";




const AddMovies = () => {


  const apiUrl = process.env.REACT_APP_API_URL;
   
  const navigate = useNavigate();

  const isAdmin = useSelector(state=> state.search_movies.isAdmin);

  const token  = useSelector(state =>  state.search_movies.token ) ;

 

  const dispatch = useDispatch()

  useEffect(() => {

    if(!isAdmin){

      navigate('/');
  
   }

  }, [])

 
    


    const [movieName, setMovieName] = useState("");
    const [movieDetails, setMovieDetails] = useState("");
    const [movieImage, setMovieImage] = useState("");
    const [isPosted , setIsPosted] = useState("");
    const [isError, setIsError] = useState(false);

    const [ yourtoken, setYourToken] = useState(token)
    
   
  
    const handleNameChange = (e) => {
      setMovieName(e.target.value);
       // console.log(token)
    };
  
    const handleDetailsChange = (e) => {
      setMovieDetails(e.target.value);

    };
  
    const handleImageChange = (e) => {
      // Assuming you want to store the selected image file
      setMovieImage(e.target.value);
    };



    const handleRefreshToken = async() => {

      const response = await fetch(`${apiUrl}/refresh`, {

         method : 'GET',
         credentials: "include",


      } );

     const result = await response.json()

      
      if(response.ok) {

         dispatch(setToken(result.accessToken))


          return result.accessToken ; 

      }

      if(!response.ok) {
  
         dispatch(setIsLogin(false));

         navigate('/');
  
       }



 }



  
    const handleSubmit = async(returnToken) => {
    

      const url = `${apiUrl}/movies`;

      const data = {
        Name: movieName,
        Src: movieImage
      } ;

      try{

    const response =   await fetch(url, {
  
        method: "POST",
        headers : {
          "Authorization" : `Bearer ${returnToken}` ,
          "Content-Type" : "application/json"
        } ,
        credentials: "include",
        body : JSON.stringify(data)


      }  );

     
      const result = await response.json();

     if(response.ok) {

       setIsPosted("Added movie successfully");

       navigate('/admin');

     } 

     if(!response.ok) {


      if(response.status === 403) {

         const data =  await handleRefreshToken();

          return handleSubmit(data); 
      }
       
      else {

        setIsPosted(result.message);

      }

       



      //console.log(result)

    } 

    } catch(error) {


        console.log(error);
        setIsError(true)

    }


    };


    return (

      <>

   {isError  && <div>Error Occoured</div> }

  { !isError && <div className="m-5 ">
    {isPosted && <h1 className="m-5">{isPosted}</h1>}
      <h2 >Add a new movie</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(token)}}>
        <label className="form-label" htmlFor="movieName">Movie Name:</label>
        <input
          type="text"
          id="movieName"
          name="movieName"
          className="form-control"
          value={movieName}
          onChange={handleNameChange}
          required
        /><br /><br />


        {/* <label className="form-label" htmlFor="movieDetails">Movie Details:</label><br />
        <textarea
          id="movieDetails"
          name="movieDetails"
          className="form-control"
          value={movieDetails}
          onChange={handleDetailsChange}
          rows="4"
          
          required
        ></textarea><br /><br /> */}

   <label className="form-label" htmlFor="movieImage">Movie Image Link:</label>
        <input
          type="text"
          id="movieImage"
          name="movieImage"
          className="form-control"
          value={movieImage}
          onChange={handleImageChange}
          required
        /><br /><br />

        <div className="d-flex justify-content-evenly">
        <button className="btn btn-primary" type="submit">Add</button>
       
        </div>
      </form>
      
    </div> }
    </>

    )



}



export default AddMovies ;