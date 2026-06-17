import { createAsyncThunk } from "@reduxjs/toolkit";

// LAST TICKETS
export const fetchLastTickets = createAsyncThunk(
   "trains/fetchLastTickets",
   async (url, { rejectWithValue }) => {
      try {
         const response = await fetch(url);

         if (!response.ok) {
            return rejectWithValue("Network error");
         }

         return await response.json();
      } catch (err) {
         return rejectWithValue(err.message || "Не удалось загрузить последние билеты");
      }
   }
);

// TRAINS
export const fetchTrainsOptions = createAsyncThunk(
   "trains/fetchTrainsOptions",
   async (url, { rejectWithValue }) => {
      try {
         const response = await fetch(url);

         if (!response.ok) {
            return rejectWithValue("Network error");
         }

         return await response.json();
      } catch (err) {
         return rejectWithValue(err.message || "Не удалось загрузить список поездов");
      }
   }
);

// SEATS
export const fetchSeats = createAsyncThunk(
   "seats/fetchSeats",
   async ({ url, direction }, { rejectWithValue }) => {
      try {
         if (!url) {
            return rejectWithValue("URL is missing");
         }

         const response = await fetch(url);

         if (!response.ok) {
            return rejectWithValue("Network error");
         }

         return {
            data: await response.json(),
            direction,
         };
      } catch (err) {
         return rejectWithValue(err.message || "Не удалось загрузить места");
      }
   }
);

// ORDER
export const postOrder = createAsyncThunk(
   "order/postOrder",
   async ({ url, request }, { rejectWithValue }) => {
      try {
         const response = await fetch(url, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
         });

         if (!response.ok) {
            return rejectWithValue("Network error");
         }

         return await response.json();
      } catch (err) {
         return rejectWithValue(err.message || "Ошибка отправки заказа");
      }
   }
);