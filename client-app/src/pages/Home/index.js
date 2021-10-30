import React from 'react';

import Message from "components/Message";
import Reply from "components/Reply";
import "./index.scss";

document.body.style.backgroundColor = "#E5E5E5";

// const mockData = {
//     message: {
//         content: "message 1", 
//         label: "hhh",
//         fromMessage: "msg 1",
//         toMessage: "msg 2"
//     },
//     options: {
//         content: "option 1",
//     },
//     {
//         content: "option 2",
//     }
// }

class HomePage extends React.Component {
    render() {
        return (
            <div class="row">
                <div class="column side">
                    <div className="helper-body">
                        <div className="helper-top"></div>
                        <div className="helper-name">Nahdet El Mahrousa Enterpreneur Helper</div>
                        <div className="FAQ"></div>
                        <div className="search"></div>
                        <div className="search-icon1"></div>
                        <div className="search-icon2"></div>
                    </div>
                    
                </div>
                <div class="column middle">
                    <Message /> 
                </div>
                <div class="column side">
                    <Reply />
                </div>
                <div class="bottom">
                </div>
            </div>
                
                
                // <div className="main-view home-main"> 
                //     {/* <ThemeProvider theme={mdTheme}>
                //         <Box sx={{ display: 'flex' }}>
                //             <Box
                //                 component="main"
                //                 sx={{
                //                     flexGrow: 1,
                //                     height: '100vh',
                //                     overflow: 'auto',
                //                 }}
                //             >
                //                 <Bot />
                //                 <Message />
                //                 <Reply />
                //             </Box>
                //         </Box>
                //     </ThemeProvider> */}
                // </div>
        )
    }
}

export default HomePage;