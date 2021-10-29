import React from 'react';
import "./index.scss";
import Reply from "components/Reply";

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1,
            border: 0
        }}
    />
);

class Message extends React.Component {

    render() {
        return (
            <div>
                <avatar class="avatar"></avatar>
                <div className="message-container">
                    This is a message.
                    <ColoredLine color = "#E7E7E7" />
                    <button className="option" onclick="makeReply()">
                        Option 1
                    </button>
                    <script>
                        function makeReply() {
                            <Reply />
                        }
                    </script>
                </div>
            </div>
        )
    }
}

export default Message;