import React from 'react';
import { Table, Space, Popconfirm, Button, message } from 'antd';

import { requestGetAdminAccounts, requestDeleteAdminAccount } from 'actions/AdminAccounts'
/**
 * A button to delete a user, with confirmation.
 * Button Reference: https://ant.design/components/popconfirm-cn/#components-popconfirm-demo-async
 */
class DeleteButton extends React.Component {
    state = {
        visible: false,
        confirmLoading: false
    }

    handleOk = async () => {
        this.setState({ confirmLoading: true })

        const userToDelete = this.props.target
        console.log('deleting ', userToDelete)
        // TODO: to async request
        try {
            const deletedUser = await requestDeleteAdminAccount(userToDelete)
            this.setState({ visible: false })
            this.setState({ confirmLoading: false })
            message.success(`Deleted user ${deletedUser.username}`)
        } catch (error) {
            this.setState({ confirmLoading: false })
            message.error(String(error))
        }
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
                <Button danger onClick={() => this.setState({ visible: true })}>
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
        width: "220px",
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: "400px",
        sorter: (a, b) => a.name < b.name,
        sortDirections: ['ascend', 'descend'],
    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        width: "400px",
        sorter: (a, b) => a.username < b.username,
        sortDirections: ['ascend', 'descend'],
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
class AdminAccountsTable extends React.Component {
    state = {
        data: [],
        pagination: {
            current: 1,
            pageSize: 2,
        },
        loading: false,
    };

    componentDidMount() {
        const { pagination } = this.state;
        const { query } = this.props;
        this.fetch({ pagination, ...query });
    }

    // Force Re-rendering Reference: 
    // https://www.freecodecamp.org/news/force-refreshing-a-react-child-component-the-easy-way-6cdbb9e6d99c/
    componentWillReceiveProps(props) {
        const { refresh } = this.props;
        if (props.refresh !== refresh) {
            message.info("Refreshing data")
            this.onChange(this.state.pagination)
        }

        console.log(props.query)
        if (props.query !== "") {
            this.searchForData({ ...props.query })
        }
    }

    /**
     * Change of pagination or sorter
     * @param {*} pagination 
     * @param {*} filters 
     * @param {*} sorter 
     * @param {*} extra 
     */
    onChange = (pagination, filters, sorter={field: "_id", order: "ascend"}) => {
        this.fetch({
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination,
            ...filters,
            ...this.props.query
        });
    }

    searchForData = (query) => {
        this.fetch({
            pagination: this.state.pagination,
            ...query
        })
    }


    fetch = async (params = { key: this.props.query.key, value: this.props.query.value }) => {
        this.setState({ loading: true })
        try {
            let reqParams = { key: params.key, value: params.value }
            console.log("Params: ", params)
            const data = await requestGetAdminAccounts(reqParams)
            this.setState({
                loading: false,
                data: data,
                pagination: {
                    ...params.pagination,
                    total: data.length
                }
            })
        } catch (error) {
            message.error(String(error))
            this.setState({
                loading: false,
            })
        }
    }

    render() {
        return (
            <Table
                columns={columns}
                rowKey={record => record._id}
                dataSource={this.state.data}
                onChange={this.onChange}
                loading={this.state.loading}
                pagination={this.state.pagination}
            />
        )
    }
}

export default AdminAccountsTable
