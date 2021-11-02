import React, { state, useState } from 'react';
import { Link } from 'react-router-dom'
import { Form, Input, Button, Checkbox, Avatar } from 'antd';
import {
    UserOutlined,
} from "@ant-design/icons";
import "./index.css";


const LoginPage = () => {
  
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 8,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="userLogIn"
    >
      
      <Avatar size={100} icon={<UserOutlined />} style={{marginLeft: 800, marginTop: 30, marginBottom: 30}}/>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Link to="/HOME">
          <Button type="primary" htmlType="submit" onClick={() => console.log('')}>
            Submit 
          </Button>
        </Link>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;

