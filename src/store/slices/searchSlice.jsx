import { createSlice } from "@reduxjs/toolkit";

const empty = {
   departureCity: "",
   arrivalCity: "",
   departureDate: "",
   returnDate: "",
};

let initialState = empty;

try {
   const savedData = localStorage.getItem("search");
   initialState = savedData ? JSON.parse(savedData) : empty;
} catch (e) {
   initialState = empty;
}

const searchSlice = createSlice({
   name: "searchSlice",
   initialState,

   reducers: {
      changeSearchFields(state, action) {
         const { name, value } = action.payload;
         state[name] = value;
      },

      swapValues(state) {
         const departure = state.departureCity;
         state.departureCity = state.arrivalCity;
         state.arrivalCity = departure;
      },

      removeSearchData() {
         return empty;
      },
   },
});

export const {
   changeSearchFields,
   swapValues,
   removeSearchData,
} = searchSlice.actions;

export const selectDepartureCity = (state) =>
   state.search.departureCity;

export const selectArrivalCity = (state) =>
   state.search.arrivalCity;

export const selectDepartureDate = (state) =>
   state.search.departureDate;

export const selectReturnDate = (state) =>
   state.search.returnDate;

export default searchSlice.reducer;