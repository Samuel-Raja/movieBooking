
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchItem } from '../state/searchMovies';


const MobileSearch = () => {


  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();

  const handleSearch = (event) => {

     

    setSearchValue(event.target.value);

    dispatch(searchItem(event.target.value));

}


    return (

        <div className='pt-0'>
        <Navbar  className="bg-body-tertiary mb-3 " data-bs-theme="dark" >
        <Container fluid className='justify-content-start'>
        <Navbar.Toggle   />
        

          {/* <SearchIcon className='text-light mt-2 d-lg-none search-icon' /> */}
          
           <Form className="d-flex w-100  p-3 d-flex">
                <Form.Control
                  type="search"
                  placeholder= "Search Your Favourite Movies"
                  className="me-2"
                  aria-label="Search"
                   onChange={handleSearch}
                   value={searchValue}
                  
                />
                {/* <SearchIcon className='text-light mt-2 ' /> */}
              </Form>

              </Container>

              </Navbar>
              </div>



    )


}


export default MobileSearch;
