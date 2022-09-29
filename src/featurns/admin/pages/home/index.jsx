import { Pagination } from 'antd';
import React, { lazy, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { fetchCinemaSystem, fetchDeleteAction, fetchMoviesAction } from '../../utils/action';
import adminSlice from '../../utils/adminSlice';
import Movies from '../moviesManager';

// import Movies from "../moviesManager"



function Home() {
    const dispatch = useDispatch();
    const fetchMovies = () => {
        dispatch(adminSlice.actions.setMovies([]))
    }
    const deteleFilms=async(id)=>{
        await fetchDeleteAction(id);
        dispatch(fetchMoviesAction());

        fetchMovies();
    }
    useEffect(() => {
        dispatch(fetchMoviesAction());
        dispatch(fetchCinemaSystem());
        fetchMovies();
    },)
    
    return (
        <>
            <Movies 
            deteleFilms={deteleFilms}
            />
        </>

    )
}

export default Home