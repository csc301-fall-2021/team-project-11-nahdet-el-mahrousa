import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "pages/Home";
import BotPage from "pages/Database/Bot";
import UsersPage from "pages/Database/Users";
import StatisticsPage from "pages/Statistics";
import LoginPage from "pages/Login";

export default class RenderRoutes extends React.Component {

    render() {
        return (
            <Switch>
                {/* HOME */}
                <Route exact path="/" render={(props) => <HomePage {...props} />} />

                <Route exact path="/login" render={(props) => <LoginPage {...props} />} />

                {/* DATABASES */}
                <Route exact path="/database/bot" render={(props) => <BotPage {...props} />} />
                <Route exact path="/database/admin" render={(props) => <UsersPage {...props} />} />

                {/* Statistics */}
                <Route exact path="/statistics" render={(props) => <StatisticsPage {...props} />} />

                {/* NOT FOUND */}
                <Route component={() => <h1>Not Found!</h1>} />
            </Switch>
        )
    }
}


