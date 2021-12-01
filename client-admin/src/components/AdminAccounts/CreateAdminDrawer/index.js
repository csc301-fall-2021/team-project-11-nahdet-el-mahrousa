import React from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { requestCreateAdminAccount } from 'actions/AdminAccounts';

// Reference: https://ant.design/components/drawer-cn/#components-drawer-demo-form-in-drawer
class CreateAdminDrawer extends React.Component {
    state = {
        visible: false,
        loading: false
    }

    showDrawer = () => {
        this.setState({
            visible: true,
            loading: false
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
            loading: false
        });
    };

    /**
     * Submit form to server.
     * @param {*} values 
     * @returns 
     */
    submitForm = async (values) => {
        if (values.password !== values.confirmPassword) {
            message.warning("The password confirmation does not match the original password.")
            return
        }
        this.setState({ loading: true })

        const { confirmPassword, ...body } = values
        try {
            const createdUser = await requestCreateAdminAccount(body)
            message.success(`Created new admin user ${createdUser.username}, please refresh.`)
            this.onClose()
            this.props.refreshTable()
        } catch (error) {
            message.error(String(error))
            this.setState({ loading: false })
        }
    };

    render() {
        return (
            <>
                <Button type="primary" onClick={this.showDrawer} icon={<PlusOutlined />}>
                    Create new admin
                </Button>

                <Drawer
                    title="Create a new admin account"
                    width="30%"
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <Form
                        layout="vertical"
                        hideRequiredMark
                        onFinish={this.submitForm}
                        autoComplete="off"
                    >
                        <Col>
                        <Form.Item
                                name="name"
                                label="Name"
                                rules={[
                                    { required: true, message: 'Please enter the name of user' },
                                    { type: 'string', min: 1 }
                                ]}
                            >
                                <Input placeholder="Please enter user's name" />
                            </Form.Item>
                            <Form.Item
                                name="username"
                                label="Username"
                                rules={[
                                    { required: true, message: 'Please enter username' },
                                    { type: 'string', min: 6 }
                                ]}
                            >
                                <Input placeholder="Please enter username" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[
                                    { required: true, message: 'Please enter password' },
                                    { type: 'string', min: 8 }
                                ]}
                            >
                                <Input.Password
                                    placeholder="Please enter password"
                                />
                            </Form.Item>
                            <Form.Item
                                name="confirmPassword"
                                label="Confirm Password"
                                rules={[
                                    { required: true, message: 'Please re-enter password' }
                                ]}
                            >
                                <Input.Password
                                    placeholder="Please confirm password"
                                />
                            </Form.Item>
                        </Col>


                        <Space style={{ marginTop: "20px" }}>
                            <Button onClick={this.onClose}>Cancel</Button>
                            <Button type="primary" htmlType="submit" loading={this.state.loading}>
                                Create
                            </Button>
                        </Space>
                    </Form>
                </Drawer>
            </>
        );
    }
}

export default CreateAdminDrawer