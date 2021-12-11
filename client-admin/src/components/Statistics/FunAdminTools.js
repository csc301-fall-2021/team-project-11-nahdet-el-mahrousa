import React from 'react';
import { Link } from 'react-router-dom';
import {
    UserOutlined,
    TeamOutlined,
    RobotOutlined
} from "@ant-design/icons";
import { Col, Row, Card, Space, Statistic, Typography } from 'antd'
const { Title } = Typography

// Reference: https://charts.ant.design/zh/examples/line/multiple#line-label
class FunAdminTools extends React.Component {
    render() {
        return (
            <Col span={24}>
                <Space direction="vertical" size={6} style={{ width: "100%" }}>
                    <Row>
                        <Col span={10}>
                            <Link to={"database/bot"}>
                                <Card><Title level={3}>
                                    <RobotOutlined style={{ marginRight: "1rem" }} />
                                    Bot Workflow
                                </Title>
                                </Card>
                            </Link>
                        </Col>
                        <Col span={10} offset={1}>
                            <Link to={"database/admin"}>
                                <Card>
                                    <Title level={3}>
                                    <TeamOutlined style={{ marginRight: "1rem" }} />
                                    Admin Accounts
                                    </Title>
                                </Card>
                            </Link>
                        </Col>
                    </Row>
                </Space>
            </Col>

        )
    }
}

export default FunAdminTools;