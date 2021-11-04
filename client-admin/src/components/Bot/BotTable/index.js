import React from 'react';
import BotSubTable from '../BotSubTable'
import { MessageOptionMenu } from '../BotModal'
import { Table, Badge, Menu, Dropdown, Space } from 'antd';

import { DownOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';
import { createEntityAdapter } from '@reduxjs/toolkit';


class BotTable extends React.Component{

NestedTable() {

    const data = this.props.data
    const msgList = this.props.data.map(entity => {
      return entity.message
    })
    const expandedRowRender = (data) => {
      return <BotSubTable data={data} msgList={msgList}></BotSubTable>
    };

    const columns = [
      { title: 'ID',  render: (data) => <span>{data.message._id}</span> },
      { title: 'Question', render: (data) => <span>{data.message.content}</span>},
      { title: 'Action', key: 'operation', render: (data) => (
        <MessageOptionMenu msg={data.message} msgList={msgList}></MessageOptionMenu>
      ), },
    ];
    return (
        <div>
          <Table
          rowKey={(record) => record.message._id}
          className="components-table-demo-nested"
          columns={columns}
          expandable={{ expandedRowRender }}
          dataSource={data}
          pagination={{ position: ['topLeft', 'bottomRights'] }}
        />
        </div>
      );
}
render() {
    return this.NestedTable()
}
}

export default BotTable;