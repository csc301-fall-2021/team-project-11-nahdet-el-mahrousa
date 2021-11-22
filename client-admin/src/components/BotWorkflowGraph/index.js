import React from 'react';
import { message } from 'antd'
import { FlowAnalysisGraph } from '@ant-design/charts';

import { requestGetBotWorkflow } from 'actions/Bot/workflow';


// Graph configuration
const config = (data) => {
  return {
    height: window.innerHeight - 200,
    width: window.innerWidth - 232,

    nodeCfg: {
      size: [300, 45],
      style: {
        fill: '#e3e3e3',
        stroke: '#e3e3e3',
        // radius: [15, 15, 15, 15],
      },

      title: {
        containerStyle: {
          fill: 'transparent',
        },
        style: {
          fill: '#000',
          fontSize: 12,
        },
      },

      items: {
        containerStyle: {
          fill: '#fff',
        },
        padding: 6,
        style: (cfg, group, type) => {
          const styles = {
            value: {
              fill: '#333',
            },
            text: {
              fill: '#aaa',
            },
          };
          return styles[type];
        },
      },
    },

    edgeCfg: {
      label: {
        style: {
          fill: '#aaa',
          fontSize: 12,
          fillOpacity: 1,
        },
      },

      style: (edge) => {
        const stroke = "green";
        return {
          stroke,
          // TODO: can make lineWidth popularity
          lineWidth: 2,
          strokeOpacity: 0.8,
        };
      },
      endArrow: {
        fill: 'green'
      },
    },

    // Marker manages collapse and show
    markerCfg: (cfg) => {
      const { edges } = data;
      return {
        position: 'right',
        show: edges.find((item) => item.source === cfg.id),
        collapsed: !edges.find((item) => item.source === cfg.id),
      };
    },

    layout: {
      rankdir: 'LR',
      /** Number of pixels that separate nodes horizontally in the layout. */
      ranksepFunc: () => 60,
      /** Number of pixels that separate nodes vertically in the layout. */
      nodesepFunc: () => 10,
    },

    behaviors: ['drag-canvas', 'scroll-canvas', 'zoom-canvas'],
  };
}

// Reference: https://charts.ant.design/zh/examples/relation-graph/flow-analysis-graph#line-style
class BotWorkflowGraph extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      data: { nodes: [], edges: [] },
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
      const data = await requestGetBotWorkflow(params)
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

  render() {
    return <FlowAnalysisGraph data={this.state.data} {...config(this.state.data)} />;
  }

};

export default BotWorkflowGraph