import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { cartItemsInterface } from '../../model'

const initialState = (): cartItemsInterface[] => {
  const storageCart: string | null = localStorage.getItem('CartItems');
  return (storageCart && JSON.parse(storageCart)) || [];
}

const cartItemsReducer = createSlice({
  name: "cart",
  initialState: initialState(),
  reducers: {
    addToCart: (state, action: PayloadAction<cartItemsInterface>) => {
      state.push(action.payload);
      localStorage.setItem("CartItems", JSON.stringify(state));
      return state
    },
    removeFromCart: (state: cartItemsInterface[], action: PayloadAction<string>) => {
      state = state.filter(element => element.item._id !== action.payload);
      localStorage.setItem("CartItems", JSON.stringify(state));
      return state
    },
    updateItemQuantity: (state: cartItemsInterface[], action: PayloadAction<{ _id: string; quantity: number }>) => {
      state.find(element => element.item._id === action.payload._id)!.quantity = action.payload.quantity;
      localStorage.setItem("CartItems", JSON.stringify(state));
    },
    clearCart: (state: cartItemsInterface[]) => {
      state.length = 0;
      localStorage.removeItem("CartItems");
      return state
    }
  }
})

export const { addToCart, removeFromCart, updateItemQuantity, clearCart } = cartItemsReducer.actions
export default cartItemsReducer.reducer