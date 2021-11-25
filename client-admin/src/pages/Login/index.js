import React from 'react';
import "./index.css"
import { useHistory } from 'react-router-dom';

import { Form, Input, Button, message } from 'antd';

import { loginAdmin, logoutAdmin } from 'actions/Auth'

function LoginPage() {
    const history = useHistory();   // Used for redirection
    // Coming to the login page, we first logout the user.
    logoutAdmin()
    
    /**
     * When user click LOGIN, send request to verify input. If valid, redirect to home page.
     * @param {*} values {username, password}
     */
    const onFinish = async (values) => {
        // console.log('Received values of form: ', values);
        try {
            const loginSuccess = await loginAdmin(values)
            if (loginSuccess) {
                message.success("Login successfully")
                history.push("/")   // Redirect to home page
            } else {
                message.warning("Invalid Credentials!")
            }
        } catch(error) {
            message.error(String(error))
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1>Welcome to NM Bot Admin Dashboard</h1>

                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}


export default LoginPage;

