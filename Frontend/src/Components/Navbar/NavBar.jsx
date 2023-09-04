// import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchItem, setIsLogin, setToken } from '../../state/searchMovies';
import { useState } from 'react';


function NavBar() {


  const [searchValue, setSearchValue] = useState("");


  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isLogin = useSelector(state =>  state.search_movies.isLogin);

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleHome = () => {


    dispatch(searchItem(""));

    setSearchValue("")
  
    navigate("/" );

  }

  const handleSearch = (event) => {

     

      setSearchValue(event.target.value);

      dispatch(searchItem(event.target.value));

  }


  const handleLogout = async() => {

    const url = `${apiUrl}/logout` ;

    try{

      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include'

       });

      const result = await response.json();

      console.log(result)

      if(response.ok)
      {
         dispatch(setIsLogin(false));
         dispatch(setToken(""));
         navigate('/')
      }

    }catch(err) {

      console.log(err);

    }

  }



  return (
    <>
      {['lg'].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3" data-bs-theme="dark" >
          <Container fluid className='justify-content-start'>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}  />
            <Navbar.Brand  className='ms-3' role="button" onClick={handleHome} >movieBooking</Navbar.Brand>

            <SearchIcon className='text-light mt-2 d-lg-none search-icon' onClick = {() => navigate("/mobile-search") } />
            
             <Form className="d-flex w-50 p-3 d-none d-lg-flex">
                  <Form.Control
                    type="search"
                    placeholder= "Search Your Favourite Movies"
                    className="me-2"
                    aria-label="Search"
                    onChange={handleSearch}
                    value={searchValue}
                    
                  />
                  <SearchIcon className='text-light mt-2 ' />
                </Form>
            
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                { isLogin && <Button onClick={handleLogout} variant="danger" >Logout</Button> }
              { !isLogin && <Button onClick={()=> navigate("/user-login") } variant="danger" >Login</Button>  }
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
              
                <Nav className="justify-content-around flex-grow-1 pe-3">
                  {/* <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown> */}
                  {!isLogin && <Button onClick={()=> navigate("/user-login") }  variant="danger" className='d-none d-lg-flex' >Login</Button> }
                 {isLogin && <Button onClick={ handleLogout }  variant="danger" className='d-none d-lg-flex' >Logout</Button>}
                </Nav>
              
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavBar;