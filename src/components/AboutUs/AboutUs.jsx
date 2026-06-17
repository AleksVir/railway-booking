import React from "react";

import about from "../../data/about/about.jsx";

import styles from "./AboutUs.module.scss";

function AboutUs() {
   return (
      <div className={styles.about} id="about">
         <div className={styles.about__inner}>
            <span className={styles.about__title}>о нас</span>
            <div className={styles.about__text}>{about}</div>
         </div>
      </div>
   );
}
export default AboutUs;
