import React from "react";
import PropTypes from "prop-types";

import HeaderNavigation from "./Navigation/HeaderNavigation.jsx";
import Footer from "./Footer/Footer.jsx";

import styles from "./Layout.module.scss";

function Layout({ pic, heroLeft, heroRight, searchBlock, children }) {
   return (
      <div className={styles.wrapper}>

         <header className={`${styles.header} ${styles[`header-${pic}`]}`}>

            <div className={styles.navFull}>
               <HeaderNavigation />
            </div>

            <div className={styles.hero}>
               <div
                  className={`${styles.heroInner} ${
                     pic !== "main" ? styles.heroInnerCompact : ""
                  }`}
               >

                  <div className={styles.heroLeft}>
                     {heroLeft}

                     {searchBlock}
                  </div>

                  <div className={styles.heroRight}>
                     {heroRight}
                  </div>

               </div>
            </div>

         </header>

         <main className={styles.main}>
            {children}
         </main>

         <Footer />
      </div>
   );
}

Layout.propTypes = {
   pic: PropTypes.string.isRequired,
   heroLeft: PropTypes.node,
   heroRight: PropTypes.node,
   searchBlock: PropTypes.node,
   children: PropTypes.node,
};

export default Layout;