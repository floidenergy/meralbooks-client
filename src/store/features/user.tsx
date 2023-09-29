import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User, UserInfo } from "../../model"
const initialState = () => {
  const storageUser: string | null = localStorage.getItem('user');
  if (storageUser) {
    const user: User = JSON.parse(storageUser);
    return {
      isConnected: true,
      user
    }
  }

  return {
    isConnected: false,
    user: null
  }
}

const userReducer = createSlice({
  name: 'user',
  initialState: initialState(),
  reducers: {
    login: {
      reducer: (state, action: PayloadAction<UserInfo>) => {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        state.isConnected = action.payload.isConnected
        state.user = action.payload.user
      },
      prepare: (user: User) => {
        return {
          payload: {
            isConnected: true,
            user: user
          }
        }
      }
    },
    logout: (state) => {
      localStorage.removeItem('user');
      state = {
        isConnected: false,
        user: null
      }
      return state;
    },
    edit: {
      reducer: (state, action: PayloadAction<UserInfo>) => {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        // state = action.payload;
        state.isConnected = action.payload.isConnected;
        state.user = action.payload.user
      },
      prepare: (user: User) => {
        return {
          payload: {
            isConnected: true,
            user: user
          }
        }
      }
    }
  }
})

export const { login, logout, edit } = userReducer.actions;
export default userReducer.reducer;