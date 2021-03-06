import React from 'react';
import img from './img.png';
import FaqView from 'components/FaqView';

import "./LeftMenu.scss";

// Left menu that contains the company title and logo
class LeftMenu extends React.Component {
    render() {
        return (
            <div className="left-menu">
                <div className="brand-container">
                    <div className="brand-name">Nahdet El Mahrousa Enterpreneur Helper</div>
                </div>
                <img className="brand-logo" src={img} alt=""/>
                <FaqView />
            </div>
        )
    }
}

export default LeftMenu;
