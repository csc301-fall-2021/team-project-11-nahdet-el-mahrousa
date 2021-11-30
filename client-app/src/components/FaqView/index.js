import React from 'react';
import "./FaqView.scss";

class FaqView extends React.Component {
    exportFile = () => {
        const element = document.createElement("a");
        const file = new Blob([localStorage.getItem("chatHistory")], {type: 'text/plain'});
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
