import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  UserOutlined,
  TeamOutlined,
  PieChartOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Sider } = Layout;

// Reference: https://ant.design/components/menu-cn/#components-menu-demo-sider-current

// submenu keys of first level
const rootSubmenuKeys = ['database-submenu'];

const MenuComponent = () => {
  ////////////////////// FROM DEMO, DO NOT CHANGE ///////////////////////
  const [openKeys, setOpenKeys] = React.useState(['sub1']);
  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  ///////////////////////////////////////////////////////////////////////

  return (
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
      }}
      theme="light"
    >
      <Menu className="siteBarLayout" mode="inline" openKeys={openKeys} onOpenChange={onOpenChange}>

        <Menu.Item key="0" icon={<UserOutlined />}>
          <Link className="nav-item" to="/">
            Dashboard
          </Link>
        </Menu.Item>

        <Menu.Item key="1" icon={<PieChartOutlined />}>
          <Link className="nav-item" to="/statistics">
            Bot Statistics
          </Link>
        </Menu.Item>

        <SubMenu key="database-submenu" icon={<TeamOutlined />} title="Manage">
          <Menu.Item key="2">
            <Link className="nav-item" to="/database/bot">
              Bot Management
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link className="nav-item" to="/database/bot-workflow">
              Bot Workflow
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link className="nav-item" to="/database/admin">
              Admin Accounts
            </Link>
          </Menu.Item>
        </SubMenu>

        <Menu.Item key="5" icon={<LogoutOutlined />}>
            <Link className="nav-item" to="/login">
              Logout
            </Link>
          </Menu.Item>

      </Menu>
    </Sider>
  );
};

export default MenuComponent;
