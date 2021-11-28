import React from "react";
import { Space } from "antd";
// import { useSelector } from "react-redux";
import { message, Popconfirm, Button } from "antd";
import {
  deleteMessageToBackend,
} from "actions/Bot/index";

import EditMessageDrawer from "../EditMessageDrawer";
import NewOptionDrawer from "../NewOptionDrawer";

class DeleteButton extends React.Component {
  state = {
    visible: false,
    confirmLoading: false,
  };

  handleOk = async () => {
    this.setState({ confirmLoading: true });

    const msgId = this.props.target;
    // to async request
    try {
      deleteMessageToBackend(msgId);
      this.setState({ visible: false });
      this.setState({ confirmLoading: false });
      message.success(`Deleted message ${msgId}`);
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
        <Button danger onClick={() => this.setState({ visible: true })}>
          Delete
        </Button>
      </Popconfirm>
    );
  }
}

export default function MessageOptionMenu(props) {
  console.log(props);
  return (
    <div>
      <Space size="middle">
        <EditMessageDrawer target={props.msg._id} />
        <DeleteButton target={props.msg._id} />
        <NewOptionDrawer target={props} />
      </Space>
    </div>
  );
}