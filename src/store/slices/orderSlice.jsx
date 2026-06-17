import { createSlice } from "@reduxjs/toolkit";

const empty = {
   orderNumber: null,
   sum: null,
   name: null,
};

let initialState = empty;

try {
   const savedData = localStorage.getItem("order");
   initialState = savedData ? JSON.parse(savedData) : empty;
} catch (e) {
   initialState = empty;
}

const orderSlice = createSlice({
   name: "orderSlice",
   initialState,

   reducers: {
      addOrderData(state, action) {
         const { orderNumber, sum, name } = action.payload;
         state.orderNumber = orderNumber;
         state.sum = sum;
         state.name = name;
      },

      removeOrderData() {
         return empty;
      },
   },
});

export const { addOrderData, removeOrderData } = orderSlice.actions;

export const selectOrderNumber = (state) => state.order.orderNumber;
export const selectSum = (state) => state.order.sum;
export const selectName = (state) => state.order.name;

export default orderSlice.reducer;