


import Movies from "./Components/Movies";
import MovieDetails from "./Components/MovieDetails";
import SeatBooking from "./Components/SeatBooking/SeatBooking";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "./Root";
import BookingSummery from "./Components/bookingSummery/BookingSummery";
import MovieTicket from "./Components/movieTicket/MovieTicket";
import UserLogin from "./Components/userAccount/UserLogin";
import AdminMovies from "./Components/admin/AdminMovies";
import AdminRootLayout from "./Components/admin/AdminRoot";
import AdminMovieDetails from "./Components/admin/AdminMovieDetails";
import EditMovies from "./Components/admin/EditMovies";
import AddMovies from "./Components/admin/AddMovies";
import Search from "./Components/MobileSearch";
import MobileSearch from "./Components/MobileSearch";
import MobileRoot from "./MobileRoot";



const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children: [

     { path: "/", element: <Movies/> },

      { path : "/movie-details", element: <MovieDetails/>   }
    ]
  },

  {
    path: "/admin",
    element: <AdminRootLayout/>,
    children: [

     
     { path: "/admin", element: <AdminMovies/> },

      { path : "/admin/admin_movie_details", element: <AdminMovieDetails/>   }
    ]
  },

  {
    path: "/mobile-search",
    element: <MobileRoot/>,
    children: [

     
      { path: "/mobile-search", element: <Movies/> }

      
    ]
  },

 

  {
    path : "/edit-movies",
    element: <EditMovies/>
 },

 {
  path : "/add-movies",
  element: <AddMovies/>
},

  {
     path : "/seat-booking",
     element: <SeatBooking/>
  },

  {
    path : "/booking-summery",
    element: <BookingSummery/>
 },

 {
  path : "/movie-ticket",
  element: <MovieTicket />
 },

 {
  path : "/user-login",
  element: <UserLogin />
 }

]);


function App() {
  return (
    <>

<RouterProvider router={router} />
    
    </>
  );
}

export default App;
