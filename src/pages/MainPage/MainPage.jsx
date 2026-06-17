import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Layout from "../../components/Layout/Layout.jsx";
import AboutUs from "../../components/AboutUs/AboutUs.jsx";
import Reviews from "../../components/Reviews/Reviews.jsx";
import HowItWorks from "../../components/HowItWorks/HowItWorks.jsx";
import MainSearchBlock from "../../components/MainSearchBlock/MainSearchBlock.jsx";

import { removeOrderData } from "../../store/slices/orderSlice.jsx";

import picsOptions from "../../components/Layout/picsOptions.jsx";
import widthOptions from "../../components/MainSearchBlock/widthOptions.jsx";

import styles from "./MainPage.module.scss";

function MainPage() {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(removeOrderData());
   }, [dispatch]);

   return (
      <Layout
         pic={picsOptions.main}
         heroLeft={
            <h1 className={styles.title}>
               Вся жизнь - <span className={styles.titleBold}>путешествие!</span>
            </h1>
         }
         heroRight={
            <MainSearchBlock width={widthOptions.regular} />
         }
      >
         <div id="about">
            <AboutUs />
         </div>

         <div id="how-it-works">
            <HowItWorks />
         </div>

         <div id="reviews">
            <Reviews />
         </div>
      </Layout>
   );
}

export default MainPage;