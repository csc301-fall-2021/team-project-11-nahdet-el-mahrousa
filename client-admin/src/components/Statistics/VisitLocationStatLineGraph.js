import React from 'react';
import { Line } from '@ant-design/charts';
import { requestGetVisitsStats } from "actions/Statistics"
import { message, Col, Row, Typography, Space, DatePicker } from 'antd'
const { Title } = Typography
const { RangePicker } = DatePicker;


const defaultDateRange = {
  startDate: "2021-11-25",
  endDate: (new Date()).toISOString().split('T')[0]
}

// Reference: https://charts.ant.design/zh/examples/line/multiple#line-label
class VisitLocationStatLineGraph extends React.Component {
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
      const data = await requestGetVisitsStats(params)
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

      this.fetch(params)
    } catch (error) {
      this.fetch(defaultDateRange)
    }
  }

  config = {
    xField: 'date',
    yField: 'visit',
    seriesField: 'location',
    xAxis: {
      type: 'time',
    },
    yAxis: {
      title: {
        text: "# Visitors"
      }
    },
    legend: {
      position: 'top',
    },
    // smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
  };


  render() {
    return (
      <Col span={24}>
        <Space direction="vertical" size={6} style={{ width: "100%" }}>
          <Title level={2}>Visitor trends</Title>
          {/* <Space> */}

          <RangePicker
            onChange={this.selectDate}
            format="YYYY-MM-DD"
          />

          <Line
            data={this.props.data}
            loading={this.state.loading}
            {...this.config}
          />
        </Space>

      </Col>

    )
  }
}

export default VisitLocationStatLineGraph;