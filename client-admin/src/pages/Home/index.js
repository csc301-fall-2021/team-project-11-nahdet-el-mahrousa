import React from 'react';
import Sider from "components/Menu";
import AreaDemoPie from 'components/Bot/Summary/AreaDemoPie';
import StageDemoPie from 'components/Bot/Summary/StageDemoPie';
import { Layout, Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Meta } = Card;

const { Content } = Layout;

class HomePage extends React.Component {
    render() {
        return (
            <div className="page home-page">
                <div className="main-view home-main">
                <Layout>
                    <div>The percentage of people from different area in Egypt</div>
                    <AreaDemoPie />
                    <div>The percentage of different stage</div>
                    <StageDemoPie />
                    {/* <Layout>
                        <Content className="site-layout-background" style={{margin: "24px 16px",padding: 24,minHeight: 280,}}>
                            <Card hoverable style={{ width: 240, height: 200, textAlign:"center"}} >
                                <Avatar size={100} icon={<UserOutlined />} style={{marginBottom: 30}}/>
                                <Meta title="User A"/>
                            </Card>,
                        </Content>
                    </Layout> */}
                </Layout>
                </div>
            </div>
        )
    }
}

export default HomePage;