import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

import  './userLogin.css'
import { useDispatch } from 'react-redux';
import { setIsAdmin, setIsLogin, setToken } from '../../state/searchMovies';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const  UserLogin = () =>  {


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [signUp , setSignUp] = useState(false);
  const[ isEmailValid, setIsEmailValid ] = useState(true);
  const[isPasswordValid, setIsPasswordValid] = useState(true);
  const [signUpSuccess, setSignUpSuccess] = useState('');
  const [signUpFailure, setSignUpFaliure] = useState('');
  
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;
   
   
  const handleSubmit = async (e) =>{

    e.preventDefault();

    setSignUpFaliure('');
    setSignUpSuccess('');

    if(signUp){

        try {
            const response = await fetch(`${apiUrl}/sign-up`, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                "UserName" : username,
                "Password":  password
            }),

            });

            const result = await response.json();

            if (response.ok) {
                
                setSignUpSuccess("Registerd Successfully! Please Login to continue");

              }

              if (!response.ok) {
                
                setSignUpFaliure(result.error);

              }
        
            

          } catch (error) {

            console.error("Error:", error);
          }

   }

   else {


        try {

          const response = await fetch(`${apiUrl}/login`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "UserName" : username,
              "Password":  password
          }),

          });

          const result = await response.json();
          // const cookies = response.Cookies.get('jwt');

          if (response.ok) {

             
            dispatch(setIsLogin(true));

            dispatch(setToken(result.accessToken))
              
            setSignUpSuccess("Logged in Successfully");

            if(result.Role === "Admin"){

                dispatch(setIsAdmin(true));

                navigate('/admin');


              } else {

                navigate(-1)

              }

            }

            if (!response.ok) {
              
              setSignUpFaliure(result.error);

            }
       
         




      } catch(err) {

        setSignUpFaliure(err);

      }


   }
        
        

 }

  



  const handleEmail = (event) => {
  
    

    setUsername(event.target.value);

    const testEmail =   /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;

    if(testEmail.test(event.target.value)){

        //setIsEmailValid(false)
        // setUsername(event.target.value);
        setIsEmailValid(true);
        
        console.log("email");
    }
    else
    {
        setIsEmailValid(false);
    }


  }



 const verifyPassword = (event) => {


     setPassword(event.target.value);

    const regXpass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i ;

    if(regXpass.test(event.target.value)){

       setIsPasswordValid(true); 

       
     

    }

    else{

        setIsPasswordValid(false);
    }


     

 }

 const submitDisable = () => {

  const testEmail =   /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;
  const regXpass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i ;

  if(testEmail.test(username) && regXpass.test(password) ) {

      if(signUp) {
        
        return (!(password === confirmPassword) )

      }

      return false;

  }

     
  else return true;;    

 }




  const handleLogin = () => {
    // Implement your login logic here
    console.log('Logging in with:', username, password);
  };

  return (
    <>
     <Navbar  className="bg-body-tertiary mb-3" data-bs-theme="dark" >
      <Container fluid className='justify-content-start'>
      <Navbar.Brand  className='ms-3' role="button" onClick={() => navigate('/') } >movieBooking</Navbar.Brand>
       </Container>
       </Navbar>
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header bg-primary text-white d-flex justify-content-center">
            <h4>{signUp? "Sign Up" : "Login" }</h4>
          </div>
          { signUpFailure  && <p className="text-center mt-3 fs-6 fw-light text-danger">{signUpFailure}</p>  }
          
          { signUpSuccess && <p className="text-center mt-3 fs-6 fw-light text-success">{signUpSuccess}</p> }
          
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className= {`form-group ${isEmailValid && 'was-validated'} `}>
                <input
                  type="email"
                  className="form-control mt-3 mb-3"
                  id="username"
                  placeholder='Email address'
                  value={username}
                  onChange={handleEmail}
                 
                  required
                />
              </div>
              { !isEmailValid &&  <p className="text-start fs-6 fw-light text-danger">Please enter correct email address</p> }

              <div className={`form-group ${ isPasswordValid && 'was-validated'} `}>
                {/* <label htmlFor="password">Password</label> */}
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder='Password'
                  value={password}
                  onChange={verifyPassword}
                  required
                />
              </div>
              { !isPasswordValid &&  <p className="text-start fs-6 fw-light text-danger text-wrap"> Password must contains minimum eight characters, at least one number,uppercase,lowercase and one special letter</p> }
             { signUp && <div className= "form-group mt-3 mb-3 " >
               
              <div  className= {`${(password === confirmPassword) ? 'was-validated' : 'is-invalid'}`} >
                <input
                  type="password"
                  className= "form-control" 
                 id="validationCustom01"
                placeholder='Confirm Password'
               onChange={(e) => setconfirmPassword(e.target.value)}
                required
                />
               { (confirmPassword === password) && <div className="valid-feedback">
                  Password Matched!
                 </div> 
                }

                
              </div>
              <div className="invalid-feedback">
                  Please enter a correct password.
                 </div>
              </div> 
              
               }
              <div className='d-flex justify-content-center mt-3 mb-3'>
              <button
                type="submit"
                className="btn btn-primary btn-block"
                // onClick={handleLogin}
                 disabled = {submitDisable()}
               >
                {signUp? "Sign Up" : "Login"}
              </button>
              </div>
            </form>
            <div mt-3>
               {signUp? "Already have an account?" : "Don't have an account ?" } 
                 <Button variant="outline-secondary" 
                 
                 size="sm" className='m-1'
                  onClick={()=> setSignUp(prev => !prev ) }>
                  {signUp? "Login" : "Sign Up" }
                  </Button>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </>
  );
}

export default UserLogin;
