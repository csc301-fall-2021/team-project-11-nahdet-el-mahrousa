import React from 'react';
import { Layout, Menu, Card, Avatar } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  TeamOutlined,
  PieChartOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import "./index.css";

const { Meta } = Card;

const { Header, Sider, Content } = Layout;

class MenuBar extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout className="siteBarLayout">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              Account
            </Menu.Item>
            <Menu.Item key="2" icon={<TeamOutlined />}>
              Manage
            </Menu.Item>
            <Menu.Item key="3" icon={<PieChartOutlined />}>
              Summary
            </Menu.Item>
            <Menu.Item key="4" icon={<QuestionCircleOutlined />}>
              Bot 
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: this.toggle,
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
          <Card
            hoverable
            style={{ width: 240, height: 200, textAlign:"center"}}
          >
            <Avatar size={100} icon={<UserOutlined />} style={{marginBottom: 30}}/>
            <Meta title="User A"/>
          </Card>,
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default MenuBar;
