import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
//import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from "react-redux";
//import Cookies from 'js-cookie';
import { setIsLogin, setToken } from "../../state/searchMovies";



const EditMovies = () => {


    const location = useLocation();

    const navigate = useNavigate();

    const dispatch = useDispatch();

   const isAdmin = useSelector(state=> state.search_movies.isAdmin);

   const data = location.state ;
   const [movieName, setMovieName] = useState(data.Name);
   const [movieDetails, setMovieDetails] = useState(data.Details);
   const [movieImage, setMovieImage] = useState(data.Src);
   const token  = useSelector(state =>  state.search_movies.token ) ;
   const [ isEdited, setIsEdited ] = useState("");
  
   const apiUrl = process.env.REACT_APP_API_URL;

   const url = `${apiUrl}/movies`;



   useEffect(() => {

    if(!isAdmin){

      navigate('/');
  
   }

  }, [])

   
  
    const handleNameChange = (e) => {
      setMovieName(e.target.value);

      
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

            dispatch(setToken(result.accessToken));

             return result.accessToken ;

        }

        if(!response.ok) {
    
            dispatch(setIsLogin(false));

            navigate('/');
    
         }



   }

  
    const handleSubmit = async(tokenData) => {

      //e.preventDefault();

      
  
      const movieData = {
        _id : data._id, 
        Name : movieName,
        Src: movieImage
      }


     try {

        const response =   await fetch(url, {
  
            method: "PATCH",
            headers : {
              "Authorization" : `Bearer ${tokenData}` ,
              "Content-Type" : "application/json"
            } ,
            credentials: "include",
            body : JSON.stringify(movieData)
    
    
          }  );

        // const response = editMovie(movieData);
    
         
         const result = await response.json();
    
         if(response.ok) {
    
            setIsEdited("Edited movie successfully");

            navigate('/admin');
    
         } 
    
         if(!response.ok) {

            if(response.status === 403 )
            {
               const tokenData = await handleRefreshToken();

               return handleSubmit(tokenData)

            } else {
                
                setIsEdited(result.message);

            } 
             
          }
    
      }
    
      catch(err) {

        console.log(err);
      }

      
    }



    const handleDelete = async(tokenData) => {

       // e.preventDefault();
  
       
    
        const movieData = {
          _id : data._id
        }
  
        try {
  
          const response =   await fetch(url, {
    
              method: "DELETE",
              headers : {
                "Authorization" : `Bearer ${tokenData}` ,
                "Content-Type" : "application/json"
              } ,
              credentials: "include",
              body : JSON.stringify(movieData)
      
      
            }  );
      
           
           const result = await response.json();
      
           if(response.ok) {
      
              setIsEdited("Deleted movie successfully");

              navigate('/admin');
      
           } 
      
           if(!response.ok) {

             if(response.status === 403 )
             {
                const tokenData = await  handleRefreshToken();

                 return handleDelete(tokenData);

             } else  {
      
              setIsEdited(result.message);

             }
      
           }
      
        }
      
        catch(err) {
  
          console.log(err);
        }
  
        
      }


    return (

    

<div className="m-5 ">
       {isEdited && <h1 className="m-5">{isEdited}</h1>}
      <h2 > Edit {data.Name}</h2>
      <form >
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
        <button className="btn btn-primary" onClick={(e) => {e.preventDefault() ; handleSubmit(token)}}>Submit</button>
        <button className="btn btn-danger" onClick={(e) => { e.preventDefault() ; handleDelete(token)}} >Delete</button>
        </div>
      </form>
      
    </div>


    )



}



export default EditMovies ;