import React from "react";
import { BrowserRouter } from 'react-router-dom';
import RenderRoutes from "./router";
import "./App.scss";


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <RenderRoutes />
      </BrowserRouter>
    );
  }
}

export default App;
