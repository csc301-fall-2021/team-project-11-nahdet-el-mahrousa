import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";

class Menu extends React.Component {
  render() {
    return (
      <div className="navbar">
        <Link className="nav-item" to="/">
          HOME
        </Link>
        <Link className="nav-item" to={`/database/bot`}>
          Bot
        </Link>
      </div>
    );
  }
}

export default Menu;
