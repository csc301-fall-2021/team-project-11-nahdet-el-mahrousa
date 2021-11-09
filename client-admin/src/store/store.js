import { configureStore } from '@reduxjs/toolkit'
import messageReducer from './messages/message-slice'

export default configureStore({
    reducer: {
        surveyData: messageReducer
      }
})