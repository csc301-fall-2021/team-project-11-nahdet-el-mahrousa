import React, { useState } from "react";
import { Table, Badge, Menu, Dropdown, Space,  } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button, Input, Select} from "antd";
import { sendReplyToBackend, sendMessageToBackend, deleteMessageToBackend} from '../../../actions/Bot/index'
import BotWarning from '../BotWarning'

export function MessageOptionMenu(props) {
  const { Option } = Select;
  console.log(props)
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalTextContent, setModalTextContent] = useState(props.msg.content);
  const [modalTextLabel, setModalTextLabel] = useState(props.msg.label);
  const [modelToMessageId, setModelToMessageId] = useState('');
  const [displayWarning, setDisplayWarning] = useState(false);

  console.log(modalTextContent, props.msg.content)
  const data = useSelector(state => {
    console.log({ state })
    return state.surveyData.messages
  });

  const showReplyModal = () => {
    setVisible(true);
  }; 
  const showEditModal = () => {
    setVisibleEdit(true);
  };


  const handleOk = () => {
    // setModalText("The modal will be closed after two seconds");
    console.log(modalTextContent);
    console.log(modalTextLabel);
    if (modalTextContent === "") {
      setDisplayWarning(true);
    } else {
      setDisplayWarning(false);
      console.log(displayWarning)
      setConfirmLoading(true);
      sendReplyToBackend('', modalTextContent, modalTextLabel, props.msg._id, modelToMessageId)

      setVisible(false);
      setConfirmLoading(false);
    }
  };
  const handleEditOk = () => {
    // setModalText("The modal will be closed after two seconds");
    console.log(modalTextContent);
    console.log(modalTextLabel);
    if (modalTextContent === "") {
      setDisplayWarning(true);
    } else {
      setDisplayWarning(false);
      console.log(displayWarning)
      setConfirmLoading(true);
      sendMessageToBackend(props.msg._id, modalTextContent, modalTextLabel)
      setVisibleEdit(false);
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
    setVisibleEdit(false);
  };

  const handleNewOptionTextContent = (event) => {
    console.log(event.target.value);
    setModalTextContent(event.target.value);
  }
  const handleNewOptionTextLabel = (event) => {
    console.log(event.target.value);
    setModalTextLabel(event.target.value);
  }
  const onMessageChange = (event) => {
    console.log(event);
    setModelToMessageId(event)
    // setModalTextLabel(event.target.value);s
  }
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
        <Input placeholder="Content" onChange={handleNewOptionTextContent} />
        <BotWarning displayWarning={displayWarning}></BotWarning>
        <Input placeholder="Label (Optional)" onChange={handleNewOptionTextLabel} />
        <Select style={{ width: 120 }} onChange={onMessageChange}>
          {props.msgList.map(msg => {
              if(msg._id !== props.msg._id)
                return <Option key={msg._id}>{msg.content}</Option>
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
        <Input placeholder="Content" onChange={handleNewOptionTextContent} value={modalTextContent}/>
        <BotWarning displayWarning={displayWarning}></BotWarning>
        <Input placeholder="Label (Optional)" onChange={handleNewOptionTextLabel} value={modalTextLabel}/>
      </Modal>
    </div>
  );
}
