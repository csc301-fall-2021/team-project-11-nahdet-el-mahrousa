import React from "react";
import { Table, Badge, Menu, Dropdown, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "antd";
import { Input } from 'antd';

export function MessageOptionMenu(props) {
  console.log(props)
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState(props.msgId);

  const data = useSelector(state => {
    console.log({state})
    return state.surveyData.messages
  });

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    // setModalText("The modal will be closed after two seconds");
    console.log(modalText);
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const handleNewOptionText = (event) => {
    console.log(event.target.value);
    setModalText(event.target.value);
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
        <Input placeholder="Enter new options" onChange={handleNewOptionText}/>
      </Modal>
    </div>
  );
}
