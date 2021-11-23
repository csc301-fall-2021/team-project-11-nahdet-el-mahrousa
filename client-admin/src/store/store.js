import { configureStore } from '@reduxjs/toolkit'
import messageReducer from './messages/message-slice'
import adminReducer from './auths/auth-slice'

export default configureStore({
    reducer: {
        surveyData: messageReducer,
        adminData: adminReducer
      }
})