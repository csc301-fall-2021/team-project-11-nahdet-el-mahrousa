import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import HomePage from "pages/Home";
import BotPage from "pages/Database/Bot";
import AdminAccountsPage from "pages/Database/AdminAccounts";
import StatisticsPage from "pages/Statistics";
import LoginPage from "pages/Login";

const GuardedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem('token') && localStorage.getItem('token') !== '' // If has a credential
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
)


export default class RenderRoutes extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/login" render={(props) => <LoginPage {...props} />} />

                {/* DATABASES */}

                <GuardedRoute path='/database/bot' component={ BotPage }/>

                <GuardedRoute path='/database/admin' component={ AdminAccountsPage }/>

                {/* Statistics */}
                <GuardedRoute path='/statistics' component={ StatisticsPage }/>

                {/* HOME */}
                <GuardedRoute path='/' component={ HomePage }/>

                {/* NOT FOUND */}
                <Route component={() => <h1>Not Found!</h1>} />
            </Switch>

        )
    }
}