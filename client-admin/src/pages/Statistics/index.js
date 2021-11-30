import React from 'react';
import Menu from "components/Menu";
import { Layout, PageHeader } from 'antd';
const { Header, Content } = Layout;


class StatisticsPage extends React.Component {
    render() {
        return (
            <Layout>
                <Menu />

                <Layout theme="light" style={{ marginLeft: 200, minHeight: "100vh" }}>
                    <PageHeader title="NM Bot Statistics" />

                    <Content style={{ padding: '1rem' }}>

                    </Content>

                </Layout>

            </Layout>
        )
    }
}

export default StatisticsPage;