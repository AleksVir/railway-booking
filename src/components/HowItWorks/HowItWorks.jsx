import React from "react";
import { HashLink } from "react-router-hash-link";
import { useLocation } from "react-router-dom";

import Card from "./Card/Card.jsx";

import cards from "../../data/how-it-works/how-it-works.jsx";
import styles from "./HowItWorks.module.scss";

function HowItWorks() {
   const { pathname } = useLocation();

   return (
      <section className={styles.how} id="how-it-works">
         <div className={styles.how__container}>

            <div className={styles.how__wrapperTop}>
               <div className={styles.how__title}>как это работает</div>

               <HashLink smooth to={`${pathname}/#contacts`}>
                  <button className={styles.how__btn} type="button">
                     Узнать больше
                  </button>
               </HashLink>
            </div>

            <div className={styles.how__steps}>
               {cards.map((card) => (
                  <Card key={card.id} img={card.img} text={card.text} />
               ))}
            </div>

         </div>
      </section>
   );
}

export default HowItWorks;
