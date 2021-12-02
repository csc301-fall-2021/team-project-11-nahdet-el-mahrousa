import React from 'react';
import { Column } from '@ant-design/charts';
import { requestGetAvgStayTime } from "actions/Statistics"
import { message, Col, Row, Typography, Space, DatePicker, Select } from 'antd'
const { Title } = Typography
const { RangePicker } = DatePicker;

const defaultDateRange = {
    startDate: "2021-11-25",
    endDate: (new Date()).toISOString().split('T')[0]
}


class AvgStayTimeStatColumnGraph extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            ...defaultDateRange,

        }
    }

    componentWillMount() {
        this.fetch()
    }

    /**
     * Fetch workflow data from server.
     * @param {*} params 
     */
    fetch = async (params = { startDate: this.state.startDate, endDate: this.state.endDate }) => {
        this.setState({ loading: true })
        try {
            const data = await requestGetAvgStayTime({...params, from: "location"})
            this.props.setData(data)
            this.setState({
                loading: false
            })
        } catch (error) {
            message.error(String(error))
            this.setState({
                loading: false,
            })
        }
    }

    /**
     * Update date range, and fetch for new data.
     * @param {} value 
     */
    selectDate = (value) => {
        try {
            const [startTime, endTime] = value
            const startDate = startTime.format("YYYY-MM-DD")
            const endDate = endTime.format("YYYY-MM-DD")

            this.setState({ startDate, endDate })
            this.fetch({ startDate, endDate })
        } catch (error) {
            this.fetch(defaultDateRange)
        }
    }

    config = {
        xField: 'location',
        yField: 'averagePageDuration',
        yAxis: {
            title: {
                text: "Page Duration"
            }
        },
        legend: {
            position: 'top',
        },
    };


    render() {
        return (
            <Col span={24}>
                <Space direction="vertical" size={6} style={{ width: "100%" }}>
                    <Title level={2}>Average Page Stay Time</Title>
                    <RangePicker
                        onChange={this.selectDate}
                        format="YYYY-MM-DD"
                    />

                    <Column
                        data={this.props.data}
                        loading={this.state.loading}
                        {...this.config}
                    />
                </Space>

            </Col>

        )
    }
}

export default AvgStayTimeStatColumnGraph;