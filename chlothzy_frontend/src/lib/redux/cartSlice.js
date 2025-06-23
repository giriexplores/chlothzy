import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    incrementCart: (state, action) => {
      const quantity = action.payload || 1;
      state.count += quantity;
    },
    decrementCart: (state, action) => {
      const quantity = action.payload || 1;
      state.count = Math.max(0, state.count - quantity);
    },
    setCartCount: (state, action) => {
      state.count = Math.max(0, action.payload);
    },
    clearCart: (state) => {
      state.count = 0;
    },
  },
});

export const { incrementCart, decrementCart, setCartCount, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
