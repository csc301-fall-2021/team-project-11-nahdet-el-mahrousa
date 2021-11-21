import React from 'react';

import FaqView from 'components/FaqView';

import "./LeftMenu.scss";

class LeftMenu extends React.Component {
    render() {
        return (
            <div class="left-menu">
                <div className="brand-container">
                    <div className="brand-name">Nahdet El Mahrousa Enterpreneur Helper</div>
                </div>
                <FaqView />  {/* TODO: Don't need to do this right now */}
            </div>
        )
    }
}

export default LeftMenu;
