import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from "./features/user"

const store = configureStore({
  reducer: {
    user: userReducer
  }
})

const rootReducer = combineReducers({
  user: userReducer
})

export default store;
export type RootState = ReturnType<typeof rootReducer>;
