import { createSlice } from "@reduxjs/toolkit";
import { fetchProfileAction } from "./action";
const initialState = {
    profile: null,
}
const profileSlice = createSlice( {
    name: "profile",
    initialState: initialState,
    reducers: {
        setProfile(state, action) {
            state.profile= action.payload;
        },
    },
    extraReducers:{
    [fetchProfileAction.fulfilled]:(state,action)=>{
        state.profile=action.payload
    }
    }
    
})
export default profileSlice;