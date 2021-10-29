
import store from '../../store/store'
import { replaceMessages } from '../../store/messages/message-slice'
import { getSurvey } from '../../api/bot-api'

    function dispatchMessage(message) {
        store.dispatch(replaceMessages(message))
    }

    export function getMessageFromBackend() {
        getSurvey(dispatchMessage)
        // const dispatch = useDispatch()
        // store.dispatch(replaceMessages(data))
    }