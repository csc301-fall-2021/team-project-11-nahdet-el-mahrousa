import React from "react";
import BotSubTable from "../BotSubTable";
import MessageOptionMenu from "../BotMessageOptionMenu";
import { Table } from "antd";

class BotTable extends React.Component {
  NestedTable() {
    const data = this.props.data;
    const msgList = this.props.data.map((entity) => {
      return entity.message;
    });
    const expandedRowRender = (data) => {
      return <BotSubTable data={data} msgList={msgList} />;
    };

    // display reply ID, Reply, Label, Next Message, and Actions
    const columns = [
      {
        title: "Message ID",
        key: '_id',
        width: "220px",
        render: (data) => <span>{data.message._id}</span>,
      },
      {
        title: "Question",
        key: 'content',
        // width: "450px",
        render: (data) => <span>{data.message.content}</span>,
        sorter: (a, b) => a.message.content < b.message.content,
        sortDirections: ['ascend', 'descend'],
      },
      {
        title: "Label",
        key: 'label',
        width: "250px",
        render: (data) => <span>{data.message.label}</span>,
        sorter: (a, b) => a.message.label < b.message.label,
        sortDirections: ['ascend', 'descend'],
      },
      {
        // display actions that can be made
        title: "Actions",
        key: "operation",
        // use MessageOptionMenu component
        render: (data) => (
          <MessageOptionMenu
            msg={data.message}
            msgList={msgList}
          />
        ),
      },
    ];

    return (
      <div>
        <Table
          rowKey={(record) => record.message._id}
          className="components-table-demo-nested"
          columns={columns}
          expandable={{ expandedRowRender }}
          dataSource={data}
        // pagination={{ position: ["bottomRights"] }}
        />
      </div>
    );
  }
  render() {
    return this.NestedTable();
  }
}

export default BotTable;
