import React from "react";
import { Layout, PageHeader, Button } from 'antd';

import Menu from "components/Menu";
import UserTable from "components/User/UserTable";

const { Content } = Layout;


const data = [
    {
        _id: "asddqwd1d12e1",
        name: "Tomas",
        username: "tomas1231"
    },
    {
        _id: "asd121assdqw",
        name: "John",
        username: "john1231"
    },
]

class UsersPage extends React.Component {
    render() {
        return (
            <Layout>
                <Menu />

                <Layout theme="light">
                    <PageHeader
                        // ghost={false}
                        title="Admin Account Management"
                        extra={[
                            <Button key="3">Refresh</Button>,
                            <Button key="1" type="primary">
                                Add new admin
                            </Button>,
                        ]}
                    />

                    <Content style={{ padding: '1rem' }}>
                        <UserTable data={data} />
                    </Content>

                </Layout>

            </Layout>

        );
    }
}

export default UsersPage;
