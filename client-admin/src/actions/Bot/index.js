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

// used to dispatch message for redux
function dispatchMessage(message) {
  store.dispatch(replaceMessages(message));
}

// get the messages and replies from backend 
export function getMessageFromBackend() {
  getBot(dispatchMessage);
}

// get query messages and replies
export function getQueryMessage(query) {
  getQueryBot(query, dispatchMessage);
}

// send a new/revised reply to backend to verify
export function sendReplyToBackend(
  _id,
  content,
  label,
  fromMessage,
  toMessage
) {
  // if label does not exist then set label to ""
  label = label ? label : "";
  // if toMessage does not exist then set toMessage to null
  toMessage = toMessage ? toMessage : null;

  if (!_id) {
    // create a new reply if no id
    return createReply(
      { content, label, fromMessage, toMessage },
      dispatchMessage
    );
  } else {
    // edit existing reply if id exists
    return editReply(
      { _id, content, label, fromMessage, toMessage },
      dispatchMessage
    );
  }
}

// send revised/new message to backend to verify
export function sendMessageToBackend(_id, content, label) {
  label = label ? label : "";
  if (!_id) {
    // create a new message if no id
    return createMessage({ content, label }, dispatchMessage);
  } else {
    // edit existing message if id exists
    return editMessage({ _id, content, label }, dispatchMessage);
  }
}

export function deleteReplyToBackend(_id) {
  return deleteReply({ _id }, dispatchMessage);
}

export function deleteMessageToBackend(_id) {
  return deleteMessage({ _id }, dispatchMessage);
}
