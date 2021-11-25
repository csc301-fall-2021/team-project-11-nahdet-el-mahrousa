import React from 'react';
import StageDemoPie from 'components/Statistics/StageDemoPie';
import VisitByLocationLines from 'components/Statistics/VisitByLocationLines'
import VisitByLocationChart from 'components/Statistics/VisitByLocationChart'
import VisitByQuestionChart from 'components/Statistics/VisitByQuestionChart'
import Menu from "components/Menu";
import { Layout } from 'antd';
import './index.css'
const { Header, Content } = Layout;


class StatisticsPage extends React.Component {
    render() {
        return (
            <Layout>
                <Menu />

                <Layout theme="light">

                    <Header style={{ "backgroundColor": "white" }}><h1>NM Bot Statistics</h1></Header>

                    <Content style={{ padding: '1rem' }}>
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
                    </Content>

                </Layout>

            </Layout>
        )
    }
}

export default StatisticsPage;