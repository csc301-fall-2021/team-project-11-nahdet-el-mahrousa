import React from "react";
import { Alert } from "antd";

class BotWarning extends React.Component {
  render() {
    if (this.props.displayWarning || this.props.displayReplyWarning) {
      return <Alert message="Warning, missing content" type="warning" />;
    } else {
      return <div></div>;
    }
  }
}
export default BotWarning;
