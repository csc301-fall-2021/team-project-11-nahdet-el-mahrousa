
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BotTable from '../BotTable'

export function Messages(){
    const data = useSelector(state => {
        console.log({state})
        return state.surveyData.messages
    })
    return  <BotTable data={data}></BotTable>
}