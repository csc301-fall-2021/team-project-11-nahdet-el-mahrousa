
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BotTable from '../BotTable'

class BotMessages extends React.Component{
    render() {
        return  <BotTable data={this.props.data}></BotTable>
    }
}

export default () => {
    const data = useSelector(state => {
        console.log({state})
        return state.surveyData.messages
    })
    return (
        <BotMessages data={data} />
    )
}