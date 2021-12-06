import React from 'react'
import { Space, Row, Col } from 'antd'
import { Layout, PageHeader, Typography } from 'antd'

import Menu from "components/Menu";

import WeeklyVisitStat from 'components/Statistics/WeeklyVisitStat'
import VisitLocationStatLineGraph from 'components/Statistics/VisitLocationStatLineGraph'
import VisitReplyStatColumnGraph from 'components/Statistics/VisitReplyStatColumnGraph'
import PlatformStatPieGraph from 'components/Statistics/PlatformStatPieGraph'
import AvgStayTimeStatColumnGraph from 'components/Statistics/AvgStayTimeStatColumnGraph'
import FunAdminTools from 'components/Statistics/FunAdminTools';

const { Content } = Layout
const { Title } = Typography


class StatisticsPage extends React.Component {
    state = {
        platformStat: [],
        visitLocationStat: [],
        visitReplyStat: [],
        weeklyVisit: {},
        avgStayTimeStat: [],
    }

    render() {
        return (
            <Layout>
                <Menu />

                <Layout theme="light" style={{ marginLeft: 200, minHeight: "100vh" }}>
                    <PageHeader title="Welcome to Admin Dashboard for NM Bot!" />

                    <Content style={{ padding: '2rem' }}>
                        <Row style={{ marginBottom: '3rem' }}>
                            <Col span={10} offset={1}>
                                <Row style={{ marginBottom: '3rem' }}>
                                    <FunAdminTools />
                                </Row>
                                <Row>
                                    <WeeklyVisitStat
                                        data={this.state.weeklyVisit}
                                        setData={data => this.setState({ weeklyVisit: data })}
                                    />
                                </Row>
                            </Col>
                            <Col span={10} offset={1}>
                                <VisitLocationStatLineGraph
                                    data={this.state.visitLocationStat}
                                    setData={data => this.setState({ visitLocationStat: data })}
                                />
                            </Col>
                        </Row>

                        <Row style={{ marginBottom: '3rem' }}>
                            <Col span={22} offset={1}>
                                <VisitReplyStatColumnGraph
                                    data={this.state.visitReplyStat}
                                    setData={data => this.setState({ visitReplyStat: data })}
                                />
                            </Col>
                        </Row>

                        <Row style={{ marginBottom: '3rem' }}>
                            <Col span={10} offset={1}>
                                <AvgStayTimeStatColumnGraph
                                    data={this.state.avgStayTimeStat}
                                    setData={data => this.setState({ avgStayTimeStat: data })}
                                />
                            </Col>
                            <Col span={10} offset={1}>
                                <PlatformStatPieGraph
                                    data={this.state.platformStat}
                                    setData={data => this.setState({ platformStat: data })}
                                />
                            </Col>
                        </Row>

                    </Content>

                </Layout>

            </Layout>
        )
    }
}

export default StatisticsPage;