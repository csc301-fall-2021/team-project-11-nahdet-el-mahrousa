import React from "react";
import { Table } from "antd";
import ReplyOptionMenu from "../BotReplyOptionMenu";

class BotSubTable extends React.Component {
  render() {
    // display reply ID, Reply, Label, Next Message, and Actions
    const columns = [
      {
        title: "Reply ID",
        dataIndex: "_id",
        key: "_id",
        width: "220px",
      }, {
        title: "Reply",
        dataIndex: "content",
        key: "content"
      }, {
        title: "Label",
        dataIndex: "label",
        key: "label",
        width: "250px",
      }, {
        title: "Next Message",
        dataIndex: "toMessage",
        key: "toMessage",
        width: "220px",
      }, {
        title: "Actions",
        key: "_id",
        render: (data) => (
          // call ReplyOptionMenu component
          <ReplyOptionMenu
            data={data}
            msgList={this.props.msgList}
          ></ReplyOptionMenu>
        ),
      },
    ];
    return (
      // use Table component to display replies
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
