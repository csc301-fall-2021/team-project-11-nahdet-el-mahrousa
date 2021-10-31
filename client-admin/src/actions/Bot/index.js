
import store from '../../store/store'
import { replaceMessages } from '../../store/messages/message-slice'
import { getBot } from '../../api/bot-api'

    function dispatchMessage(message) {
        store.dispatch(replaceMessages(message))
    }

    export function getMessageFromBackend() {
        getBot(dispatchMessage)
        // const dispatch = useDispatch()
        // store.dispatch(replaceMessages(data))
    }