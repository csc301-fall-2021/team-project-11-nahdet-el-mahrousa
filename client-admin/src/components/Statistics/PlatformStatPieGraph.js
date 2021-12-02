import React from 'react';
import { Pie } from '@ant-design/charts';
import { requestPlatformStat } from "actions/Statistics"
import { message, Col, Row, Typography, Space, DatePicker } from 'antd'
const { Title } = Typography
const { RangePicker } = DatePicker;


const defaultDateRange = {
  startDate: "2021-11-25",
  endDate: (new Date()).toISOString().split('T')[0]
}

// Reference: https://charts.ant.design/zh/examples/line/multiple#line-label
class PlatformStatPieGraph extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      data: [],
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
      // console.log(params)
      const data = await requestPlatformStat(params)
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
    angleField: 'user',
    colorField: 'platform',
    seriesField: 'location',
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}\n{percentage}',
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
      <Col span={10} offset={1}>
        <Space direction="vertical" size={6} style={{ width: "100%" }}>
          <Title level={2}>Visitor Platforms</Title>
          {/* <Space> */}

          <RangePicker
            onChange={this.selectDate}
            format="YYYY-MM-DD"
          />

          <Pie
            data={this.state.data}
            loading={this.state.loading}
            {...this.config}
          />
        </Space>

      </Col>

    )
  }
}

export default PlatformStatPieGraph;