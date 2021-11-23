import React from "react";
import { Layout, PageHeader, Button } from 'antd';
import { Redirect } from "react-router-dom"
import Menu from "components/Menu";
import AdminAccountsTable from "components/AdminAccounts/AdminAccountsTable";
import CreateAdminDrawer from "components/AdminAccounts/CreateAdminDrawer";

const { Content } = Layout;


class UsersPage extends React.Component {
    state = {
        tableRefresher: false
    }

    // Force Re-rendering Reference: https://www.freecodecamp.org/news/force-refreshing-a-react-child-component-the-easy-way-6cdbb9e6d99c/
    refreshTable = () => {
        this.setState({ tableRefresher: !this.state.tableRefresher })
    }
    render() {
        return (
            <Layout>
                <Menu />

                <Layout theme="light">
                    <PageHeader
                        // ghost={false}
                        title="Admin Account Management"
                        extra={[
                            <Button key="3" onClick={this.refreshTable} >Refresh</Button>,
                            <CreateAdminDrawer />
                        ]}
                    />

                    <Content style={{ padding: '1rem' }}>
                        <AdminAccountsTable refresh={this.state.tableRefresher} />
                    </Content>

                </Layout>

            </Layout>

        );
    }
}

export default UsersPage;
