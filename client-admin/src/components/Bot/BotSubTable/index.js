import React from 'react';
import { Table,Space } from 'antd';
import { ReplyOptionMenu } from '../BotSubModal ';


class BotSubTable extends React.Component{

render() {

    const columns = [
      { title: 'Response', dataIndex: 'content', key: 'content' },
      { title: 'To Msg', dataIndex: 'toMessage', key: 'toMessage' },
      {
        title: 'Action',
        key: '_id',
        render: (data) => (
          <ReplyOptionMenu data={data}></ReplyOptionMenu>
        ),
      },
    ];
    return <Table rowKey={(record) => record._id} columns={columns} dataSource={this.props.data.replies} pagination={false} />;
}
}
export default BotSubTable;