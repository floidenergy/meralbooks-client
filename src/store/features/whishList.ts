import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { bookInterface } from '../../model'

const initialState = (): bookInterface[] => {
  const storageCart: string | null = localStorage.getItem('Favorite');
  return (storageCart && JSON.parse(storageCart)) || [];
}

const whishListReducer = createSlice({
  name: "whishList",
  initialState: initialState(),
  reducers: {
    addToWishList: (state, action: PayloadAction<bookInterface>) => {
      state.push(action.payload);
      localStorage.setItem("whishList", JSON.stringify(state));
      return state
    },
    removeFromWhishList: (state: bookInterface[], action: PayloadAction<string>) => {
      state = state.filter(element => element._id !== action.payload);
      localStorage.setItem("whishList", JSON.stringify(state));
      return state
    },
    clearWhishList: (state: bookInterface[]) => {
      state.length = 0;
      localStorage.removeItem("whishList");
      return state
    }
  }
})

export const { addToWishList, removeFromWhishList, clearWhishList } = whishListReducer.actions
export default whishListReducer.reducer