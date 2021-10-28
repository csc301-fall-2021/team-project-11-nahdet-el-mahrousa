import { createSlice } from '@reduxjs/toolkit'


export const messageSlice = createSlice({
  name: 'surveyData',
  initialState: {
      messages: []
  },
  reducers: {
    replaceMessages: (state, action) => {
        console.log(state, action.payload)
      state.messages = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { replaceMessages } = messageSlice.actions

export default messageSlice.reducer