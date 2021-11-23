import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import HomePage from "pages/Home";
import BotPage from "pages/Database/Bot";
import AdminAccountsPage from "pages/Database/AdminAccounts";
import StatisticsPage from "pages/Statistics";
import LoginPage from "pages/Login";

const GuardedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        getAuthorization() === true
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
)

function getAuthorization() {
    console.log(localStorage.getItem('token'))
    if (localStorage.getItem('token') && localStorage.getItem('token') !== ''){
        console.log('hello')
      return true;
    }
    return false;
}

export default class RenderRoutes extends React.Component {
    render() {
        return (
            // <Switch>
            //     {/* HOME */}
            //     <Route exact path="/login" render={(props) => <LoginPage {...props} />} />

            //     <GuardedRoute path='/' component={ HomePage }/>

            //     {/* DATABASES */}

            //     <GuardedRoute path='/database/bot' component={ BotPage }/>

            //     <GuardedRoute path='/database/admin' component={ AdminAccountsPage }/>

            //     {/* Statistics */}
            //     <GuardedRoute path='/statistics' component={ StatisticsPage }/>

            //     {/* NOT FOUND */}
            //     <Route component={() => <h1>Not Found!</h1>} />
            // </Switch>
            <Switch>
                {/* HOME */}
                <Route exact path="/" render={(props) => <HomePage {...props} />} />

                <Route exact path="/login" render={(props) => <LoginPage {...props} />} />

                {/* DATABASES */}
                <Route exact path="/database/bot" render={(props) => <BotPage {...props} />} />
                <Route exact path="/database/admin" render={(props) => <AdminAccountsPage {...props} />} />

                {/* Statistics */}
                <Route exact path="/statistics" render={(props) => <StatisticsPage {...props} />} />

                {/* NOT FOUND */}
                <Route component={() => <h1>Not Found!</h1>} />
            </Switch>

        )
    }
}


