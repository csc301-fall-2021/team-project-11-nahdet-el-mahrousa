
import store from '../../store/store'
import { replaceMessages } from '../../store/messages/message-slice'

const returnData = () =>{
    const data = [];
    for (let i = 0; i < 3; ++i) {
        const replies = [];
        for (let j = 0; j < 3; ++j) {
            replies.push({
              _id: i+':'+j,
              content: 'question ' + i + ': sample reply number' + j,
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

    export function getMessageFromBackend() {
        const data = returnData()
        // const dispatch = useDispatch()
        store.dispatch(replaceMessages(data))
    }