import { createSlice } from "@reduxjs/toolkit";
import { fetchMoviesAction } from "./action";
// import { fetchMoviesAction } from "./action";

const initialState = { movies: [] }

const adminSlice = createSlice({
    name: "movies",
    initialState: initialState,
    reducers: {
        setMovies(state, action) {
            state.movies = action.payload;
        },
    },
    extraReducers:{
    [fetchMoviesAction.fulfilled]:(state,action)=>{
        state.movies=action.payload
    }
    }
    
})

export default adminSlice;