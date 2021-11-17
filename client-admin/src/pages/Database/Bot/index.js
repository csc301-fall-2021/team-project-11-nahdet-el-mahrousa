import React from "react";

import Menu from "components/Menu";
import { Layout, PageHeader, Button, Space } from 'antd';

import Messages from "../../../components/Bot/BotMessages/messages";
import { getMessageFromBackend } from "../../../actions/Bot/index";
import { AddNewMessageButton } from "../../../components/Bot/NewMessageModal/index";

const { Header, Content } = Layout;

class BotPage extends React.Component {
  render() {
    getMessageFromBackend();
    return (
      <Layout>
        <Menu />

        <Layout theme="light">

          <PageHeader
            // ghost={false}
            title="Bot Workflow Management"
            extra={[
              <Button key="3">Refresh</Button>,
              <AddNewMessageButton />
            ]}
          >
            <Space>
              Please do not delete the Message with label "__init__", since it will be the entry point of the bot.
            </Space>
          </PageHeader>

          <Content style={{ padding: '1rem' }}>
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
