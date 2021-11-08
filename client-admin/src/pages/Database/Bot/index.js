import React from "react";
import Messages from "../../../components/Bot/BotMessages/messages";
import { getMessageFromBackend } from "../../../actions/Bot/index";
import { AddNewMessageButton } from "../../../components/Bot/NewMessageModal/index";
import Sider from "components/Menu";

class BotPage extends React.Component {
  render() {
    getMessageFromBackend();
    return (
      <div>
        <Sider />
        <h1>Bot PAGE</h1>
        <AddNewMessageButton></AddNewMessageButton>
        <div className="container">
          <Messages></Messages>
        </div>
      </div>
    );
  }
}

export default BotPage;
