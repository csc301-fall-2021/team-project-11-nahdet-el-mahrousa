import React from "react";
import Messages from "../../../components/Bot/BotMessages/messages";
import { getMessageFromBackend } from "../../../actions/Bot/index";
import { AddNewMessageButton } from "../../../components/Bot/NewMessageModal/index";
import Menu from "components/Menu";
import { Row, Col } from 'antd';

class BotPage extends React.Component {
  render() {
    getMessageFromBackend();
    return (
      <Row style={{ minHeight: '100vh' }}>
        <Col>
          <Menu />
        </Col>
        <Col className="site-layout" style={{ marginLeft: 20, width: 1100 }}>
          <h1>Bot Management</h1>
          <AddNewMessageButton></AddNewMessageButton>
          <div className="container">
            <Messages></Messages>
          </div>
        </Col>
      </Row>
    );
  }
}

export default BotPage;
