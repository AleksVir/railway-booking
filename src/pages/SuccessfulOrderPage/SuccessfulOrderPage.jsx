import React from "react";
import { useSelector } from "react-redux";

import Layout from "../../components/Layout/Layout.jsx";
import OrderSuccess from "../../components/OrderSuccess/OrderSuccess.jsx";
import Redirect from "../../components/Redirect/Redirect.jsx";

import {
   selectOrderNumber,
   selectSum,
   selectName,
} from "../../store/slices/orderSlice.jsx";

import picsOptions from "../../components/Layout/picsOptions.jsx";

import styles from "./SuccessfulOrderPage.module.scss";

function SuccessfulOrderPage() {
   const orderNumber = useSelector(selectOrderNumber);
   const sum = useSelector(selectSum);
   const name = useSelector(selectName);

   const body = (
      <div className={styles.body}>
         {orderNumber && sum && name && <OrderSuccess />}
         {(!orderNumber || !sum || !name) && <Redirect />}
      </div>
   );
   return (
   <Layout pic={picsOptions.success}>
      {body}
   </Layout>
);
}

export default SuccessfulOrderPage;
