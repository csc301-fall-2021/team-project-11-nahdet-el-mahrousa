import React from 'react';
import Sider from "components/Menu";
import AreaDemoPie from 'components/Bot/Summary/AreaDemoPie';
import StageDemoPie from 'components/Bot/Summary/StageDemoPie';
import VisitByLocationLines from 'components/Bot/Summary/VisitByLocationLines'
import VisitByLocationChart from 'components/Bot/Summary/VisitByLocationChart'
import VisitByQuestionChart from 'components/Bot/Summary/VisitByQuestionChart'
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
                    <Sider />
                </Layout>
                </div>
            </div>
        )
    }
}

export default HomePage;