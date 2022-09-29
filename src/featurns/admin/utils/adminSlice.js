import { createSlice } from "@reduxjs/toolkit";
import { fetchCinemaSystem, fetchMoviesAction, fetchUserAction } from "./action";
// import { fetchMoviesAction } from "./action";

const initialState = { movies: [],selectedMovies:null,cinemaSystem:null ,cinemaImg:null,user:[]}

const adminSlice = createSlice({
    name: "movies",
    initialState: initialState,
    reducers: {
        setMovies(state, action) {
            state.movies = action.payload;
        },
        setselectedMovies(state,action){
            state.selectedMovies = action.payload;
        },
        setCinemaSystem(state,action){
            state.cinemaSystem = action.payload;
        },
        setCinemaImg(state,action){
            state.cinemaImg = action.payload;
        },
        setUser(state,action){
            state.user = action.payload;
        }
    },
    extraReducers:{
    [fetchMoviesAction.fulfilled]:(state,action)=>{
        state.movies=action.payload
    },
    [fetchCinemaSystem.fulfilled]:(state,action)=>{
        state.cinemaSystem=action.payload
    },
    [fetchUserAction.fulfilled]:(state,action)=>{
        state.user=action.payload
    },
   
    }
    
})

export default adminSlice;