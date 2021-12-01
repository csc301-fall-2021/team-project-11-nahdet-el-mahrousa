import React from 'react';
import DatePick from 'components/DatePicker/DatePicker'
import VisitByLocationLines from 'components/Statistics/VisitByLocationLines'
import VisitByLocationChart from 'components/Statistics/VisitByLocationChart'
import VisitByReplyChart from 'components/Statistics/VisitByReplyChart'
import VisitByLocationReplyChart from 'components/Statistics/VisitByLocationReplyChart';
import PlatfromCount from 'components/Statistics/PlatformCount';
import Menu from "components/Menu";
import './index.css'
import { DatePicker, Space } from 'antd';

/*function onChange(date, dateString) {
  console.log(date, dateString);
}*/
import { Layout, PageHeader } from 'antd';

const { Header, Content } = Layout;
const { RangePicker } = DatePicker;

class StatisticsPage extends React.Component {

    render() {
        return (
            <Layout>
                <Menu />

                <Layout theme="light" style={{ marginLeft: 200, minHeight: "100vh" }}>
                    <PageHeader title="NM Bot Statistics" />

                    <Content style={{ padding: '1rem' }}>
                        <div className="summary-section">
                            <RangePicker
                            onChange={this.onChange} />
                            <div>The overview of people from different area during this period</div>                   
                            <VisitByLocationLines />
                        </div>
                        <div className="summary-section">
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
                            <div>The percentage comparsion between users used mobile or computer devices to access our website</div>
                            <PlatfromCount />
                        </div>
                    </Content>

                </Layout>

            </Layout>
        )
    }
}

export default StatisticsPage;