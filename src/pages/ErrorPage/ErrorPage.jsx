import React from "react";

import Layout from "../../components/Layout/Layout.jsx";
import MainSearchBlock from "../../components/MainSearchBlock/MainSearchBlock.jsx";
import ProgressBar from "../../components/ProgressBar/ProgressBar.jsx";
import Redirect from "../../components/Redirect/Redirect.jsx";

import widthOptions from "../../components/MainSearchBlock/widthOptions.jsx";
import picsOptions from "../../components/Layout/picsOptions.jsx";

import styles from "./ErrorPage.module.scss";

function ErrorPage() {
   const body = (
      <>
         <ProgressBar step={0} />
         <div className={styles.body}>
            <Redirect reason="error" />
         </div>
      </>
   );

   return (
      <Layout pic={picsOptions.search} body={body}>
         <MainSearchBlock width={widthOptions.wide} />
      </Layout>
   );
}

export default ErrorPage;
