import React from "react";

import { Drawer, Form, Button, Col, Input, Select, Space, message } from "antd";

import { sendReplyToBackend } from "actions/Bot";

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
class EditReplyDrawer extends React.Component {
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
      const id = this.props.target.data._id;
      // call sendReplyToBackend action, and pass data to backend.
      sendReplyToBackend(
        id,
        values.content,
        values.label || "",
        this.props.target.data.fromMessage,
        values.toMessage
      );
      message.success(`Edited new reply`);
      this.onClose();
    } catch (error) {
      message.error(String(error));
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <>
        {/* show drawer when button is clicked */}
        <Button onClick={this.showDrawer}>Edit</Button>
        <Drawer
          title={`Edit Reply ${this.props.target.data._id}`}
          width="30%"
          onClose={this.onClose}
          visible={this.state.visible}
        >
          {/* form inside the drawer */}
          <Form
            // fill in current values of content, label, and toMessage
            initialValues={{
              content: this.props.target.data.content,
              label: this.props.target.data.label,
              toMessage: this.props.target.data.toMessage,
            }}
            layout="vertical"
            onFinish={this.submitForm}
            autoComplete="off"
          >
            <Col>
              <Form.Item
                name="content"
                label="Content"
                rules={[
                  // content is required
                  { required: true, message: "Please enter reply content." },
                  { type: "string", min: 1 },
                ]}
              >
                <Input placeholder="Please enter reply content." />
              </Form.Item>
              <Form.Item
                name="label"
                label="Label"
                rules={[
                  {
                    // label is not required
                    required: false,
                    message: "Please enter label of the reply for admin.",
                  },
                  { type: "string", min: 0 },
                ]}
              >
                <Input placeholder="Please enter label (optional)" />
              </Form.Item>
              <Form.Item
                name="toMessage"
                label="Next Message"
                rules={[
                  {
                    // toMessage is not required
                    required: false,
                    message:
                      "Please search for next message this reply will direct to.",
                  },
                ]}
              >
                {/* search and select the next message */}
                <Select
                  showSearch
                  // style={{ width: 300 }}
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
                    if (msg._id !== this.props.target.data.fromMessage)
                      return (
                        <Select key={msg._id}>
                          {msg._id +
                            " " +
                            (msg.label !== "" ? msg.label + ": " : "") +
                            msg.content}
                        </Select>
                      );
                  })}
                </Select>
              </Form.Item>
            </Col>

            <Space style={{ marginTop: "20px" }}>
              {/* cancel and submit button */}
              <Button onClick={this.onClose}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={this.state.loading}
              >
                Submit Edit
              </Button>
            </Space>
          </Form>
        </Drawer>
      </>
    );
  }
}
export default EditReplyDrawer;