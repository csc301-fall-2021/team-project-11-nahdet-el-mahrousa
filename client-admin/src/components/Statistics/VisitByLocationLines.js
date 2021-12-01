import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Line } from '@ant-design/charts';
import { requestGetVisitsStats } from "actions/Statistics"
import { message } from 'antd'

class VisitByLocationLines extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      data: [],
    }
  }

  componentWillMount() {
    this.fetch()
  }

  /**
   * Fetch workflow data from server.
   * @param {*} params 
   */
   fetch = async (params = {}) => {
    this.setState({ loading: true })
    try {
      const data = await requestGetVisitsStats(params)
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

  config = {
    xField: 'date',
    yField: 'visit',
    seriesField: 'location',
    xAxis: {
      label: {
        type: 'time',
      }
    },
    yAxis: {
      label: {
        type: "number"
      },
    },
    legend: {
      position: 'top',
    },
    smooth: true,
  };

  render () {
    return <Line data={this.state.data} {...this.config} />;
  }
}

export default VisitByLocationLines;