import { EditOutlined, DeleteOutlined, ExportOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import adminSlice from '../../utils/adminSlice';
import Styles from "./style.module.css"

function Movies(props) {
    const history =useHistory();
    const dispatch = useDispatch();
    const [movies,setMovies]=useState([]);
    const gotoEdit=(id,item)=>{
        history.push("/edit/"+id)
        dispatch(adminSlice.actions.setselectedMovies(item));
    }
    const gotoShowTimes=(id,img)=>{
    history.push("/showtime/"+id);
    dispatch(adminSlice.actions.setCinemaImg(img))
   }
    const movieInfo = useSelector((state) => state.booking.movies);
  
    useEffect(()=>{
        setMovies(movieInfo);
    },[movieInfo])
    const columns = [
        {
            title: "Mã phim",
            dataIndex: "maPhim",
            width: "10%",
        },
        {
            title: "Hình ảnh",
            dataIndex: "hinhAnh",
            width: "15%",
            render: (_, item) => {
                return <>
                    <img className={Styles.img} src={item.hinhAnh} alt={item.tenPhim} />
                </>
            }
        },
        {
            title: "Tên Phim ",
            dataIndex: "tenPhim",
            width: "20%",
            filterDropdown: ({setSelectedKeys, selectedKeys, confirm}) => {
                return (<Input
                    autoFocus
                    placeholder='Search Tên Phim'
                    value={selectedKeys[0]}
                    onChange={(e) => {
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                        confirm({closeDropdown:false});
                    }}
                    onPressEnter={() => {
                        confirm();
                    }}
                    onBlur={() => {
                        confirm();
                    }}
                ></Input>)
            },
            filterIcon: () => {
                return <SearchOutlined />
            },
            onFilter: (value, record) => {
                return record.tenPhim.toLowerCase().includes(value.toLowerCase())
            }
        },
        {
            title: "Mô tả",
            dataIndex: "moTa",
            width: "40%"
        },
        {
            title: "Hành động",
            dataIndex: "hanhDong",
            width: "10%",
            render: (_, film) => {
                return (
                    <div className={Styles.icons}>
                        <Button type='text'
                            onClick={()=>gotoEdit(film.maPhim,film)}
                            style={{ color: "blue" }}
                            icon={<EditOutlined />} className={Styles.icon} >
                        </Button>
                        <Button type='text'
                            className={Styles.icon}
                            onClick={()=>props.deteleFilms(film.maPhim)}
                            style={{ color: "red" }}
                            icon={<DeleteOutlined />}>

                        </Button>
                        <Button type='text'
                            className={Styles.icon}
                            onClick={()=>gotoShowTimes(film.maPhim,{hinhAnh:film.hinhAnh,
                            tenPhim:film.tenPhim
                            })}
                            style={{ color: "yellowgreen" }}
                            icon={<ExportOutlined />}>

                        </Button>
                    </div>

                )
            }
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
        <Table dataSource={movies?.map((item) => {
            return { ...item, key: item.maPhim }
        })} columns={columns}></Table>
    )
}

export default Movies;