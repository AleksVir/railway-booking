import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";

import MainPage from "./pages/MainPage/MainPage.jsx";
import TrainSelectionPage from "./pages/TrainSelectionPage/TrainSelectionPage.jsx";
import SeatSelectionPage from "./pages/SeatsSelectionPage/SeatSelectionPage.jsx";
import PassengersPage from "./pages/PassengersPage/PassengersPage.jsx";
import PaymentOptionsPage from "./pages/PaymentOptionsPage/PaymentOptionsPage.jsx";
import OrderConfirmationPage from "./pages/OrderConfirmationPage/OrderConfirmationPage.jsx";
import SuccessfulOrderPage from "./pages/SuccessfulOrderPage/SuccessfulOrderPage.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";

import links from "./data/links.jsx";

function App() {
   return (
      <BrowserRouter basename="/railway-booking">
         <Routes>
            <Route path={links.main} element={<MainPage />} />
            <Route path={links.trains} element={<TrainSelectionPage />} />
            <Route path={links.seats} element={<SeatSelectionPage />} />
            <Route path={links.passengers} element={<PassengersPage />} />
            <Route path={links.paymentOptions} element={<PaymentOptionsPage />} />
            <Route path={links.confirmOrder} element={<OrderConfirmationPage />} />
            <Route path={links.success} element={<SuccessfulOrderPage />} />
            <Route path="*" element={<ErrorPage />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;