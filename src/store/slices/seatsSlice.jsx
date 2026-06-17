import { createSlice } from "@reduxjs/toolkit";
import { fetchSeats } from "../thunks/asyncThunks.jsx";

const empty = {
   seatsOptions: { departure: [], arrival: [] },
   loading: false,
   error: null,
   selectedSeats: {
      departure: [],
      arrival: [],
   },
};

let initialState = empty;

try {
   const savedData = localStorage.getItem("seats");
   initialState = savedData ? JSON.parse(savedData) : empty;
} catch (e) {
   initialState = empty;
}

const seatsSlice = createSlice({
   name: "seatsSlice",
   initialState,

   reducers: {
      addSelectedSeats(state, action) {
         const {
            number,
            direction,
            coachId,
            coachName,
            price,
            priceCoefficient,
         } = action.payload;

         const ids = state.selectedSeats[direction].map(
            (el) => el.coachId
         );

         const sameId = ids.indexOf(coachId);

         if (sameId !== -1) {
            state.selectedSeats[direction][sameId].seats.push({
               seat: number,
               price,
               priceCoefficient,
               passengerId: null,
            });
         } else {
            state.selectedSeats[direction].push({
               coachId,
               coachName,
               seats: [
                  {
                     seat: number,
                     price,
                     priceCoefficient,
                     passengerId: null,
                  },
               ],
            });
         }
      },

      addPassengerId(state, action) {
         const { seat, direction, coachId, passengerId } =
            action.payload;

         const coach = state.selectedSeats[direction].find(
            (el) => el.coachId === coachId
         );

         if (coach) {
            const targetSeat = coach.seats.find(
               (el) => el.seat === seat
            );

            if (targetSeat) {
               targetSeat.passengerId = passengerId;
            }
         }
      },

      removeSelectedSeat(state, action) {
         const { number, direction, coachId } = action.payload;

         state.selectedSeats[direction].forEach((el) => {
            if (el.coachId === coachId) {
               el.seats = el.seats.filter(
                  (item) => item.seat !== number
               );
            }
         });
      },

      removeAllSelectedSeatsFromCoach(state, action) {
         const { direction, coachId } = action.payload;

         state.selectedSeats[direction] = state.selectedSeats[
            direction
         ].filter((el) => el.coachId !== coachId);
      },

      removeSeatsData() {
         return empty;
      },
   },

   extraReducers: (builder) => {
      builder
         .addCase(fetchSeats.pending, (state) => {
            state.loading = true;
            state.error = null;
         })

         .addCase(fetchSeats.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;

            const { data, direction } = action.payload;
            state.seatsOptions[direction] = data;
         })

         .addCase(fetchSeats.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         });
   },
});

export const {
   addSelectedSeats,
   removeSelectedSeat,
   removeAllSelectedSeatsFromCoach,
   removeSeatsData,
   addPassengerId,
} = seatsSlice.actions;

export const selectSeatsOptions = (state) =>
   state.seats.seatsOptions;

export const selectSelectedSeats = (state) =>
   state.seats.selectedSeats;

export const selectLoading = (state) =>
   state.seats.loading;

export const selectError = (state) =>
   state.seats.error;

export default seatsSlice.reducer;