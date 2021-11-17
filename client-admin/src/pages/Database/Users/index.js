import React from "react";

import Menu from "components/Menu";
import { Layout } from 'antd';

import { Redirect } from "react-router-dom"

const { Header, Content } = Layout;

class UsersPage extends React.Component {
    render() {
        return (
            <Layout>
                <Menu />

                <Layout theme="light">

                    <Header style={{ "backgroundColor": "white" }}><h1>Admin Account Management</h1></Header>

                    <Content style={{ padding: '1rem' }}>

                    </Content>

                </Layout>

            </Layout>

        );
    }
}

export default UsersPage;
