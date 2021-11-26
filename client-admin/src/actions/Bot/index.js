import store from "../../store/store";
import { replaceMessages } from "../../store/messages/message-slice";
import {
  getBot,
  getQueryBot,
  createReply,
  deleteReply,
  editReply,
  editMessage,
  deleteMessage,
  createMessage,
} from "../../api/bot-api";

function dispatchMessage(message) {
  store.dispatch(replaceMessages(message));
}

export function getMessageFromBackend() {
  getBot(dispatchMessage);
  // const dispatch = useDispatch()
  // store.dispatch(replaceMessages(data))
}

export function getQueryMessage() {
  getBot(dispatchMessage);
  // const dispatch = useDispatch()
  // store.dispatch(replaceMessages(data))
}

export function sendReplyToBackend(
  _id,
  content,
  label,
  fromMessage,
  toMessage
) {
  label = label ? label : "";
  toMessage = toMessage ? toMessage : null;
  console.log(_id);
  if (!_id) {
    return createReply(
      { content, label, fromMessage, toMessage },
      dispatchMessage
    );
  } else {
    return editReply(
      { _id, content, label, fromMessage, toMessage },
      dispatchMessage
    );
  }
}

export function sendMessageToBackend(_id, content, label) {
  label = label ? label : "";
  console.log(_id);
  if (!_id) {
    return createMessage({ content, label }, dispatchMessage);
  } else {
    return editMessage({ _id, content, label }, dispatchMessage);
  }
}

export function deleteReplyToBackend(_id) {
  return deleteReply({ _id }, dispatchMessage);
}

export function deleteMessageToBackend(_id) {
  return deleteMessage({ _id }, dispatchMessage);
}
