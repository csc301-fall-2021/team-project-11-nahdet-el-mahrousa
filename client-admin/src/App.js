import React from "react";
import { BrowserRouter } from 'react-router-dom';
import RenderRoutes from "./router";


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
