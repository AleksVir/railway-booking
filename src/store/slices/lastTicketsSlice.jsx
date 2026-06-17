import { createSlice, createSelector } from "@reduxjs/toolkit";
import { fetchLastTickets } from "../thunks/asyncThunks.jsx";

const initialState = {
   lastTickets: [],
   loading: false,
   error: null,
};

const lastTicketsSlice = createSlice({
   name: "lastTickets",
   initialState,

   reducers: {
      removeLastTicketsData: () => ({
         ...initialState, // ✅ важно: новый объект, а не ссылка
      }),
   },

   extraReducers: (builder) => {
      builder
         // ===== pending =====
         .addCase(fetchLastTickets.pending, (state) => {
            state.loading = true;
            state.error = null;
         })

         // ===== fulfilled =====
         .addCase(fetchLastTickets.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;

            const data = action.payload ?? [];

            state.lastTickets = data.map((ticket, index) => ({
               id: ticket?._id ?? index, // ✅ лучше чем index

               price: ticket?.departure?.min_price ?? 0,

               from: {
                  city: ticket?.departure?.from?.city?.name ?? "",
                  station:
                     ticket?.departure?.from?.railway_station_name ?? "",
               },

               to: {
                  city: ticket?.departure?.to?.city?.name ?? "",
                  station:
                     ticket?.departure?.to?.railway_station_name ?? "",
               },

               icons: {
                  wifi: ticket?.departure?.have_wifi ?? false,
                  conditioner:
                     ticket?.departure?.have_air_conditioning ?? false,
                  express:
                     ticket?.departure?.is_express ?? false,
               },
            }));
         })

         // ===== rejected =====
         .addCase(fetchLastTickets.rejected, (state, action) => {
            state.loading = false;
            state.error =
               action.payload || "Ошибка загрузки последних билетов";
         });
   },
});

export const { removeLastTicketsData } = lastTicketsSlice.actions;

//
// ======================================================
// ✅ FIX: MEMOIZED SELECTORS (убирает warning Redux)
// ======================================================
//

const selectLastTicketsState = (state) => state.lastTickets;

export const selectLastTickets = createSelector(
   [selectLastTicketsState],
   (slice) => slice.lastTickets
);

export const selectLoading = createSelector(
   [selectLastTicketsState],
   (slice) => slice.loading
);

export const selectError = createSelector(
   [selectLastTicketsState],
   (slice) => slice.error
);

export default lastTicketsSlice.reducer;