import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Space,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { sendReplyToBackend } from "actions/Bot";

const { TextArea } = Input;
function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log("blur");
}

function onFocus() {
  console.log("focus");
}

function onSearch(val) {
  console.log("search:", val);
}
// Reference: https://ant.design/components/drawer-cn/#components-drawer-demo-form-in-drawer
class NewOptionDrawer extends React.Component {
  state = {
    visible: false,
    loading: false,
  };

  showDrawer = () => {
    this.setState({
      visible: true,
      loading: false,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
      loading: false,
    });
  };
  /**
   * Submit form to server.
   * @param {*} values
   * @returns
   */
  submitForm = async (values) => {
    this.setState({ loading: true });
    try {
      sendReplyToBackend(null, values.content, values.label || "", this.props.target.msg._id, values.toMessage || "");
      message.success(`Created new reply`);
      this.onClose();
    } catch (error) {
      message.error(String(error));
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <>
        <Button
          type="primary"
          onClick={this.showDrawer}
          icon={<PlusOutlined />}
        >
          Create new reply
        </Button>

        <Drawer
          title="Create a new reply"
          width="30%"
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <Form
            layout="vertical"
            onFinish={this.submitForm}
            autoComplete="off"
          >
            <Col>
              <Form.Item
                name="content"
                label="Content"
                rules={[
                  { required: true, message: "Please enter reply content" },
                  { type: "string", min: 0 },
                ]}
              >
                <Input placeholder="Please enter reply content" />
              </Form.Item>
              <Form.Item
                name="label"
                label="Label"
                rules={[
                  { required: false, message: "Please enter label" },
                  { type: "string", min: 0 },
                ]}
              >
                <Input placeholder="Please enter label (optional)" />
              </Form.Item>
              <Form.Item
                name="toMessage"
                label="Next Message"
                rules={[
                  { required: false, message: "Please search for next message" },
                  { type: "string", min: 0 },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select next message"
                  optionFilterProp="children"
                  onChange={onChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {this.props.target.msgList.map((msg) => {
                    if (msg._id !== this.props.target.msg._id)
                      return (
                        <Select key={msg._id}>
                          {(msg._id + " ") + (msg.label !== "" ? msg.label + ": " : "") + msg.content}
                        </Select>
                      )
                  })}
                </Select>
              </Form.Item>
            </Col>

            <Space style={{ marginTop: "20px" }}>
              <Button onClick={this.onClose}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={this.state.loading}
              >
                Create
              </Button>
            </Space>
          </Form>
        </Drawer>
      </>
    );
  }
}
export default NewOptionDrawer;
