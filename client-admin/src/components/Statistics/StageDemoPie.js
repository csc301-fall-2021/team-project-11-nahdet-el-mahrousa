import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/charts';

const StageDemoPie = () => {
    const data = [
      {
        type: 'Just an Idea',
        value: 40,
      },
      {
        type: 'Beginning Stage',
        value: 20,
      },
      {
        type: 'Starting up',
        value: 30,
      },
      {
        type: 'On the right track',
        value: 10,
      },
    ];
    const config = {
      appendPadding: 10,
      data,
      angleField: 'value',
      colorField: 'type',
      radius: 0.8,
      label: {
        type: 'outer',
      },
      interactions: [
        {
          type: 'element-active',
        },
      ],
    };
    return <Pie {...config} />;
  };

  
export default StageDemoPie; 