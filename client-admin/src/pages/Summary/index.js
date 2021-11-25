import React from 'react';
import Sider from "components/Menu";
import StageDemoPie from 'components/Bot/Summary/StageDemoPie';
import VisitByLocationLines from 'components/Bot/Summary/VisitByLocationLines'
import VisitByLocationChart from 'components/Bot/Summary/VisitByLocationChart'
import VisitByQuestionChart from 'components/Bot/Summary/VisitByQuestionChart'
import { Layout, Card, Avatar } from "antd";
import './index.css'

class SummaryPage extends React.Component {
    render() {
        return (
            <div className="page">
                <div className="main-view home-main">
                <Layout>
                    <div className="summary-section">
                        <div>The overview of people from different area</div>
                        <VisitByLocationLines />
                    </div>
                    <div className="summary-section">
                        <div>The percentage of people from different area in Egypt</div>
                        <VisitByLocationChart />
                    </div>
                    <div className="summary-section">
                        <div>The percentage of people from different questions in our website</div>
                        <VisitByQuestionChart />
                    </div>
                    <div className="summary-section">
                        <div>The percentage of different stage</div>
                        <StageDemoPie />
                    </div>
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

export default SummaryPage;