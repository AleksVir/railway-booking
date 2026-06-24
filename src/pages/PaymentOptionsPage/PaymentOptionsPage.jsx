import React from "react";

import Layout from "../../components/Layout/Layout.jsx";
import MainSearchBlock from "../../components/MainSearchBlock/MainSearchBlock.jsx";
import ProgressBar from "../../components/ProgressBar/ProgressBar.jsx";
import SidebarDetails from "../../components/SidebarDetails/SidebarDetails.jsx";
import PaymentOptions from "../../components/PaymentOptions/PaymentOptions.jsx";

import widthOptions from "../../components/MainSearchBlock/widthOptions.jsx";
import picsOptions from "../../components/Layout/picsOptions.jsx";

import styles from "./PaymentOptionsPage.module.scss";

function PaymentOptionsPage() {
   return (
      <Layout
      pic={picsOptions.search}
      searchBlock={<MainSearchBlock width={widthOptions.wide} />}
   >
      <ProgressBar step={3} />

         <div className={styles.body}>
            <SidebarDetails />

            <div className={styles["wrapper-main"]}>
               <PaymentOptions />
            </div>
         </div>
      </Layout>
   );
}

export default PaymentOptionsPage;