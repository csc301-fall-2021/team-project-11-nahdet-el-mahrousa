import React from 'react';
import { Table, Space, Popconfirm, Button, message } from 'antd';

/**
 * A button to delete a user, with confirmation.
 * Button Reference: https://ant.design/components/popconfirm-cn/#components-popconfirm-demo-async
 */
class DeleteButton extends React.Component {
    state = {
        visible: false,
        confirmLoading: false
    }

    handleOk = () => {
        this.setState({ confirmLoading: true })
        console.log('deleting ', this.props.target)
        // TODO: to async request
        setTimeout(() => {
            this.setState({ visible: false })
            this.setState({ confirmLoading: false })
            message.success("Deleted user")
        }, 2000);
    };

    render() {
        return (
            <Popconfirm
                title="Confirm?"
                visible={this.state.visible}
                onConfirm={this.handleOk}
                okButtonProps={{ loading: this.state.confirmLoading }}
                onCancel={() => this.setState({ visible: false })}
            >
                <Button type="primary" onClick={() => this.setState({ visible: true })}>
                    Delete
                </Button>
            </Popconfirm>
        )
    }
}

// The columns of the table
// To get a field of the data, match dataIndex with the key of data.
const columns = [
    {
        title: 'User ID',
        dataIndex: '_id',
        key: '_id',
        sorter: (a, b) => a._id < b._id,
        // defaultSortOrder: 'descend',
        sortDirections: ['ascend', 'descend'],
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name < b.name,
        sortDirections: ['ascend', 'descend'],
    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        sorter: (a, b) => a.username < b.username,
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (text, record) => (
            <Space size="middle">
                {/* record refers the the user item */}
                <DeleteButton target={record} />
            </Space>
        ),
    },
];


// Layout Reference: https://ant.design/components/table-cn/#components-table-demo-basic
// Fetch Reference: https://ant.design/components/table-cn/#components-table-demo-ajax
class UserTable extends React.Component {
    state = {
        data: this.props.data,
        pagination: {
            current: 1,
            pageSize: 20,
        },
        loading: false,
    };

    /**
     * Change of pagination or sorter
     * @param {*} pagination 
     * @param {*} filters 
     * @param {*} sorter 
     * @param {*} extra 
     */
    onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    render() {
        return (
            <Table
                columns={columns}
                dataSource={this.state.data}
                onChange={this.onChange}
                loading={this.state.loading}
                pagination={this.state.pagination}
            />
        )
    }
}

export default UserTable
