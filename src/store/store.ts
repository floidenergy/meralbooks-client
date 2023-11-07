import { configureStore, combineReducers } from '@reduxjs/toolkit'

import userReducer from "./features/user"
import cartItemsReducer from './features/cartItems'
import favorite from './features/whishList'

const store = configureStore({
  reducer: {
    user: userReducer,
    cartItems: cartItemsReducer,
    whishList: favorite
  }
})

const rootReducer = combineReducers({
  user: userReducer,
  cartItems: cartItemsReducer,
  whishList: favorite
})

export default store;
export type RootState = ReturnType<typeof rootReducer>;
