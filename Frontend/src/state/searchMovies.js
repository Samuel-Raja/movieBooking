import { createSlice } from "@reduxjs/toolkit";

const searchMovies = createSlice({

    name: 'search_movies',
    initialState: { value : "" , token: "", isLogin: false, isAdmin: false },
    reducers: {

        searchItem : (state, action) => {

            state.value = action.payload;

        } ,

        setToken : (state, action) => {

            state.token = action.payload ; 
        },

        setIsLogin : (state, action) => {

            state.isLogin = action.payload ; 
        },

        setIsAdmin : (state, action) => {

            state.isAdmin = action.payload ; 
        }

    }



});


export const {searchItem, setToken, setIsLogin, setIsAdmin} = searchMovies.actions;

export default searchMovies.reducer ;