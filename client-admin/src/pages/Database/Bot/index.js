import React from 'react';
import Messages from '../../../components/Bot/BotMessages/messages'
import { getMessageFromBackend } from '../../../actions/Bot/index'


class BotPage extends React.Component{

    render(){
        getMessageFromBackend()
        return (
            <div>
                <h1>Bot PAGE</h1>
                <div className="container">
                   <Messages></Messages>
                </div>
            </div>
        )
    }
}

export default BotPage;