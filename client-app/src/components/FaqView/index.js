import React from 'react';
import "./FaqView.scss";

class FaqView extends React.Component {
    exportFile = () => {
        var result = "";
        if (localStorage.getItem("chatHistory") !== null) {
            var chat = localStorage.getItem("chatHistory").split("\"message\":");
            result += "Date: " + localStorage.getItem("chatTime") + "\n";
            for (var i = 0; i < chat.length; i++) {
                var curr_chat = chat[i];
                if (curr_chat.includes("\"content\":")) {
                    // get bot msg
                    var start_i = curr_chat.indexOf("\"content\":") + 11; // start of the content
                    var end_i = curr_chat.indexOf("\",\"__v\":");
                    var curr_msg = "";
                    for (var j = start_i; j < end_i; j++) {
                        curr_msg += curr_chat[j];
                    }
                    result += "NM Bot: ";
                    if (curr_msg !== null) {
                        var sub_curr_msg = curr_msg.split("\\n");
                        for (var w = 0; w < sub_curr_msg.length; w++) {
                            result += sub_curr_msg[w];
                        }
                    }
                    result += "\n";

                    // get response
                    if (curr_chat.includes("\"reply\":")) {
                        var search_from = curr_chat.indexOf("\"reply\":"); // search for reply content
                        start_i = curr_chat.indexOf("\"content\":", search_from) + 11; // start of the response
                        end_i = curr_chat.indexOf("\",\"fromMessage\":", search_from);
                        var curr_res = "";
                        for (var k = start_i; k < end_i; k++) {
                            curr_res += curr_chat[k];
                        }
                        if (curr_res !== "") {
                            result += "Response: " + curr_res + "\n";
                        }
                    }
                }
            }
        }
        const element = document.createElement("a");
        const file = new Blob([result], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "myChat.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    render() {
        return (
            <div className="faq-view">
                <button className="export-file-btn" onClick={this.exportFile}> Download Chat </button>
            </div>
        )
    }
}

export default FaqView;
