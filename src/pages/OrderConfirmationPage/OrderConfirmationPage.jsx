import React from "react";
import { useSelector } from "react-redux";

import Layout from "../../components/Layout/Layout.jsx";
import MainSearchBlock from "../../components/MainSearchBlock/MainSearchBlock.jsx";
import ProgressBar from "../../components/ProgressBar/ProgressBar.jsx";
import SidebarDetails from "../../components/SidebarDetails/SidebarDetails.jsx";
import OrderConfirmation from "../../components/OrderConfirmation/OrderConfirmation.jsx";
import Redirect from "../../components/Redirect/Redirect.jsx";

import { selectSelectedSeats } from "../../store/slices/seatsSlice.jsx";
import { selectIndex } from "../../store/slices/trainSlice.jsx";
import { selectPassengers } from "../../store/slices/passengersSlice.jsx";
import { selectPersonalData } from "../../store/slices/personalDataSlice.jsx";

import widthOptions from "../../components/MainSearchBlock/widthOptions.jsx";
import picsOptions from "../../components/Layout/picsOptions.jsx";
import directions from "../../data/directions.jsx";
import fieldNames from "../../components/PaymentOptions/fieldNames.jsx";

import styles from "./OrderConfirmationPage.module.scss";

function OrderConfirmationPage() {
   const seats = useSelector(selectSelectedSeats);
   const seatsDep = seats?.[directions.departure] || [];
   const seatsArr = seats?.[directions.arrival] || [];

   const selectedTrainIndex = useSelector(selectIndex);
   const passengers = useSelector(selectPassengers) || [];

   const personalData = useSelector(selectPersonalData) || {};
   const paymentOption = personalData?.[fieldNames.paymentMethod];

   const isValid =
      (seatsDep.length > 0 || seatsArr.length > 0) &&
      selectedTrainIndex !== null &&
      passengers.length > 0 &&
      !!paymentOption;

   const midBody = isValid ? (
      <>
         <div>
            <SidebarDetails />
         </div>
         <div className={styles["wrapper-main"]}>
            <OrderConfirmation />
         </div>
      </>
   ) : (
      <Redirect />
   );

   return (
      <Layout
      pic={picsOptions.search}
      searchBlock={<MainSearchBlock width={widthOptions.wide} />}
   >
      <ProgressBar step={4} />
         <div className={styles.body}>{midBody}</div>
      </Layout>
   );
}

export default OrderConfirmationPage;