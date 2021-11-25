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
          Delete
        </Button>
      </Popconfirm>
    );
  }
}

export function MessageOptionMenu(props) {
  const { Option } = Select;
  console.log(props);
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalTextContent, setModalTextContent] = useState("");
  const [modalTextLabel, setModalTextLabel] = useState("");
  const [modelToMessageId, setModelToMessageId] = useState("");
  const [displayReplyWarning, setDisplayReplyWarning] = useState(false);

  const updateState = () => {
    setVisible(false);
    setVisibleEdit(false);
    setConfirmLoading(false);
    setModalTextContent("");
    setModelToMessageId("");
    setModelToMessageId("");
    setDisplayReplyWarning(false);
  };

  // const _ = useSelector((state) => {
  //   return state.surveyData.messages;
  // });

  const showReplyModal = () => {
    updateState();
    setVisible(true);
    console.log({ modalTextContent }, props.msg.content);
  };

  const handleOk = () => {
    console.log({ modalTextContent }, modalTextContent === "");
    // setModalText("The modal will be closed after two seconds");
    if (modalTextContent === "") {
      setDisplayReplyWarning(true);
    } else {
      setDisplayReplyWarning(false);
      setConfirmLoading(true);
      sendReplyToBackend(
        "",
        modalTextContent,
        modalTextLabel,
        props.msg._id,
        modelToMessageId
      );

      updateState();
    }
  };

  const handleCancel = () => {
    updateState();
  };

  const handleNewOptionTextContent = (event) => {
    setModalTextContent(event.target.value);
  };
  const handleNewOptionTextLabel = (event) => {
    setModalTextLabel(event.target.value);
  };
  const onMessageChange = (event) => {
    setModelToMessageId(event);
    // setModalTextLabel(event.target.value);
  };

  function onBlur() {
    console.log('blur');
  }
  
  function onFocus() {
    console.log('focus');
  }
  
  function onSearch(val) {
    console.log('search:', val);
  }

  return (
    <div>
      <Space size="middle">
        <EditMessageDrawer target={props.msg._id} />
        <DeleteButton target={props.msg._id} />
        <Button onClick={showReplyModal}>NEW OPTION</Button>
      </Space>
      <Modal
        title="Add New Reply"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Content"
          onChange={handleNewOptionTextContent}
          value={modalTextContent}
        />
        <BotWarning displayReplyWarning={displayReplyWarning}></BotWarning>
        <Input
          placeholder="Label (Optional)"
          onChange={handleNewOptionTextLabel}
          value={modalTextLabel}
        />
        <Select
          showSearch
          style={{ width: 472 }}
          placeholder="Select to message"
          optionFilterProp="children"
          onChange={onMessageChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {props.msgList.map((msg) => {
            if (msg._id !== props.msg._id)
              return <Option key={msg._id}>{msg.content}</Option>;
          })}
        </Select>
      </Modal>
    </div>
  );
}
