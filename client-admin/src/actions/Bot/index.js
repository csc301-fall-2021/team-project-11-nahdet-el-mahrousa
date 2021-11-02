
import store from '../../store/store'
import { replaceMessages } from '../../store/messages/message-slice'
import { getBot, createReply } from '../../api/bot-api'

    function dispatchMessage(message) {
        store.dispatch(replaceMessages(message))
    }

    export function getMessageFromBackend() {
        getBot(dispatchMessage)
        // const dispatch = useDispatch()
        // store.dispatch(replaceMessages(data))
    }

    export function sendReplyToBackend(content, label, from_id) {
        return createReply({content, label, fromMessage: from_id, toMessage: null}, dispatchMessage)
    }

