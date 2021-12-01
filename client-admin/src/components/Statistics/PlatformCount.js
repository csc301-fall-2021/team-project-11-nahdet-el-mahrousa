import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/charts';
import { requestGetPlatformStats } from "actions/Statistics"
import { message } from 'antd'

class PlatformCount extends React.Component {
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
      const data = await requestGetPlatformStats(params)
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
    appendPadding: 10,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
  };

  render () {
    return <Pie data={this.state.data} {...this.config} />;
  }
}

export default PlatformCount;