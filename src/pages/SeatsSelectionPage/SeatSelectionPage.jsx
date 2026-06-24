import React from "react";
import { useSelector } from "react-redux";

import Layout from "../../components/Layout/Layout.jsx";
import SidebarSelection from "../../components/SidebarSelection/SidebarSelection.jsx";
import MainSearchBlock from "../../components/MainSearchBlock/MainSearchBlock.jsx";
import ProgressBar from "../../components/ProgressBar/ProgressBar.jsx";
import LastTickets from "../../components/LastTickets/LastTickets.jsx";
import SeatsSelection from "../../components/SeatsSelection/SeatsSelection.jsx";
import Redirect from "../../components/Redirect/Redirect.jsx";

import { selectIndex } from "../../store/slices/trainSlice.jsx";

import widthOptions from "../../components/MainSearchBlock/widthOptions.jsx";
import picsOptions from "../../components/Layout/picsOptions.jsx";

import styles from "./SeatsSelectionPage.module.scss";

function SeatsSelectionPage() {
   const selectedTrainIndex = useSelector(selectIndex);

   return (
      <Layout
      pic={picsOptions.search}
      searchBlock={<MainSearchBlock width={widthOptions.wide} />}
   >
      <ProgressBar step={1} />

         <div className={styles.body}>
            {selectedTrainIndex !== null ? (
               <>
                  <div>
                     <SidebarSelection />
                     <LastTickets />
                  </div>

                  <div className={styles["wrapper-main"]}>
                     <SeatsSelection />
                  </div>
               </>
            ) : (
               <Redirect />
            )}
         </div>
      </Layout>
   );
}

export default SeatsSelectionPage;