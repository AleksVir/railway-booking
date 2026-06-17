import { createSlice } from "@reduxjs/toolkit";
import fieldNames from "../../components/PassengersSelection/PassengerCard/fieldNames";

const empty = {
   passengers: [],
};

let initialState = empty;

try {
   const savedData = localStorage.getItem("passengers");
   initialState = savedData ? JSON.parse(savedData) : empty;
} catch (e) {
   initialState = empty;
}

const passengersSlice = createSlice({
   name: "passengersSlice",
   initialState,

   reducers: {
      addNewPassenger(state, action) {
         state.passengers = [
            ...state.passengers.filter(
               (pas) => pas.id !== action.payload.id
            ),
            action.payload,
         ];
      },

      editPassengerData(state, action) {
         const index = state.passengers.findIndex(
            (el) => el.id === action.payload.id
         );

         if (index !== -1) {
            state.passengers[index] = {
               ...state.passengers[index],
               ...action.payload,
            };
         }
      },

      removeSeatInfo(state) {
         state.passengers.forEach((pas) => {
            delete pas[fieldNames.seatDep];
            delete pas[fieldNames.seatArr];
            delete pas[fieldNames.depOnly];
         });
      },

      removeSeatInfoAfterUnchoosingSeat(state, action) {
         const { coachId, seatNumber } = action.payload;
         const seat = `${coachId}:${seatNumber}`;

         state.passengers.forEach((pas) => {
            if (pas[fieldNames.seatDep] === seat) {
               delete pas[fieldNames.seatDep];
               if (pas[fieldNames.depOnly]) {
                  delete pas[fieldNames.depOnly];
               }
            }

            if (pas[fieldNames.seatArr] === seat) {
               delete pas[fieldNames.seatArr];
            }
         });
      },

      removePassenger(state, action) {
         state.passengers = state.passengers.filter(
            (item) => item.id !== action.payload
         );
      },

      removeAllPassengers() {
         return empty;
      },
   },
});

export const {
   addNewPassenger,
   editPassengerData,
   removePassenger,
   removeSeatInfo,
   removeSeatInfoAfterUnchoosingSeat,
   removeAllPassengers,
} = passengersSlice.actions;

export const selectPassengers = (state) => state.passengers.passengers;

export default passengersSlice.reducer;