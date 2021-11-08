import React from "react";
import { Table, Space } from "antd";
import { ReplyOptionMenu } from "../BotSubModal ";

class BotSubTable extends React.Component {
  render() {
    const columns = [
      { title: "Reply", dataIndex: "content", key: "content" },
      { title: "To Message", dataIndex: "toMessage", key: "toMessage" },
      { title: "Label", dataIndex: "label", key: "label" },
      {
        title: "Actions",
        key: "_id",
        render: (data) => (
          <ReplyOptionMenu
            data={data}
            msgList={this.props.msgList}
          ></ReplyOptionMenu>
        ),
      },
    ];
    return (
      <Table
        rowKey={(record) => record._id}
        columns={columns}
        dataSource={this.props.data.replies}
        pagination={false}
      />
    );
  }
}
export default BotSubTable;
