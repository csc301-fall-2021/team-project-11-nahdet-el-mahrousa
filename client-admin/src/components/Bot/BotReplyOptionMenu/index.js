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
        // call deleteReplyToBackend action to delete reply when user clicks ok.
          deleteReplyToBackend(replyId)
          this.setState({ visible: false })
          this.setState({ confirmLoading: false })
          message.success(`Deleted reply`)
          // handle error.
      } catch (error) {
          this.setState({ confirmLoading: false })
          message.error(String(error))
      }
  };

  render() {
      return (
        // use popconfirm to make sure user wants to delete the reply.
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
      {/* use EditReplyDrawer and DeleteButton components */}
      <Space size="middle">
        {/* pass in props */}
        <EditReplyDrawer target={props} />
        {/* pass in props.data._id */}
        <DeleteButton target={props.data._id} />
      </Space>
    </div>
  );
}