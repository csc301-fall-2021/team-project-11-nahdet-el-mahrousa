import React from 'react';
import { Table,Space } from 'antd';



class BotSubTable extends React.Component{
render() {
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
    return <Table rowKey={(record) => record._id} columns={columns} dataSource={this.props.data.replies} pagination={false} />;
}
}
export default BotSubTable;