import { Button, DatePicker, Form, Input, Select } from 'antd'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { fetchAddShowTime, fetchCinemaCom } from '../../utils/action';
import Styles from "./style.module.css"
const { Option } = Select;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 10,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

function ShowTimes() {
    const dispatch = useDispatch();
    const match = useRouteMatch();
    const movieId = match.params.id;
    const cinemaSysInfo = useSelector((state) => state.booking.cinemaSystem);
    const cinemaImgInfo = useSelector((state) => state.booking.cinemaImg);
    let today = new Date();
    let curDate = today.getHours() + ':' + today.getUTCMinutes() + ':' + today.getSeconds();
    // const cinemaComInfo = useSelector((state) => state.booking.cinemaCom);
    // xử lý hàm 
    // const [cinemaSys,setCinemaSys]=useState([]);
    const [cinemaCom, setCinemaCom] = useState([]);
    const [showT, setShowT] = useState({
        maPhim: movieId,
        ngayChieuGioChieu: "",
        maRap: "",
        giaVe: 0
    })

    const renderCinemaSys = () => {
        const res = cinemaSysInfo?.map((item) => {
            return (<Option key={item.maHeThongRap} value={item.maHeThongRap}>{item.tenHeThongRap}</Option>)
        })
        return res;
    }

    const handleChangeCinemaCom = async (id) => {
        const res = await dispatch(fetchCinemaCom(id))
        const cinemaComInfo = res.payload;
        setCinemaCom(cinemaComInfo);

    }
    const renderCinemaCom = () => {
        const res = cinemaCom?.map((item) => {
            return (<Option key={item.maCumRap} value={item.maCumRap}>{item.tenCumRap}</Option>)
        })
        return res;
    }
    const handleChange=(e)=>{
        setShowT({...showT,[e.target.name]:e.target.value})
    }
    const handleChangeSelect=(value)=>{
        setShowT({...showT,maRap:value})
    }
    const handleChangeDate = (date, dateString) => {
        setShowT({ ...showT, ngayChieuGioChieu: dateString+" "+curDate })
      };
    const handleSubmit = () => {
        fetchAddShowTime(showT);
        console.log("showt",showT);
    }
    return (
        <div>
            <h1>Create Showtimes :{cinemaImgInfo.tenPhim}</h1>
            <div className={Styles.dis}>
                <div className={Styles.img}><img src={cinemaImgInfo.hinhAnh} alt="#" /></div>
                <div className={Styles.form}>
                    <Form {...layout} name="control-ref" onFinish={handleSubmit} autoComplete="off">
                        <Form.Item
                            label="cinema system"
                            name="heThongRap"
                            rules={[
                                {
                                  required: true,
                                  message: "Please enter your cinema system!!!"
                                },
                                { whitespace: true }
                              ]}
                              hasFeedback
                        >
                            <Select
                                placeholder="Select a option and change input text above"
                                allowClear
                                onChange={handleChangeCinemaCom}
                            >
                                {renderCinemaSys()}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="cinema complex"
                            name="maRap"
                            rules={[
                                {
                                  required: true,
                                  message: "Please enter your cinema complex!!!"
                                },
                                { whitespace: true }
                              ]}
                              hasFeedback
                        >
                            <Select
                                placeholder="Select a option and change input text above"
                                allowClear
                                onChange={handleChangeSelect}
                            >
                                {renderCinemaCom()}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="show date show time"
                            name="ngayChieuGioChieu"
                            rules={[
                                {
                                  required: true,
                                  message: "Please enter your cinema Show Date Show Time!!!"
                                },
                                
                              ]}
                              hasFeedback
                        >
                            <DatePicker format="DD/MM/YYYY" onChange={handleChangeDate}></DatePicker>
                        </Form.Item>
                        <Form.Item
                            label="fare"
                            name="giaVe"
                            rules={[
                                {
                                  required: true,
                                  message: "Please enter your Fare!!!"
                                },
                                { whitespace: true }
                              ]}
                              hasFeedback
                        >
                            <Input type="number" onChange={handleChange}  name="giaVe"></Input>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>

                </div>
            </div>
        </div>
    )
}

export default ShowTimes