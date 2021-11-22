import { createSlice } from '@reduxjs/toolkit'


export const authSlice = createSlice({
  name: 'userData',
  initialState: {
      userData: {
        token: ''
      }
  },
  reducers: {
    loginAuth: (state, action) => {
      console.log(state, action.payload)
      state.userData.token = action.payload
      localStorage.setItem('token', action.payload);
    },

    logoutAuth: (state) => {
      console.log(state)
      state.userData = {
        token: ''
      }
      localStorage.removeItem('token');
    }
  }
})

// Action creators are generated for each case reducer function
export const { loginAuth, logoutAuth } = authSlice.actions

export default authSlice.reducer