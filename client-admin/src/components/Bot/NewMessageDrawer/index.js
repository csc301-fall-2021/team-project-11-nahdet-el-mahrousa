import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { sendMessageToBackend } from "actions/Bot";
import BotWarning from "../BotWarning";

// Reference: https://ant.design/components/drawer-cn/#components-drawer-demo-form-in-drawer
class NewMessageDrawer extends React.Component {
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
          if (values.label === null) {
            const createdUser = await sendMessageToBackend(null, values.content, '');
            message.success(`Created new admin user ${createdUser.username}`)
            this.onClose()
          } else {
            const createdUser = await sendMessageToBackend(null, values.content, values.label);
            message.success(`Created new admin user ${createdUser.username}`)
            this.onClose()
          }
      } catch (error) {
          message.error(String(error))
          this.setState({ loading: false })
      }
  };

  render() {
      return (
          <>
              <Button type="primary" onClick={this.showDrawer} icon={<PlusOutlined />}>
                  Create new message
              </Button>

              <Drawer
                  title="Create a new message"
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
                              name="content"
                              label="Content"
                              rules={[
                                  { required: true, message: 'Please enter message content' },
                                  { type: 'string', min: 0 }
                              ]}
                          >
                              <Input placeholder="Please enter message content" />
                          </Form.Item>
                          <Form.Item
                              name="label"
                              label="Label"
                              rules={[
                                  { required: false, message: 'Please enter label' },
                                  { type: 'string', min: 0 }
                              ]}
                          >
                              <Input
                                  placeholder="Please enter label (optional)"
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
export default NewMessageDrawer