import React, { useState } from "react";
import { Modal, Button, Form, Input } from 'antd';

// Please read: https://juejin.cn/post/6844903895630610440


function NewReplyModal(props) {
  // Modal Management
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  // Form Management

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  return (
    <Modal
      title="Title"
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={() => setVisible(false)}
    >

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >

        <Form.Item
          label="Reply Content"
          name="content"
          rules={[{ required: true, message: 'Please input reply content!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Reply Label"
          name="label"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="To Message ID"
          name="toMessage"
          rules={[{ required: true, message: 'Please input the next message ID!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

    </Modal>
  );
};

export default NewReplyModal