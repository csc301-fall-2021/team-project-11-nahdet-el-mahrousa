import React from 'react';
import Login from './Login';

class LoginPage extends React.Component {
  render() {
      return (
          <div className="page home-page">
              <div className="login-page">
                  <Login />
              </div>
          </div>
      )
  }
}

export default LoginPage;

