import { Pagination } from 'antd';
import React, { lazy, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { fetchMoviesAction } from '../../utils/action';
import adminSlice from '../../utils/adminSlice';
import Movies from '../moviesManager';

// import Movies from "../moviesManager"



function Home() {
    const dispatch = useDispatch();
    const fetchMovies = ()  => {
        dispatch(adminSlice.actions.setMovies([]))
    }

    useEffect(() => {
        dispatch(fetchMoviesAction());
        fetchMovies();
    }, [])
  
    return (
        <>
            <Movies />
        </>

    )
}

export default Home