import React, { useState } from "react";
import { Space } from "antd";
// import { useSelector } from "react-redux";
import { Modal, Input, Select, message, Popconfirm, Button } from "antd";
import {
  sendReplyToBackend,
  sendMessageToBackend,
  deleteMessageToBackend,
} from "../../../actions/Bot/index";
import BotWarning from "../BotWarning";
import EditMessageDrawer from "../EditMessageDrawer";
import NewOptionDrawer from "../NewOptionDrawer";

class DeleteButton extends React.Component {
  state = {
    visible: false,
    confirmLoading: false,
  };

  handleOk = async () => {
    this.setState({ confirmLoading: true });

    const msgToDelete = this.props.target;
    console.log("deleting ", msgToDelete);
    // TODO: to async request
    try {
      await deleteMessageToBackend(msgToDelete);
      this.setState({ visible: false });
      this.setState({ confirmLoading: false });
      message.success(`Deleted message`);
    } catch (error) {
      this.setState({ confirmLoading: false });
      message.error(String(error));
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
        <Button type="primary" onClick={() => this.setState({ visible: true })}>
          DELETE
        </Button>
      </Popconfirm>
    );
  }
}

export function MessageOptionMenu(props) {
  console.log(props);
  return (
    <div>
      <Space size="middle">
        <EditMessageDrawer target={prop} />
        <DeleteButton target={props.msg._id} />
        <NewOptionDrawer target={props} />
      </Space>
    </div>
  );
}
