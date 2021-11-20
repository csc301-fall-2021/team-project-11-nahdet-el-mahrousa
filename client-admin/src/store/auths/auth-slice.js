import { createSlice } from '@reduxjs/toolkit'


export const authSlice = createSlice({
  name: 'userData',
  initialState: {
      data: []
  },
  reducers: {
    updateAuth: (state, action) => {
      console.log(state, action.payload)
      state.messages = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateAuth } = authSlice.actions

export default authSlice.reducer