import React from "react";
import { BrowserRouter } from 'react-router-dom';
import RenderRoutes from "./router";
import 'antd/dist/antd.css'; 


class App extends React.Component {
  render() {
    console.log(process.env.REACT_APP_NAME)
    return (
      <BrowserRouter>
        <RenderRoutes />
      </BrowserRouter>
    );
  }
}

export default App;