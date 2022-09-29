import { Button, Form, Input, Select } from 'antd'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchAddUser, fetchUpdataUser } from '../../utils/action';
const { Option } = Select
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
function UserAddUpdate() {
  const history=useHistory();
  const userLocal = JSON.parse(localStorage.getItem("user"))
  const users = {
    taiKhoan: (userLocal === null) ? "" : userLocal.taiKhoan,
    email: (userLocal === null) ? "" : userLocal.email,
    hoTen: (userLocal === null) ? "" : userLocal.hoTen,
    soDt: (userLocal === null) ? "" : userLocal.soDT,
    matKhau: (userLocal === null) ? "" : userLocal.matKhau,
    maLoaiNguoiDung: (userLocal === null) ? "" : userLocal.maLoaiNguoiDung,
  }
  const renderButton = () => {
    if (!userLocal) {
      return (<Button type="primary" htmlType="submit">
        Submit
      </Button>)
    }
    return (<Button type="primary" htmlType="submit">
      Update
    </Button>)
  }
  const handleSubmit = (values) => {
    // setUsers({...values,maNhom:"GP02"})
    const user = { ...values, maNhom: "GP02" }
    if(!userLocal){
      fetchAddUser(user);
    }else{
      fetchUpdataUser(user);
      localStorage.removeItem("user");
      history.push("/users");
    }
   
  }
  return (
    <>
      <h1>{(userLocal===null)? "Add User" : "Updata User"}</h1>
      <Form {...layout}
        layout="horizontal"
        initialValues={users}
        autoComplete="off"
        name="validate_other"
        onFinish={handleSubmit}
      >
        <Form.Item label="Account" name="taiKhoan"
          rules={[
            {
              required: true,
              message: "Please enter your Account !!!"
            },
            { whitespace: true }
          ]}
          hasFeedback>
          <Input name='taiKhoan' disabled={(userLocal === null) ? false : true}></Input>
        </Form.Item>
        <Form.Item label="Password" name="matKhau"
         rules={[
          {
            required: true,
            message: "Please enter your Password !!!"
          },
          { whitespace: true }
        ]}
        hasFeedback
        >
          <Input></Input>
        </Form.Item>
        <Form.Item label="Email" name="email"
        rules={[
          {
            required: true,
            message: "Please enter your Email !!!",
          },
          {type: 'email',
          message: 'The input is not valid E-mail!',},
          { whitespace: true }
        ]}
        hasFeedback
        >
          <Input></Input>
        </Form.Item>
        <Form.Item label="FullName" name="hoTen"
        rules={[
          {
            required: true,
            message: "Please enter your FullName !!!"
          },
          { whitespace: true }
        ]}
        hasFeedback
        >
          <Input></Input>
        </Form.Item>
        <Form.Item label="Phone" name="soDt"
         rules={[
          {
            required: true,
            message: "Please enter your Phone !!!"
          },
          { whitespace: true }
        ]}
        hasFeedback
        >
          <Input></Input>
        </Form.Item>
        <Form.Item label="User Type" name="maLoaiNguoiDung"
        rules={[
          {
            required: true,
            message: "Please enter your User Type !!!"
          },
          { whitespace: true }
        ]}
        hasFeedback
        >
          <Select placeholder="User Type" 
            allowClear>
            <Option value="quanTri">Quản Trị</Option>
            <Option value="khachHang">Khách Hàng</Option>

          </Select>
        </Form.Item>
        <Form.Item {...tailLayout}>
          {renderButton()}
        </Form.Item>
      </Form>
    </>
  )
}

export default UserAddUpdate