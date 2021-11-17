import React from 'react';
import Menu from "components/Menu";
import { Layout } from 'antd';
const { Header, Content } = Layout;
// import { UserOutlined } from "@ant-design/icons";
// const { Meta } = Card;
class HomePage extends React.Component {
    render() {
        return (
            <Layout>
                <Menu />

                <Layout theme="light">

                    <Header style={{ "backgroundColor": "white" }}><h1>Admin Dashboard for NM Bot</h1></Header>

                    <Content style={{ padding: '1rem' }}>
                        
                    </Content>

                </Layout>

            </Layout>
        )
    }
}

export default HomePage;