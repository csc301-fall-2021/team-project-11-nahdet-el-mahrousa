import { createSlice } from '@reduxjs/toolkit'


export const authSlice = createSlice({
  name: 'userData',
  initialState: {
      token: null
  },
  reducers: {
    loginAuth: (state, action) => {
      state.token = action.payload
      localStorage.setItem('token', action.payload);
    },

    logoutAuth: (state) => {
      state.token = null
      localStorage.removeItem('token');
    }
  }
})

// Action creators are generated for each case reducer function
export const { loginAuth, logoutAuth } = authSlice.actions

export default authSlice.reducer