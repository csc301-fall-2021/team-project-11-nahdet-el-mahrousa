import React from 'react';
import { Column } from '@ant-design/charts';
import { requestGetVisitReplyStats, requestGetReplies } from "actions/Statistics"
import { message, Col, Row, Typography, Space, DatePicker, Select } from 'antd'
const { Title } = Typography
const { RangePicker } = DatePicker;
const { Option } = Select

const defaultDateRange = {
    startDate: "2021-11-25",
    endDate: (new Date()).toISOString().split('T')[0]
}


class VisitReplyStatLineGraph extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            data: [],
            ...defaultDateRange,
            replies: [],    // Store all replies from server
            ridArr: ["619eccb110b1965f4b94719e", "619ef869871baaa33b8da9f9", "619efbf9871baaa33b8daaa4"]      // Store the replies to query
        }
    }

    componentWillMount() {
        this.fetch()
        this.fetchReplies()
    }

    /**
     * Fetch workflow data from server.
     * @param {*} params 
     */
    fetch = async (params = { startDate: this.state.startDate, endDate: this.state.endDate }) => {
        this.setState({ loading: true })
        try {
            const data = await requestGetVisitReplyStats(params)
            this.setState({
                data,
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
     * Fetch all replies for selector.
     */
    fetchReplies = async () => {
        try {
            const replies = await requestGetReplies()
            this.setState({ replies })
        } catch (error) {
            message.error(String(error))
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

            const params = { startDate, endDate }
            this.setState({ ...params })

            this.fetch({ ...params, ridArr: this.state.ridArr })
        } catch (error) {
            this.fetch(defaultDateRange)
        }
    }

    /**
     * Select a reply by selector
     * @param {*} value 
     */
    selectReply = (value) => {
        console.log(value)
        this.setState({
            ridArr: value
        })

        this.fetch({
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            ridArr: value
        })
    }

    config = {
        isGroup: true,
        xField: 'location',
        yField: 'visit',
        seriesField: 'reply',
        yAxis: {
            title: {
                text: "# Visitors"
            }
        },
        legend: {
            position: 'top',
        },
    };


    render() {
        return (
            <Col span={10} offset={1}>
                <Space direction="vertical" size={6} style={{ width: "100%" }}>
                    <Title level={2}>Count of Reply by Location</Title>
                    {/* <Space> */}

                    <RangePicker
                        onChange={this.selectDate}
                        format="YYYY-MM-DD"
                    />

                    <Row>
                        {/* Select Replies */}
                        <Select
                            mode="multiple"
                            // size={size}
                            placeholder="Please search for replies"
                            onChange={this.selectReply}
                            style={{ width: '100%' }}
                        >
                            {/* Reply Data */}
                            {this.state.replies.map((reply, i) => {
                                return (
                                    <Option key={reply._id} value={reply._id}>
                                        {(reply._id + " ") + (reply.label !== "" ? reply.label + ": " : "") + reply.content}
                                    </Option>
                                )
                            })
                            }
                        </Select>
                    </Row>

                    <Column
                        data={this.state.data}
                        loading={this.state.loading}
                        {...this.config}
                    />
                </Space>

            </Col>

        )
    }
}

export default VisitReplyStatLineGraph;