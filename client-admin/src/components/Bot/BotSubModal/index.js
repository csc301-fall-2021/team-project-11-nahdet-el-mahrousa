import React, { useState } from "react";
import { Space } from "antd";
import { useSelector } from "react-redux";
import { Modal, Input, Select, message, Popconfirm, Button } from "antd";
import { sendReplyToBackend, deleteReplyToBackend } from '../../../actions/Bot/index'
import BotWarning from '../BotWarning'

class DeleteButton extends React.Component {
  state = {
      visible: false,
      confirmLoading: false
  }

  handleOk = async () => {
      this.setState({ confirmLoading: true })

      const replyToDelete = this.props.target
      console.log('deleting ', replyToDelete)
      // TODO: to async request
      try {
          await deleteReplyToBackend(replyToDelete)
          this.setState({ visible: false })
          this.setState({ confirmLoading: false })
          message.success(`Deleted reply`)
      } catch (error) {
          this.setState({ confirmLoading: false })
          message.error(String(error))
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
      )
  }
}

export function ReplyOptionMenu(props) {
  const { Option } = Select;
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalTextContent, setModalTextContent] = useState('');
  const [modalTextLabel, setModalTextLabel] = useState('');
  const [displayWarning, setDisplayWarning] = useState(false);
  const [modelToMessageId, setModelToMessageId] = useState('');

  const data = useSelector(state => {
    return state.surveyData.messages
  });

  const showModal = () => {
    setVisible(true);
    setModalTextLabel(props.data.label);
    setModalTextContent(props.data.content);
    setModelToMessageId(props.data.toMessage);
  };


  const handleOk = () => {
    // setModalText("The modal will be closed after two seconds");
    console.log(props.data.content)
    if (modalTextContent === "") {
      setDisplayWarning(true);
    } else {
      setDisplayWarning(false);
      setConfirmLoading(true);
      sendReplyToBackend(props.data._id, modalTextContent, modalTextLabel, props.data.fromMessage, modelToMessageId)

      setVisible(false);
      setConfirmLoading(false);

      setModalTextContent("");
      setModalTextLabel("");
      setModelToMessageId("");
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
        <Button onClick={showModal}>EDIT</Button>
        <DeleteButton target={props.data._id} />
      </Space>
      <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Input placeholder="Content" onChange={handleNewOptionTextContent} value={modalTextContent} />
        <BotWarning displayWarning={displayWarning}></BotWarning>
        <Input placeholder="Label (Optional)" onChange={handleNewOptionTextLabel} value={modalTextLabel} />
        
        <Select
          showSearch
          style={{ width: 472 }}
          placeholder="Type to Search To Message"
          optionFilterProp="children"
          value={modelToMessageId} 
          onChange={onMessageChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {props.msgList.map(msg => {
            if (msg._id !== props.data.fromMessage)
              return <Option key={msg._id}>{msg.content}</Option>
          })}
        </Select>
      </Modal>
    </div>
  );
}