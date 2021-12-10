import React from "react";
import { useSelector } from "react-redux";
import BotTable from "../BotTable";

class BotMessages extends React.Component {
  render() {
    // use BotTable component and pass in data
    return <BotTable data={this.props.data}></BotTable>;
  }
}

export default () => {
  const data = useSelector((state) => {
    return state.surveyData.messages;
  });
  // use BotMessage component and pass in data
  return <BotMessages data={data} />;
};