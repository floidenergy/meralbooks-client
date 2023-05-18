import { createSlice } from '@reduxjs/toolkit'

const userReducer = createSlice({
  name: 'user',
  initialState: {isConnected: false, user: null},
  reducers: {
    login: (state, action) => {
      // state.isConnected = true
      // state.user = action.payload
      
      return state = {
        isConnected: true,
        user : action.payload
      }
    },
    logout: state => {
      state.isConnected = false
      state.user = null
      return state
    }
  }
})

export const { login, logout } = userReducer.actions;
export default userReducer.reducer;