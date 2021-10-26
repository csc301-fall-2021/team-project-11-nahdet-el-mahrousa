import React from 'react';
import BotTable from './../../../components/Bot/BotTable'



class BotPage extends React.Component{

    returnData() {
        
  
        const data = [];
        for (let i = 0; i < 3; ++i) {
            const replies = [];
            for (let j = 0; j < 3; ++j) {
                replies.push({
                  _id: j,
                  content: 'sample reply number' + j,
                  toMessage: 300+i,
                  toMessage: 0,
                });
              }
    
              const message = {
                message: {
                    _id: i,
                    content: 'Sample Question number ' +i,
                  },
                  replies
            }
          data.push(message);
        }
        return data;
        }

    render(){
        const data = this.returnData()
        return (
            <div>
                <h1>Bot PAGE</h1>
                <div className="container">
                    <BotTable data={data}></BotTable>
                </div>
            </div>
        )
    }
}

export default BotPage;