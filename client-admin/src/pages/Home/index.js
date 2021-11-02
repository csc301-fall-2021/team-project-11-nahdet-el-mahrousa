import React from 'react';
import Menu from "components/Menu";

class HomePage extends React.Component {
    render() {
        return (
            <div className="page home-page">
                <div className="main-view home-main">
                    <Menu />
                </div>
                <div className="map-view home-map">

                </div>
            </div>
        )
    }
}

export default HomePage;