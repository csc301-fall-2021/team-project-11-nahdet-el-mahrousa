import React from "react";
import Messages from "../../../components/Bot/BotMessages/messages";
import { getMessageFromBackend } from "../../../actions/Bot/index";
import { AddNewMessageButton } from "../../../components/Bot/NewMessageModal/index";
import Sider from "components/Menu";
import { Row, Col } from 'antd';

class BotPage extends React.Component {
  render() {
    getMessageFromBackend();
    return (
      <Row style={{ minHeight: '100vh' }}>
        <Col>
          <Sider></Sider>
        </Col>
        <Col className="site-layout" style={ {marginLeft: 20, width: 1100}}>
          <h1>Bot PAGE</h1>
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
