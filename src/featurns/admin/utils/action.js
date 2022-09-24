
import { createAsyncThunk } from "@reduxjs/toolkit"
import instance from "../../../api/instance";

export const fetchMoviesAction = createAsyncThunk("admin/fetchMovies", async (args) => {
    try {
        const res = await instance.request({
            url:"/api/QuanLyPhim/LayDanhSachPhim",
            method: "GET",
            params: {
                maNhom: "GP02",
              },
        })
        console.log("data",res.data.content);
        return res.data.content
    } catch (error) {

    }

})
export const fetchAddNewAction = async(data)=> {
    try {
        const res= await  instance.request({
            url:"/api/QuanLyPhim/ThemPhimUploadHinh",
            method:"POST",
            frm:data,
        })
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}