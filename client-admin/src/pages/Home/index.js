import React from 'react';
import Menu from "components/Menu";
import { Layout, PageHeader } from 'antd';
const { Content } = Layout;
// import { UserOutlined } from "@ant-design/icons";
// const { Meta } = Card;
class HomePage extends React.Component {
    render() {
        return (
            <Layout>
                <Menu />

                <Layout theme="light" style={{ marginLeft: 200, minHeight: "100vh" }}>

                    <PageHeader title="Admin Dashboard for NM Bot" />

                    <Content style={{ padding: '1rem' }}>
                        
                    </Content>

                </Layout>

            </Layout>
        )
    }
}

export default HomePage;