import { createSlice } from "@reduxjs/toolkit";
import { fetchTrainsOptions } from "../thunks/asyncThunks";

const initialState = {
   totalCount: 0,
   trainsOptions: [],
   loading: false,
   error: null,
};

const trainsSlice = createSlice({
   name: "trains",
   initialState,

   reducers: {
      removeTrainsData: () => initialState,
   },

   extraReducers: (builder) => {
      builder
 
         .addCase(fetchTrainsOptions.pending, (state) => {
            state.loading = true;
            state.error = null;
         })

      
         .addCase(fetchTrainsOptions.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;

            state.totalCount = action.payload?.total_count ?? 0;

            state.trainsOptions =
               action.payload?.items?.map((ticket) => ({
                  id: ticket.id || crypto.randomUUID(),
                  ticket,
               })) ?? [];
         })

      
         .addCase(fetchTrainsOptions.rejected, (state, action) => {
            state.loading = false;
            state.error =
               action.payload || "Не удалось загрузить список поездов";
         });
   },
});

// actions
export const { removeTrainsData } = trainsSlice.actions;

export const selectTotalCount = (state) =>
   state.trains.totalCount;

export const selectTrainsOptions = (state) =>
   state.trains.trainsOptions;

export const selectLoading = (state) =>
   state.trains.loading;

export const selectError = (state) =>
   state.trains.error;

export default trainsSlice.reducer;