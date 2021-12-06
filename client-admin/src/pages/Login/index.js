import React from 'react';
// import "./index.css"
import { useHistory } from 'react-router-dom';

import { Form, Input, Button, message, Row, Layout, Col } from 'antd';

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
        try {
            const loginSuccess = await loginAdmin(values)
            if (loginSuccess) {
                message.success("Login successfully")
                history.push("/")   // Redirect to home page
            } else {
                message.warning("Invalid Credentials!")
            }
        } catch (error) {
            message.error(String(error))
        }
    };

    return (
        <Layout className="login-page" style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignContent: "center" }}>
            <Col className="login-container" span={10} offset={7} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                <Row>
                    <h1>Welcome to NM Bot Admin Dashboard</h1>
                </Row>

                <Row style={{ width: "80%", marginTop: "2rem" }}>
                    <Col span={24}>
                        <Form
                            name="basic"
                            labelCol={{ span: 5, offset: 2 }}
                            wrapperCol={{ span: 12, offset: 1 }}
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

                            <Form.Item wrapperCol={{ offset: 10, span: 4 }}>
                                <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Col>
        </Layout>
    )
}


export default LoginPage;

