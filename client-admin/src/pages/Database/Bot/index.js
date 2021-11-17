import React from "react";
import Messages from "../../../components/Bot/BotMessages/messages";
import { getMessageFromBackend } from "../../../actions/Bot/index";
import { AddNewMessageButton } from "../../../components/Bot/NewMessageModal/index";
import Menu from "components/Menu";
import { Layout } from 'antd';
const { Header, Content } = Layout;

class BotPage extends React.Component {
  render() {
    getMessageFromBackend();
    return (
      <Layout>
        <Menu />

        <Layout theme="light">

          <Header style={{ "backgroundColor": "white" }}><h1>Bot Flowchart Management</h1></Header>

          <Content style={{ padding: '1rem' }}>
            <AddNewMessageButton />
            <div className="container">
              <Messages />
            </div>
          </Content>

        </Layout>

      </Layout>

    );
  }
}

export default BotPage;
