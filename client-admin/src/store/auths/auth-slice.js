import { createSlice } from '@reduxjs/toolkit'


export const authSlice = createSlice({
  name: 'userData',
  initialState: {
      userData: []
  },
  reducers: {
    updateAuth: (state, action) => {
      console.log(state, action.payload)
      state.userData = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateAuth } = authSlice.actions

export default authSlice.reducer