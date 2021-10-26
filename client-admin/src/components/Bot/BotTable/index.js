import React from 'react';
import { Table, Badge, Menu, Dropdown, Space } from 'antd';

import { DownOutlined } from '@ant-design/icons';



class BotTable extends React.Component{


NestedTable() {
    const data = this.props.data
    const expandedRowRender = (data) => {
      const columns = [
        { title: 'Response', dataIndex: 'content', key: 'content' },
        { title: 'To Msg', dataIndex: 'toMessage', key: 'toMessage' },
        {
          title: 'Action',
          dataIndex: 'operation',
          key: 'operation',
          render: () => (
            <Space size="middle">
              <a>EDIT</a>
              <a>DELETE</a>
            </Space>
          ),
        },
      ];
      return <Table columns={columns} dataSource={data.replies} pagination={false} />;
    };
  
    const columns = [
      { title: 'ID',  render: (data) => <span>{data.message._id}</span> },
      { title: 'Question', render: (data) => <span>{data.message.content}</span>},
      { title: 'Action', key: 'operation', render: () => (
        <Space size="middle">
          <a>EDIT</a>
          <a>DELETE</a>
          <a>NEW OPTION</a>
        </Space>
      ), },
    ];
    return (
        <Table
          className="components-table-demo-nested"
          columns={columns}
          expandable={{ expandedRowRender }}
          dataSource={data}
          pagination={{ position: ['topLeft', 'bottomRights'] }}
        />
      );
}
render() {
    return this.NestedTable()
}
}

export default BotTable;