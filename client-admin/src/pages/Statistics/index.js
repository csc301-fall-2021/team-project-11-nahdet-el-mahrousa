import React from 'react';
import Menu from "components/Menu";
import { Layout } from 'antd';
const { Header, Content } = Layout;


class StatisticsPage extends React.Component {
    render() {
        return (
            <Layout>
                <Menu />

                <Layout theme="light">

                    <Header style={{ "backgroundColor": "white" }}><h1>NM Bot Statistics</h1></Header>

                    <Content style={{ padding: '1rem' }}>
                        
                    </Content>

                </Layout>

            </Layout>
        )
    }
}

export default StatisticsPage;