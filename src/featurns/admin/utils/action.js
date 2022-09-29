
import { createAsyncThunk } from "@reduxjs/toolkit"
import instance from "../../../api/instance";

export const fetchMoviesAction = createAsyncThunk("admin/fetchMovies", async (args) => {
    try {
        const res = await instance.request({
            url: "/api/QuanLyPhim/LayDanhSachPhim",
            method: "GET",
            params: {
                maNhom: "GP02",
            },
        })
        console.log("data", res.data.content);
        return res.data.content
    } catch (error) {

    }

})
export const fetchAddNewAction = async (f) => {
    try {
        const res = await instance.request({
            url: "/api/QuanLyPhim/ThemPhimUploadHinh",
            method: "POST",
            data: f,
        })
        alert("Add New successful movies")
    } catch (error) {
        console.log(error);
        alert("Add New failed movies")
    }
}
export const fetchUpdateAction = async (f) => {
    try {
        const res = await instance.request({
            url: "/api/QuanLyPhim/CapNhatPhimUpload",
            method: "POST",
            data: f,
        })
        alert("Update successful");
    } catch (error) {
        console.log(error);
        alert("update failed");
    }
}
export const fetchDeleteAction = async (id) => {
    try {
        const res = await instance.request({
            url: "/api/QuanLyPhim/XoaPhim",
            method: "DELETE",
            params: {
                MaPhim: id,
            }
        })
        alert("Delete successful");
    } catch (error) {
        console.log(error);
        alert("Delete failed");
    }
}
// export const fetchEditAction =  createAsyncThunk("admin/fetchEdit", async (id) => {
//     try {
//         const res= await  instance.request({
//             url:"/api/QuanLyPhim/LayThongTinPhim",
//             method:"GET",
//             params:{
//                 maPhim:id
//             }
//         })
//         return res.data.content
//     } catch (error) {
//         console.log(error);
//     }
// })
export const fetchCinemaSystem = createAsyncThunk("admin/CinemSystem", async (args) => {
    try {
        const res = await instance.request({
            url: "/api/QuanLyRap/LayThongTinHeThongRap",
            method: "GET",

        })
        return res.data.content
    } catch (error) {

    }

})
export const fetchCinemaCom = createAsyncThunk("admin/CinemCom", async (id) => {
    try {
        const res = await instance.request({
            url: "/api/QuanLyRap/LayThongTinCumRapTheoHeThong",
            method: "GET",
            params: {
                maHeThongRap: id
            }

        })
        return res.data.content
    } catch (error) {

    }

})
export const fetchAddShowTime = async (lich) => {
    try {
        const res = await instance.request({
            url: "/api/QuanLyDatVe/TaoLichChieu",
            method: "POST",
            data: lich
        })

        alert("Add ShowTime successful");
    } catch (error) {
        console.log(error);
        alert("Add ShowTime failed");
    }
}

///User
export const fetchUserAction = createAsyncThunk("admin/UserAction", async (id) => {
    try {
        const res = await instance.request({
            url: "/api/QuanLyNguoiDung/LayDanhSachNguoiDung",
            method: "GET",
            params: {
                MaNhom: "GP02",
            }

        })
        return res.data.content
    } catch (error) {

    }

})

export const fetchAddUser = async (user) => {
    try {
        const res = await instance.request({
            url: "/api/QuanLyNguoiDung/ThemNguoiDung",
            method: "POST",
            data: user,
        })
        alert("Add User successful");
    } catch (error) {
        console.log(error);
        alert(`Add User failed ${error.response.data.content}`);
    }
}
export const fetchUpdataUser = async (user) => {
    try {
        const res = await instance.request({
            url: "/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
            method: "POST",
            data: user,
        })
        alert("Updata User successful");
    } catch (error) {
        console.log(error);
        alert(`Updata User failed ${error.response.data.content}`);
    }
}
export const fetchDeteleUser = async (tk) => {
    try {
        const res = await instance.request({
            url: "/api/QuanLyNguoiDung/XoaNguoiDung",
            method: "DELETE",
            params:{
                TaiKhoan:tk,
            }
        })
        alert("Delete User successful");
    } catch (error) {
        console.log(error);
        alert(`Delete User failed ${error.response.data.content}`);
    }
}