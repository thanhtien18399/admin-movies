import { render } from '@testing-library/react'
import { Button, Input, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Styles from "./style.module.css"
import { EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons"
import { useHistory } from 'react-router-dom'
import { fetchDeteleUser, fetchUserAction } from '../../utils/action'
function ManagementUser() {
    const history = useHistory();
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.booking.user);
    const fetch = async () => {
        await dispatch(fetchUserAction());
    }
    const gotoEdit = (user) => {
        localStorage.setItem("user", JSON.stringify(user));
        history.push("/user/editUser");
    }
    useEffect(() => {
        fetch();
    }, [])
    const deteleUser = async (tk) => {
        await fetchDeteleUser(tk);
        fetch();
    }
    const columns = [
        {
            title: "STT",
            dataIndex: "key",
            width: "5%"
        },
        {
            title: "Tài Khoản",
            dataIndex: "taiKhoan",
            width: "15%",
            filterDropdown: ({setSelectedKeys, selectedKeys, confirm}) => {
                return (<Input
                    autoFocus
                    placeholder='Search Tài Khoản'
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
                return record.taiKhoan.toLowerCase().includes(value.toLowerCase())
            }

        },
        {
            title: "Mật Khẩu ",
            dataIndex: "matKhau",
            width: "15%"
        },
        {
            title: "Họ Ten",
            dataIndex: "hoTen",
            width: "15%",
            filterDropdown: ({setSelectedKeys, selectedKeys, confirm}) => {
                return (<Input
                    autoFocus
                    placeholder='Search Tài Khoản'
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
                return record.hoTen.toLowerCase().includes(value.toLowerCase())
            }
        },
        {
            title: "Email",
            dataIndex: "email",
            width: "15%",

        },
        {
            title: "Số Điện Thoại",
            dataIndex: "soDT",
            width: "15%"
        },
        {
            title: "Action",
            dataIndex: "action",
            width: "15%",
            render: (_, user) => {
                return (
                    <div className={Styles.icons}>
                        <Button type='text'
                            onClick={() => gotoEdit(user)}
                            style={{ color: "blue" }}
                            icon={<EditOutlined />} className={Styles.icon} >
                        </Button>
                        <Button type='text'
                            className={Styles.icon}
                            onClick={() => deteleUser(user.taiKhoan)}
                            style={{ color: "red" }}
                            icon={<DeleteOutlined />}>

                        </Button>
                    </div>
                )
            }
        }
    ]
    const data = (arr) => {
        let users = [];
        arr.forEach((user, index, array) => {
            users.push({ ...user, key: index });
        });
        return users
    }
    const gotoAddUser = () => {
        history.push("/user/addUser")
    }
    return (
        <>
            <Button type='primary' style={{ marginBottom: "10px" }} onClick={gotoAddUser}>Add New User</Button>
            <Table dataSource={data(userInfo)}
                columns={columns}></Table>
        </>

    )
}

export default ManagementUser