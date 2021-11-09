import React, { useState } from "react";
import { Space } from "antd";
import { useSelector } from "react-redux";
import { Modal, Input, Select } from "antd";
import {
  sendReplyToBackend,
  sendMessageToBackend,
  deleteMessageToBackend,
} from "../../../actions/Bot/index";
import BotWarning from "../BotWarning";

export function MessageOptionMenu(props) {
  const { Option } = Select;
  console.log(props);
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalTextContent, setModalTextContent] = useState('');
  const [modalTextLabel, setModalTextLabel] = useState('');
  const [modelToMessageId, setModelToMessageId] = useState('');
  const [displayReplyWarning, setDisplayReplyWarning] = useState(false);

  const updateState = () => {
    setVisible(false)
    setVisibleEdit(false)
    setConfirmLoading(false)
    setModalTextContent('')
    setModelToMessageId('')
    setModelToMessageId('')
    setDisplayReplyWarning(false)
  }

  const _ = useSelector((state) => {
    return state.surveyData.messages;
  });

  const showReplyModal = () => {
    updateState()
    setVisible(true);
    console.log({modalTextContent}, props.msg.content); 
  };
  const showEditModal = () => {
    updateState()
    setModalTextContent(props.msg.content);
    setModalTextLabel(props.msg.label);
    setModelToMessageId(props.msg._id);
    setVisibleEdit(true);
  };

  const handleOk = () => {
    console.log({modalTextContent}, modalTextContent === ""); 
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

      updateState()
    }
  };
  const handleEditOk = (event) => {
    console.log({modalTextContent}, modalTextContent === ""); 
    // setModalText("The modal will be closed after two seconds");
    if (modalTextContent === "") {
      setDisplayReplyWarning(true);
    } else {
      setDisplayReplyWarning(false);
      console.log(displayReplyWarning);
      setConfirmLoading(true);
      sendMessageToBackend(props.msg._id, modalTextContent, modalTextLabel);
      updateState()
    }
  };

  const handleCancel = () => {
    updateState()
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
  return (
    <div>
      <Space size="middle">
        <a onClick={showEditModal}>EDIT</a>
        <a onClick={() => deleteMessageToBackend(props.msg._id)}>DELETE</a>
        <a onClick={showReplyModal}>NEW OPTION</a>
      </Space>
      <Modal
        title="Add New Reply"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Input placeholder="Content" onChange={handleNewOptionTextContent} 
          value={modalTextContent}/>
        <BotWarning displayReplyWarning={displayReplyWarning}></BotWarning>
        <Input
          placeholder="Label (Optional)"
          onChange={handleNewOptionTextLabel}
          value={modalTextLabel}
        />
        <Select style={{ width: 120 }} onChange={onMessageChange} value={modelToMessageId}>
          {props.msgList.map((msg) => {
            if (msg._id !== props.msg._id)
              return <Option key={msg._id}>{msg.content}</Option>;
          })}
        </Select>
      </Modal>
      <Modal
        title="Edit Message"
        visible={visibleEdit}
        onOk={handleEditOk}
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
      </Modal>
    </div>
  );
}