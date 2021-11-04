import React, { useState } from "react";
import { Table, Badge, Menu, Dropdown, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button, Input } from "antd";
import { sendReplyToBackend, deleteReplyToBackend} from '../../../actions/Bot/index'
import BotWarning from '../BotWarning'

export function ReplyOptionMenu(props) {
  console.log(props.data.content)
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalTextContent, setModalTextContent] = useState(props.data.content);
  const [modalTextLabel, setModalTextLabel] = useState(props.data.label);
  const [displayWarning, setDisplayWarning] = useState(false);

  const data = useSelector(state => {
    console.log({ state })
    return state.surveyData.messages
  });

  const showModal = () => {
    setVisible(true);
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
      sendReplyToBackend(props.data._id, modalTextContent, modalTextLabel, props.data.fromMessage, props.data.toMessage)

      setVisible(false);
      setConfirmLoading(false);
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
      </Modal>
    </div>
  );
}
