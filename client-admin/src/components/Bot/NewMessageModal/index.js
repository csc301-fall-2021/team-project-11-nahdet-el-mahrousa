import React, { useState } from "react";
import { Space, Button } from "antd";
import { useSelector } from "react-redux";
import { Modal, Input } from "antd";
import { sendMessageToBackend } from "../../../actions/Bot/index";
import BotWarning from "../BotWarning";

export function AddNewMessageButton(props) {
  console.log(props);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalTextContent, setModalTextContent] = useState("");
  const [modalTextLabel, setModalTextLabel] = useState("");
  const [displayWarning, setDisplayWarning] = useState(false);

  const data = useSelector((state) => {
    return state.surveyData.messages;
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
      sendMessageToBackend(null, modalTextContent, modalTextLabel);

      setVisible(false);
      setConfirmLoading(false);

      setModalTextContent("");
      setModalTextLabel("");
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleNewOptionTextContent = (event) => {
    setModalTextContent(event.target.value);
  };
  const handleNewOptionTextLabel = (event) => {
    setModalTextLabel(event.target.value);
  };

  return (
    <div>
      <Space size="middle">
        <Button onClick={showModal}>NEW Message</Button>
      </Space>
      <Modal
        title="Add New Message"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Input placeholder="Content" onChange={handleNewOptionTextContent} />
        <BotWarning displayWarning={displayWarning}></BotWarning>
        <Input
          placeholder="Label (Optional)"
          onChange={handleNewOptionTextLabel}
        />
      </Modal>
    </div>
  );
}
