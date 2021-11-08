import React from 'react';
import { Menu } from 'antd';
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
    <Menu className="siteBarLayout" mode="inline" openKeys={openKeys} onOpenChange={onOpenChange} style={{ width: 256, height: 920}}>
      <SubMenu key="sub1" icon={<UserOutlined />} title="Account">
        <Menu.Item key="1">Option 1</Menu.Item>
        <Menu.Item key="2">Option 2</Menu.Item>
        <Menu.Item key="3">Option 3</Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" icon={<TeamOutlined />} title="Manage">
        <Menu.Item key="4">Option 4</Menu.Item>
        <Menu.Item key="5">Option 5</Menu.Item>
        <SubMenu key="sub3" title="Submenu">
          <Menu.Item key="6">Option 6</Menu.Item>
          <Menu.Item key="7">Option 7</Menu.Item>
        </SubMenu>
      </SubMenu>
      <SubMenu key="sub4" icon={<PieChartOutlined />} title="Summary">
        <Menu.Item key="8">Option 8</Menu.Item>
        <Menu.Item key="9">Option 9</Menu.Item>
        <Menu.Item key="10">Option 10</Menu.Item>
      </SubMenu>
      <SubMenu key="sub4" icon={<QuestionCircleOutlined />} title="Bot">
        <Menu.Item key="11">Option 11</Menu.Item>
        <Menu.Item key="12">Option 12</Menu.Item>
        <Menu.Item key="13">Option 13</Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default Sider;

