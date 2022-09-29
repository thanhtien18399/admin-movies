
import React, { useEffect, useState } from 'react'
import { InboxOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Radio,
  Switch,
  Upload,
} from 'antd';
import { fetchAddNewAction, fetchUpdateAction } from '../../utils/action';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import adminSlice from '../../utils/adminSlice';
import moment from 'moment';
import { type } from '@testing-library/user-event/dist/type';
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};


function CreateMovie() {
  let today = new Date();
  let curDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const match = useRouteMatch();
  const movieId = match.params.id;
  const dispatch = useDispatch();
  const selectInfo = useSelector((state) => state.booking.selectedMovies);
  const [user, setUser] = useState({
    tenPhim: "",
    trailer: "",
    moTa: "",
    maNhom: "GP02",
    ngayKhoiChieu: "",
    sapChieu: false,
    dangChieu: false,
    hot: false,
    danhGia: 0,
    hinhAnh: {}

  })
  const Img = [];
  if(movieId){
    Img.push({
      uid: "abc",
      name: selectInfo?.hinhAnh,
      status: "success",
      url: selectInfo?.hinhAnh,
    })
  }
console.log("img",Img);
  const [componentSize, setComponentSize] = useState('default');
  // const fetchEdit = async() => {
  //   //1. lên url=>mã phim
  //   //2. viết async action fetchMovieDetail
  //   //3. dispatch async action 
  //   //4. lên strore, tạo thêm 1 dữ liệu mới ,xử lý action 
  //   //5. show ra màn hình 

  //   dispatch(adminSlice.actions.setselectedMovies("aaa"));
  // }
  useEffect(() => {
    if (movieId === `${selectInfo?.maPhim}`) {
      setUser(selectInfo)
    }
  }, [selectInfo])

  ///handleChange
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
    console.log(e.target.value);
  };
  const handleChangeChecked = (checked, e) => {
    setUser({ ...user, [e.target.name]: checked })
  };
  const onChange = (date, dateString) => {
    setUser({ ...user, ngayKhoiChieu: dateString })

  };
  // xử lý hàm 
  const renderButton = () => {
    if (!movieId) {
      return (
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      )

    } else {
      return (
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      )
    }

  }


  const handleFile = (e) => {
    setUser({ ...user, hinhAnh: e.fileList[0]?.originFileObj })
    // setUser({...user,hinhAnh:e.target.files[0]})
  }
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const handleSubmit = () => {
    console.log("dataFilm", user);
    let form_data = new FormData();
    // for (var key in user) {
    //   if ("hinhAnh" === key) {
    //     if (user.hinhAnh.includes("https")) {
    //       form_data.append("hinhAnh", user.hinhAnh);
    //       console.log("2");
    //     } else {
    //       form_data.append(key, user.hinhAnh, user.hinhAnh.name);
    //     }
    //   } else {
    //     form_data.append(key, user[key]);
    //   }
    //   console.log(key, form_data.get(key));
    // }
    if (!movieId) {
      for (var key in user) {
        if ("hinhAnh" === key) {
          form_data.append(key, user.hinhAnh, user.hinhAnh.name);
        } else {
          form_data.append(key, user[key]);
        }
        console.log(key, form_data.get(key));
      }
      fetchAddNewAction(form_data)
    } else {
      for (var key in user) {
        if ("biDanh" === key || "key" === key) {
          continue;
        }
        if ("hinhAnh" === key) {
          form_data.append(key, user.hinhAnh, user.hinhAnh.name);
        } else {
          form_data.append(key, user[key]);
        }
        console.log(key, form_data.get(key));
      }
      fetchUpdateAction(form_data)
      console.log("update");
    }
  }
  const onFinish = () => {
    console.log("user", user);
  }

  return (
    <Form
      {...layout}
      layout="horizontal"
      initialValues={{
        size: componentSize,
        tenPhim: `${(selectInfo === null) ? "" : selectInfo?.tenPhim}`,
        trailer: `${(selectInfo === null) ? "" : selectInfo?.trailer}`,
        moTa: `${(selectInfo === null) ? "" : selectInfo?.moTa}`,
        ngayKhoiChieu: moment(`${(selectInfo === null) ? curDate : selectInfo?.ngayKhoiChieu}`, `YYYY/MM/DD`),
        sapChieu: (selectInfo === null) ? "" : selectInfo?.sapChieu,
        dangChieu: (selectInfo === null) ? "" : selectInfo?.dangChieu,
        hot: (selectInfo === null) ? "" : selectInfo?.hot,
        danhGia: (selectInfo === null) ? "" : selectInfo?.danhGia,

      }}
      onFinish={handleSubmit}
      autoComplete="off"
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      name="validate_other"
    >
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Movie name:"
        name="tenPhim"
        rules={[
          {
            required: true,
            message: "Please enter your Movie name!!!"
          },
          { whitespace: true }
        ]}
        hasFeedback
      >
        <Input name='tenPhim'
          onChange={handleChange} />
      </Form.Item>
      <Form.Item label="Trailer:"
        name='trailer'
        rules={[
          {
            required: true,
            message: "Please enter your Trailer!!!"
          },
          { whitespace: true }
        ]}
        hasFeedback
      >
        <Input onChange={handleChange} name="trailer" />
      </Form.Item>
      <Form.Item label="Describe:"
        name='moTa'
        rules={[
          {
            required: true,
            message: "Please enter your Describe!!!"
          },
          { whitespace: true }
        ]}
        hasFeedback
      >
        <Input onChange={handleChange} name="moTa" />
      </Form.Item>
      <Form.Item label="Premiere date:"
        name="ngayKhoiChieu"
        rules={[
          {
            required: true,
            message: "Please enter your Date!!!"
          },
        ]}

        hasFeedback
      >
        <DatePicker format="DD/MM/YYYY" onChange={onChange} name="ngayKhoiChieu" />
      </Form.Item>
      <Form.Item label="Now showing" valuePropName="checked" name="sapChieu">
        <Switch onChange={handleChangeChecked} name="sapChieu" />
      </Form.Item>
      <Form.Item label="Coming soon" valuePropName="checked" name="dangChieu">
        <Switch onChange={handleChangeChecked} name="dangChieu" />
      </Form.Item>
      <Form.Item label="Hot" valuePropName="checked" name="hot">
        <Switch name="hot" onChange={handleChangeChecked} />
      </Form.Item>
      <Form.Item label="Number of stars" name="danhGia"
        rules={[
          {
            required: true,
            message: "Please enter your Stars!!!"
          },

        ]}
        hasFeedback>
        <Input type='number' onChange={handleChange} name="danhGia" min={0} max={10} />
      </Form.Item>
      <Form.Item label="Picture">
        <Form.Item name="hinhAnh" valuePropName="fileList"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please enter your Picture!!!"
          //   },
          // ]}

          getValueFromEvent={normFile} noStyle>
          <Upload.Dragger name="files" listType="picture" defaultFileList={[...Img]} onChange={handleFile}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        {renderButton()}
      </Form.Item>
    </Form>
  )
}

export default CreateMovie