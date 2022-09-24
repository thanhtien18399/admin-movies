
import React, { useState } from 'react'
import {InboxOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Radio,
  Switch,
  Upload,
} from 'antd';
import { fetchAddNewAction } from '../../utils/action';
import { useDispatch } from 'react-redux';
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};
const validateMessages = {
  required: '${label} please enter this box !!!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

function CreateMovie() {
  const dispatch=useDispatch();
  const [user, setUser] = useState({
    tenPhim: "",
    trailer: "",
    moTa: "",
    maNhom: "GP02",
    ngayKhoiChieu: "",
    sapChieu: false,
    dangChieu: false,
    hot: false,
    danhGia:0,
    hinhAnh:{}
    
  })
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const handleChange = (e) => {
    setUser({...user,[e.target.name]:e.target.value})
  };
  const handleChangeChecked = (checked,e) => {
    setUser({...user,[e.target.name]:checked})
  };
  const onChange = (date, dateString) => {
    setUser({...user,ngayKhoiChieu:dateString})

  };
  const handleFile=(e)=>{
    setUser({...user,hinhAnh:e.fileList[0]?.originFileObj})
    // setUser({...user,hinhAnh:e.target.files[0]})
  }
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const handleSubmit=()=>{
    console.log("dataFilm",user);
    let form_data=new FormData();
    for (var key in user){
      if("hinhAnh"===key){
        form_data.append(key,user.hinhAnh,"bg.png");
      }else{
        form_data.append(key,user[key]);
      }
      console.log(key,form_data.get(key));
    }
    fetchAddNewAction(form_data)
   
  }
  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      {...layout}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onFinish={handleSubmit}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      name="nest-messages"  validateMessages={validateMessages}
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
          },
        ]}>
        <Input name='tenPhim'
        onChange={handleChange}/>
      </Form.Item>
      <Form.Item label="Trailer:"
        name='trailer'
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input onChange={handleChange} name="trailer"/>
      </Form.Item>
      <Form.Item label="Describe:"
        name='moTa'
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input onChange={handleChange} name="moTa"/>
      </Form.Item>
      <Form.Item label="Premiere date:"
        name="ngayKhoiChieu"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker onChange={onChange} name="ngayKhoiChieu"/>
      </Form.Item>
      <Form.Item label="Now showing" valuePropName="checked"  name="nowShowing">
        <Switch onChange={handleChangeChecked} name="sapChieu"/>
      </Form.Item>
      <Form.Item label="Coming soon" valuePropName="checked">
        <Switch onChange={handleChangeChecked} name="dangChieu"/>
      </Form.Item>
      <Form.Item label="Hot" valuePropName="checked">
        <Switch name="hot" onChange={handleChangeChecked}/>
      </Form.Item>
      <Form.Item label="Number of stars" >
        <Input type='number' onChange={handleChange} name="danhGia"/>
      </Form.Item>
      <Form.Item label="Picture">
        <Form.Item name="picture" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
          <Upload.Dragger name="files" listType="picture" onChange={handleFile}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default CreateMovie