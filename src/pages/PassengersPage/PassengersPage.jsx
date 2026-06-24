import React from "react";

import Layout from "../../components/Layout/Layout.jsx";
import MainSearchBlock from "../../components/MainSearchBlock/MainSearchBlock.jsx";
import ProgressBar from "../../components/ProgressBar/ProgressBar.jsx";
import SidebarDetails from "../../components/SidebarDetails/SidebarDetails.jsx";
import PassengersSelection from "../../components/PassengersSelection/PassengersSelection.jsx";

import widthOptions from "../../components/MainSearchBlock/widthOptions.jsx";
import picsOptions from "../../components/Layout/picsOptions.jsx";

import styles from "./PassengersPage.module.scss";

function PassengersPage() {
   return (
      <Layout
      pic={picsOptions.search}
      searchBlock={<MainSearchBlock width={widthOptions.wide} />}
   >
      <ProgressBar step={2} />

         <div className={styles.body}>
            <SidebarDetails />

            <div className={styles["wrapper-main"]}>
               <PassengersSelection />
            </div>
         </div>
      </Layout>
   );
}

export default PassengersPage;