import React from 'react';
import Login from "components/Login"
import Menu from "components/Menu";

class HomePage extends React.Component {
    render() {
        return (
            <div className="page home-page">
                <div className="main-view home-main">
                    <Login />
                </div>
                <div className="map-view home-map">

                </div>
            </div>
        )
    }
}

export default HomePage;