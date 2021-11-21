import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/charts';

const AreaDemoPie = () => {
    const data = [
      {
        type: 'A',
        value: 13,
      },
      {
        type: 'B',
        value: 14,
      },
      {
        type: 'C',
        value: 18,
      },
      {
        type: 'D',
        value: 15,
      },
      {
        type: 'E',
        value: 22,
      },
      {
        type: 'F',
        value: 6,
      },
      {
        type: 'G',
        value: 12,
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

  
export default AreaDemoPie; 