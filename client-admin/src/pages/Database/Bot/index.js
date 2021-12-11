import React from "react";

import Menu from "components/Menu";
import { Layout, PageHeader, Button, Space, Select, Input } from "antd";

import Messages from "components/Bot/BotMessages";
import NewMessageDrawer from "components/Bot/NewMessageDrawer";
import { getMessageFromBackend, getQueryMessage } from "actions/Bot";

const { Header, Content } = Layout;
const { Option } = Select;

class BotPage extends React.Component {
  state = {
    tableRefresher: false,
    searchKey: "content",
    searchValue: "",
  };

  // Force Re-rendering Reference: https://www.freecodecamp.org/news/force-refreshing-a-react-child-component-the-easy-way-6cdbb9e6d99c/
  refreshTable = () => {
    this.setState({ tableRefresher: !this.state.tableRefresher });
  };

  onSearch = (searchValue) => {
    console.log("Searching:", searchValue);
    this.setState({
      searchValue,
    });
    getQueryMessage({ key: this.state.searchKey, value: searchValue });
  };

  onSelectSearchKey = (searchKey) => {
    this.setState({ searchKey });
  };

  render() {
    if (this.state.searchValue === "") {
      getMessageFromBackend();
    }
    return (
      <Layout>
        <Menu />
        <Layout theme="light" style={{ marginLeft: 200, minHeight: "100vh" }}>
          <PageHeader
            // ghost={false}
            title="Bot Workflow Management"
            extra={[
              <NewMessageDrawer></NewMessageDrawer>,
            ]}
          >
            <Space>
              Please do not delete the Message with label "__init__", since it
              will be the entry point of the bot.
            </Space>
          </PageHeader>

          <Content style={{ padding: "1rem" }}>
            {/* Search bar */}
            <Input.Group compact>
              {/* The option keys the user can search from */}
              <Select defaultValue="content" onChange={this.onSelectSearchKey}>
                <Option value="_id">Message ID</Option>
                <Option value="content">Message Content</Option>
                <Option value="label">Message Label</Option>
                <Option value="replyId">Reply ID</Option>
                <Option value="replyContent">Reply Content</Option>
                <Option value="replyLabel">Reply Label</Option>
              </Select>
              <Input.Search
                placeholder="Search for messages"
                allowClear
                style={{ width: "50%", marginBottom: "1rem" }}
                onSearch={this.onSearch}
              />
            </Input.Group>
            <div className="container">
              <Messages refresh={this.state.tableRefresher} query={{ key: this.state.searchKey, value: this.state.searchValue }} />
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default BotPage;
