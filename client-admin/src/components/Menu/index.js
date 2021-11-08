import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  UserOutlined,
  TeamOutlined,
  PieChartOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

const Sider = () => {
  const [openKeys, setOpenKeys] = React.useState(['sub1']);

  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Menu className="siteBarLayout" mode="inline" openKeys={openKeys} onOpenChange={onOpenChange} style={{ width: 256, height: 920 }}>

      <SubMenu key="sub1" icon={<TeamOutlined />} title="Manage">
        <Menu.Item key="1">
          <Link className="nav-item" to={`/database/bot`}>
            Bot Page
          </Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default Sider;
