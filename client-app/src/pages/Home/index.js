import React from 'react';

import LeftMenu from "components/LeftMenu";
import BotView from 'components/BotView';
import "./HomePage.scss";

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            
            <div class="home-page">
                
                <div className="left-menu-section">
                    <div className="top-decoration"></div>
                    <LeftMenu />
                </div>
                <div className="bot-view-section">
                    <BotView />
                    <div className="bottom-decoration"></div>
                </div>
            </div>
            </div>
        )
    }
}

export default HomePage;