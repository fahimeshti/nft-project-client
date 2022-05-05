import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.products.price;
        },
        removeProducts: (state, action) => {
            state.quantity -= 1;
            state.products = state.products.filter((item)=> item.products._id !== action.payload.product._id);
            state.total -= action.payload.product.price;
        },
    },
});

export const { addProduct, removeProducts } = cartSlice.actions;
export default cartSlice.reducer;
