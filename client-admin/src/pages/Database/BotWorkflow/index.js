import React from "react";
import { Layout, PageHeader, Button } from 'antd';

import Menu from "components/Menu";
import BotWorkflowGraph from "components/BotWorkflowGraph";

const { Content } = Layout;


class BotWorkflowPage extends React.Component {
    // state = {
    //     tableRefresher: false
    // }

    // Force Re-rendering Reference: https://www.freecodecamp.org/news/force-refreshing-a-react-child-component-the-easy-way-6cdbb9e6d99c/
    // refreshTable = () => {
    //     this.setState({ tableRefresher: !this.state.tableRefresher })
    // }

    render() {
        return (
            <Layout>
                <Menu />

                <Layout theme="light">
                    <PageHeader
                        // ghost={false}
                        title="Bot Workflow"
                        // extra={[
                        //     <Button key="3" onClick={this.refreshTable} >Refresh</Button>,
                        //     <CreateAdminDrawer />
                        // ]}
                    />

                    <Content style={{ padding: '1rem' }}>
                        <BotWorkflowGraph />
                    </Content>

                </Layout>

            </Layout>

        );
    }
}

export default BotWorkflowPage;
