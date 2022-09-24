import { Table } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux';

function Movies() {
    const movieInfo = useSelector((state) => state.booking.movies);
    const columns = [
        {
            title: "Mã phim",
            dataIndex: "maPhim",
            width:"10%"
        },
        {
            title: "Hình ảnh",
            dataIndex: "hinhAnh",
            width:"20%",
            render:(_,item)=>{
                return <>
                    <img width="70%" height="150px" src={item.hinhAnh} alt={item.tenPhim} />
                </>
            }
        },
        {
            title: "Tên Phim ",
            dataIndex: "tenPhim",
            width:"20%"
        },
        {
            title: "Mô tả",
            dataIndex: "moTa",
            width:"40%"
        },
        {
            title: "Hành động",
            dataIndex: "hanhDong",
            width:"10%"
        },
        // {
        //     title: "",
        //     key: "action",
        //     render:(_, user) => {
        //         return (
        //             <>
        //                 <Button onClick={()=>props.getUpdateUser(user)} type="primary">chỉnh sửa</Button>
        //                 <Button onClick={()=>props.deleteUser(user.id)}>Xóa</Button>
        //             </>

        //         )
        //     }
        // }
    ]
  return (
    <Table dataSource={movieInfo?.map((item)=>{
        return {...item,key:item.maPhim}
    })} columns={columns}></Table>
  )
}

export default Movies;