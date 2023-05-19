import { createSlice } from '@reduxjs/toolkit'

const initialState = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if(user)
    return {
      isConnected: true,
      user
    }
    
  return{
    isConnected: false,
    user: null
  }
}

const userReducer = createSlice({
  name: 'user',
  initialState: initialState(),
  reducers: {
    login: {
      reducer: (state, action) => {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        return state = action.payload;
      },
      // id: req.user.id,
      //   name: {
      //       fName: req.user.name.fName,
      //       lName: req.user.name.lName
      //   },
      //   email: req.user.email,
      //   info: req.user.email,
      //   profilePic: req.user.profilePic,
      //   order_history: req.user.order_history
      prepare: ({id, name, username, email, info, profilPic, order_history}) => {
        return{
          payload:{
            isConnected: true,
            user: {
              id: id,
              name: name,
              username: username,
              email: email,
              info: info,
              profilPic: profilPic,
              order_history: order_history
            }
          }
        }
      }
    },
    logout:{
      reducer: (state, action) => {
        localStorage.removeItem('user');
        return state = {
          isConnected: false,
          user: null
        }
      },
      
    }
  }
})

export const { login, logout } = userReducer.actions;
export default userReducer.reducer;