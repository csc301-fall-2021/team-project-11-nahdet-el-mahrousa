import React from "react";

import ROUTES from "./routes";
import MultiLevelRouter from "./MultiLevelRouter";


/**
 * Refer to: https://www.ryanjyost.com/react-routing/ 
 */
export default class RenderRoutes extends React.Component {
    state = {
        routes: ROUTES
    };

    render() {
        return <MultiLevelRouter routes={this.state.routes} />
    }
}
