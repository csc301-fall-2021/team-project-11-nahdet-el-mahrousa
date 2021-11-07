import React, { useState } from "react";
import { Table, Badge, Menu, Dropdown, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button, Input, Select } from "antd";
import { sendReplyToBackend, deleteReplyToBackend} from '../../../actions/Bot/index'
import BotWarning from '../BotWarning'

export function ReplyOptionMenu(props) {
  const { Option } = Select;
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalTextContent, setModalTextContent] = useState(props.data.content);
  const [modalTextLabel, setModalTextLabel] = useState(props.data.label);
  const [displayWarning, setDisplayWarning] = useState(false);
  const [modelToMessageId, setModelToMessageId] = useState(props.data.toMessage);

  const data = useSelector(state => {
    return state.surveyData.messages
  });

  const showModal = () => {
    setVisible(true);
  };


  const handleOk = () => {
    // setModalText("The modal will be closed after two seconds");
    if (modalTextContent === "") {
      setDisplayWarning(true);
    } else {
      setDisplayWarning(false);
      setConfirmLoading(true);
      sendReplyToBackend(props.data._id, modalTextContent, modalTextLabel, props.data.fromMessage, modelToMessageId)

      setVisible(false);
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const handleNewOptionTextContent = (event) => {
    setModalTextContent(event.target.value);
  }
  const handleNewOptionTextLabel = (event) => {
    setModalTextLabel(event.target.value);
  }
  const onMessageChange = (event) => {
    setModelToMessageId(event)
    // setModalTextLabel(event.target.value);s
  }

  return (
    <div>
      <Space size="middle">
        <a onClick={showModal}>EDIT</a>
        <a onClick={() => deleteReplyToBackend(props.data._id)}>DELETE</a>
      </Space>
      <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Input placeholder="Content" onChange={handleNewOptionTextContent} value={modalTextContent}/>
        <BotWarning displayWarning={displayWarning}></BotWarning>
        <Input placeholder="Label (Optional)" onChange={handleNewOptionTextLabel} value={modalTextLabel}/>
        <Select style={{ width: 120 }} onChange={onMessageChange}>
          {props.msgList.map(msg => {
              if(msg._id !== props.data.fromMessage)
                return <Option key={msg._id}>{msg.content}</Option>
            })}
        </Select>
      </Modal>
    </div>
  );
}
