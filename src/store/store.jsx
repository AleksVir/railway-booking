import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
   persistStore,
   persistReducer,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
} from "redux-persist";

import storageImport from "redux-persist/lib/storage";

const storage = storageImport.default || storageImport;

import lastTicketsReducer from "./slices/lastTicketsSlice.jsx";
import searchReducer from "./slices/searchSlice";
import sidebarSelectReducer from "./slices/sidebarSelectSlice";
import trainsReducer from "./slices/trainsSlice";
import sortReducer from "./slices/sortSlice";
import trainReducer from "./slices/trainSlice";
import seatsReducer from "./slices/seatsSlice";
import numOfPassengersReducer from "./slices/numOfpassengersSlice";
import passengersReducer from "./slices/passengersSlice";
import personalDataReducer from "./slices/personalDataSlice";
import orderReducer from "./slices/orderSlice";
import orderConfirmationReducer from "./slices/orderConfirmationSlice.jsx";

const rootReducer = combineReducers({
   lastTickets: lastTicketsReducer,
   search: searchReducer,
   sidebarSelect: sidebarSelectReducer,
   trains: trainsReducer,
   sort: sortReducer,
   train: trainReducer,
   seats: seatsReducer,
   numOfPassengers: numOfPassengersReducer,
   passengers: passengersReducer,
   personalData: personalDataReducer,
   order: orderReducer,
   orderConfirmation: orderConfirmationReducer,
});

const persistConfig = {
   key: "root",
   storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
   reducer: persistedReducer,

   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [
               FLUSH,
               REHYDRATE,
               PAUSE,
               PERSIST,
               PURGE,
               REGISTER,
            ],
         },
      }),
});
export const persistor = persistStore(store);
export default store;