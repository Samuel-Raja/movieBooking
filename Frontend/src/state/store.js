import { configureStore } from "@reduxjs/toolkit";

import searchMoviesReducer from './searchMovies' ;

export default configureStore({
    reducer : {

        search_movies : searchMoviesReducer 

    }
})