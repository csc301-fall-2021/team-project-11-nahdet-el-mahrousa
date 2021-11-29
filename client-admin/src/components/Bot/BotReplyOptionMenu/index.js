import React, { useState } from "react";
import { Space } from "antd";
import { useSelector } from "react-redux";
import { Modal, Input, Select, message, Popconfirm, Button } from "antd";
import { sendReplyToBackend, deleteReplyToBackend } from '../../../actions/Bot/index'

import EditReplyDrawer from "../EditReplyDrawer";

class DeleteButton extends React.Component {
  state = {
      visible: false,
      confirmLoading: false
  }

  handleOk = async () => {
      this.setState({ confirmLoading: true })

      const replyId = this.props.target

      // TODO: to async request
      try {
          deleteReplyToBackend(replyId)
          this.setState({ visible: false })
          this.setState({ confirmLoading: false })
          message.success(`Deleted reply`)
      } catch (error) {
          this.setState({ confirmLoading: false })
          message.error(String(error))
      }
  };

  render() {
      return (
          <Popconfirm
              title="Confirm?"
              visible={this.state.visible}
              onConfirm={this.handleOk}
              okButtonProps={{ loading: this.state.confirmLoading }}
              onCancel={() => this.setState({ visible: false })}
          >
              <Button danger onClick={() => this.setState({ visible: true })}>
                  Delete
              </Button>
          </Popconfirm>
      )
  }
}

export default function ReplyOptionMenu(props) {
  return (
    <div>
      <Space size="middle">
        <EditReplyDrawer target={props} />
        <DeleteButton target={props.data._id} />
      </Space>
    </div>
  );
}