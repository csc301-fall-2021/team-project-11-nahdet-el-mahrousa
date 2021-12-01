import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/charts';
import { requestGetVisitsStats } from "actions/Statistics"
import { message } from 'antd'

class VisitByLocationChart extends React.Component {
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
    isGroup: true,
    xField: 'reply',
    yField: 'visit',
    seriesField: 'location',
    // 分组柱状图 组内柱子间的间距 (像素级别)
    dodgePadding: 2,
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'middle', 'bottom'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: 'interval-adjust-position',
        }, // 数据标签防遮挡
        {
          type: 'interval-hide-overlap',
        }, // 数据标签文颜色自动调整
        {
          type: 'adjust-color',
        },
      ],
    },
  }

  render () {
    return <Column data={this.state.data} {...this.config} />;
  }
}

export default VisitByLocationChart