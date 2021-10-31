import React from "react";
import { Table, Badge, Menu, Dropdown, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "antd";
import { Input } from 'antd';
import { sendReplyToBackend } from '../../../actions/Bot/index'
import BotWarning from '../BotWarning'

export function MessageOptionMenu(props) {
  console.log(props)
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalTextContent, setModalTextContent] = React.useState(props.msgId);
  const [modalTextLabel, setModalTextLabel] = React.useState(props.msgId);
  const [displayWarning, setdisplayWarning] = React.useState(false);
  const data = useSelector(state => {
    console.log({state})
    return state.surveyData.messages
  });

  const showModal = () => {
    setVisible(true);
  };


  const handleOk = () => {
    // setModalText("The modal will be closed after two seconds");
    console.log(modalTextContent);
    console.log(modalTextLabel);
    if (modalTextContent === "" | modalTextContent === props.msgId) {
      setdisplayWarning(true);
    } else {
      setdisplayWarning(false);
      console.log(displayWarning)
      setConfirmLoading(true);
      setTimeout(() => {
        setVisible(false);
        setConfirmLoading(false);
      }, 2000);
      // sendReplyToBackend(modalTextContent, modalTextLabel, props.msgId)
      // .then((response) => {
      //   setVisible(false);
      //   setConfirmLoading(false);
      // }, (error) => {
      //     console.log(error);
      //     //display different error message
      // });
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const handleNewOptionTextContent = (event) => {
    console.log(event.target.value);
    setModalTextContent(event.target.value);
  }
  const handleNewOptionTextLabel = (event) => {
    console.log(event.target.value);
    setModalTextLabel(event.target.value);
  }

  return (
    <div>
      <Space size="middle">
        <a>EDIT</a>
        <a>DELETE</a>
        <a onClick={showModal}>NEW OPTION</a>
      </Space>
      <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Input placeholder="Content" onChange={handleNewOptionTextContent}/>
        <BotWarning displayWarning={displayWarning}></BotWarning>
        <Input placeholder="Label (Optional)" onChange={handleNewOptionTextLabel}/>
      </Modal>
    </div>
  );
}
