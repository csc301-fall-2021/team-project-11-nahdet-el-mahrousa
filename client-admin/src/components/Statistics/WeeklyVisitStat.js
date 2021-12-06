import React from 'react';
import { requestWeeklyVisitStat } from "actions/Statistics"
import { message, Col, Row, Card, Space, Statistic, Typography } from 'antd'
const { Title } = Typography

// Reference: https://charts.ant.design/zh/examples/line/multiple#line-label
class WeeklyVisitStat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
        }
    }

    componentWillMount() {
        this.fetch()
    }

    /**
     * Fetch workflow data from server.
     * @param {*} params 
     */
    fetch = async () => {
        this.setState({ loading: true })
        try {
            // console.log(params)
            const data = await requestWeeklyVisitStat()
            this.props.setData(data)

            this.setState({
                // data,
                loading: false
            })
        } catch (error) {
            message.error(String(error))
            this.setState({
                loading: false,
            })
        }
    }

    render() {
        return (
            <Col span={24}>
                <Space direction="vertical" size={6} style={{ width: "100%" }}>
                    <Title level={2}>Weekly Statistics</Title>
                    <Row>
                        <Col span={10}>
                            <Card>
                                <Statistic title="Visitors since last week" value={this.props.data.sum} loading={this.state.loading} />
                            </Card>
                        </Col>
                        <Col span={10} offset={1}>
                            <Card>
                                <Statistic title="Most visitors since last week are from" value={this.props.data.maxLocation} loading={this.state.loading} />
                                <Statistic title="Number of visitors from there" value={this.props.data.maxLocationVisits} loading={this.state.loading} />
                            </Card>
                        </Col>
                    </Row>
                </Space>
            </Col>

        )
    }
}

export default WeeklyVisitStat;