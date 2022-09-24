import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../api/instance";
export const fetchProfileAction = createAsyncThunk("auth/SET-PROFILE", async (args) => {
    if(!localStorage.getItem("token")){
        return; 
    }
    try {
        const res = await instance.request({
            url: "/api/QuanLyNguoiDung/ThongTinTaiKhoan",
            method: "POST",
        });
       return res.data.content
    } catch (error) {
        console.log(error);
    }
})