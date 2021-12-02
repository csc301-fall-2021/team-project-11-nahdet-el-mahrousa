import React from 'react';
import DatePick from 'components/DatePicker/DatePicker'
import VisitLocationStatLineGraph from 'components/Statistics/VisitLocationStatLineGraph'
import VisitReplyStatColumnGraph from 'components/Statistics/VisitReplyStatColumnGraph';
import PlatformStatPieGraph from 'components/Statistics/PlatformStatPieGraph';
// import VisitByLocationChart from 'components/Statistics/VisitByLocationChart'
// import VisitByReplyChart from 'components/Statistics/VisitByReplyChart'
// import VisitByLocationReplyChart from 'components/Statistics/VisitByLocationReplyChart';
// import PlatfromCount from 'components/Statistics/PlatformCount';
// import PlatformLocationChart from 'components/Statistics/PlatformLocation';
// import PlatformReplyChart from 'components/Statistics/PlatformReply';
import Menu from "components/Menu";
// import './index.css'
import { DatePicker, Space, Row, Col } from 'antd';

/*function onChange(date, dateString) {
  console.log(date, dateString);
}*/
import { Layout, PageHeader } from 'antd';

const { Content } = Layout;
const { RangePicker } = DatePicker;

class StatisticsPage extends React.Component {

    render() {
        return (
            <Layout>
                <Menu />

                <Layout theme="light" style={{ marginLeft: 200, minHeight: "100vh" }}>
                    <PageHeader title="NM Bot Statistics" />

                    <Content style={{ padding: '2rem' }}>
                        <Row style={{ marginBottom: '2rem' }}>
                            <PlatformStatPieGraph />
                            <VisitLocationStatLineGraph />

                        </Row>

                        <Row style={{ marginBottom: '2rem' }}>
                            <VisitReplyStatColumnGraph />
                        </Row>

                        <Row style={{ marginBottom: '2rem' }}>

                        </Row>

                        {/* <div className="summary-section">
                            <DatePick />
                            <div>The amount of visit for a question from different locations</div>
                            <VisitByLocationChart />
                        </div>
                        <div className="summary-section">
                            <DatePick />
                            <div>The amount of visit of all types of questions at one location</div>
                            <VisitByReplyChart />
                        </div>
                        <div className="summary-section">
                            <DatePick />
                            <div>The amount of visit for a reply from different locations</div>
                            <VisitByLocationReplyChart />
                        </div>
                        <div className="summary-section">
                            <DatePick />
                            <div>The percentage comparsion between users used mobile or computer devices</div>
                            <PlatfromCount />
                        </div>
                        <div className="summary-section">
                            <DatePick />
                            <div>The comparsion between users used mobile or computer devices at one location</div>
                            <PlatformLocationChart />
                        </div>
                        <div className="summary-section">
                            <DatePick />
                            <div>The comparsion between users used mobile or computer devices with replys they are interested</div>
                            <PlatformReplyChart />
                        </div> */}
                    </Content>

                </Layout>

            </Layout>
        )
    }
}

export default StatisticsPage;