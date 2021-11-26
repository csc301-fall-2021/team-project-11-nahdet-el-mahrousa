import React from "react";
import { Layout, PageHeader, Button, Input, Select, } from 'antd';
// import { Redirect } from "react-router-dom"
import Menu from "components/Menu";
import AdminAccountsTable from "components/AdminAccounts/AdminAccountsTable";
import CreateAdminDrawer from "components/AdminAccounts/CreateAdminDrawer";

const { Content } = Layout;
const { Option } = Select;


class UsersPage extends React.Component {
    state = {
        tableRefresher: false,
        searchKey: "username",
        searchValue: ""
    }

    // Force Re-rendering Reference: https://www.freecodecamp.org/news/force-refreshing-a-react-child-component-the-easy-way-6cdbb9e6d99c/
    refreshTable = () => {
        this.setState({ tableRefresher: !this.state.tableRefresher })
    }

    onSearch = (searchValue) => {
        console.log("Searching:", searchValue)
        this.setState({
            searchValue
        })
    }

    onSelectSearchKey = (searchKey) => {
        this.setState({ searchKey })
    }

    render() {
        return (
            <Layout>
                <Menu />

                <Layout theme="light">
                    <PageHeader
                        title="Admin Account Management"
                        extra={[
                            <Button key="3" onClick={this.refreshTable} >Refresh</Button>,
                            <CreateAdminDrawer />
                        ]}
                    />

                    <Content style={{ padding: '1rem' }}>
                        {/* Search bar */}
                        <Input.Group compact>
                            {/* The option keys the user can search from */}
                            <Select defaultValue="username" onChange={this.onSelectSearchKey}>
                                <Option value="_id">User ID</Option>
                                <Option value="username">Username</Option>
                                <Option value="name">Name</Option>
                            </Select>
                            <Input.Search placeholder="Search for a user" allowClear style={{ width: "50%", marginBottom: "1rem" }} onSearch={this.onSearch} />
                        </Input.Group>

                        <AdminAccountsTable refresh={this.state.tableRefresher} query={{ key: this.state.searchKey, value: this.state.searchValue }} />
                    </Content>

                </Layout>

            </Layout>

        );
    }
}

export default UsersPage;
