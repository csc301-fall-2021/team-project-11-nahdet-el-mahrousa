import React from 'react';
import BotSubTable from '../BotSubTable'
import { MessageOptionMenu } from '../BotModal'
import { Table, Badge, Menu, Dropdown, Space } from 'antd';

import { DownOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';


class BotTable extends React.Component{

NestedTable() {

    const data = this.props.data
    const expandedRowRender = (data) => {
      return <BotSubTable data={data}></BotSubTable>
    };

    const columns = [
      { title: 'ID',  render: (data) => <span>{data.message._id}</span> },
      { title: 'Question', render: (data) => <span>{data.message.content}</span>},
      { title: 'Action', key: 'operation', render: (data) => (
        <MessageOptionMenu msgId={data.message._id}></MessageOptionMenu>
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