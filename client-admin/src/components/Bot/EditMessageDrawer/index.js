import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { sendMessageToBackend } from "actions/Bot";

const { TextArea } = Input;
// Reference: https://ant.design/components/drawer-cn/#components-drawer-demo-form-in-drawer
class EditMessageDrawer extends React.Component {
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
        this.setState({ loading: true })
        try {
            const id = this.props.target.msg._id
            // call sendMessageToBackend action
            sendMessageToBackend(id, values.content, values.label || '');
            message.success(`Edited message ${id}`)
            this.onClose()
        } catch (error) {
            message.error(String(error))
            this.setState({ loading: false })
        }
    };

    render() {
        return (
            <>
                {/* show drawer when button is clicked */}
                <Button onClick={this.showDrawer}>
                    Edit
                </Button>

                <Drawer
                    title={`Edit Message ${this.props.target.msg._id}`}
                    width="30%"
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    {/* form inside the drawer */}
                    <Form
                        // fill in current values of content and label
                        initialValues={{ content: this.props.target.msg.content, label: this.props.target.msg.label}}
                        layout="vertical"
                        hideRequiredMark
                        onFinish={this.submitForm}
                        autoComplete="off"
                    >
                        <Col>
                            <Form.Item
                                name="content"
                                label="Content"
                                rules={[
                                    // content is required
                                    { required: true, message: 'Please enter the content of message.' },
                                    { type: 'string', min: 1 }
                                ]}
                            >
                                <TextArea rows={4} />
                            </Form.Item>
                            <Form.Item
                                name="label"
                                label="Label"
                                // label is not required
                                rules={[
                                    { required: false, message: 'Please enter label of the message for admin.' },
                                    { type: 'string', min: 0 }
                                ]}
                            >
                                <Input
                                    placeholder="Please enter label (optional)"
                                />
                            </Form.Item>
                        </Col>

                        <Space style={{ marginTop: "20px" }}>
                            {/* cancel and submit button */}
                            <Button onClick={this.onClose}>Cancel</Button>
                            <Button type="primary" htmlType="submit" loading={this.state.loading}>
                                Submit Edit
                            </Button>
                        </Space>
                    </Form>
                </Drawer>
            </>
        );
    }
}
export default EditMessageDrawer