
import store from '../../store/store'
import { replaceMessages } from '../../store/messages/message-slice'
import { getBot, createReply, deleteReply, editReply } from '../../api/bot-api'

    function dispatchMessage(message) {
        store.dispatch(replaceMessages(message))
    }

    export function getMessageFromBackend() {
        getBot(dispatchMessage)
        // const dispatch = useDispatch()
        // store.dispatch(replaceMessages(data))
    }

    export function sendReplyToBackend(_id, content, label, fromMessage, toMessage) {
        label = label ? label : ''
        toMessage = toMessage ? toMessage : ''
        fromMessage = fromMessage ? fromMessage : ''
        if (!_id){
            return createReply({content, label, fromMessage, toMessage}, dispatchMessage)
        } else {
            return editReply({_id, content, label, fromMessage, toMessage}, dispatchMessage)
        }
    }

    export function deleteReplyToBackend(_id) {
        return deleteReply({ _id }, dispatchMessage)
    }


