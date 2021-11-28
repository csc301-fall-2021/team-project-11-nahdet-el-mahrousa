import React from 'react';

import LeftMenu from "components/LeftMenu";
import BotView from 'components/BotView';
import "./HomePage.scss";
import ReactGA from "react-ga";
ReactGA.initialize(process.env.REACT_GOOGLE_ANALYTICS_TRACKING_ID);

class HomePage extends React.Component {
    componentDidMount() {
        ReactGA.pageview(window.location.pathname + window.location.search)
    }

    render() {
        return (
            <div>
                <div className="home-page">

                    <div className="left-menu-section">
                        <div className="top-decoration"></div>
                        <LeftMenu />
                    </div>
                    <div className="bot-view-section">
                        <BotView ReactGA={ReactGA} />
                        <div className="bottom-decoration"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage;