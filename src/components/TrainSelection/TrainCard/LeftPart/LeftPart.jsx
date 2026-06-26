import React from "react";
import PropTypes from "prop-types";

import train from "./img/train.svg";
import arrow from "./img/arrow.svg";

import styles from "./LeftPart.module.scss";

function LeftPart({ depTrain, arrTrain, depFrom, depTo, arrTo }) {
   const getTrainName = (name) => {
      if (!name || name.toLowerCase() === "undefined") {
         return "Поезд";
      }

      return name;
   };

   return (
      <>
         <div className={styles.img}>
            <img src={train} alt="иконка поезда" />
         </div>

         <span className={styles["train-name"]}>
            {getTrainName(depTrain)}
         </span>

         <span className={styles["departure-city"]}>
            {depFrom || ""}
            <img
               className={styles["departure-arrow"]}
               src={arrow}
               alt="иконка - стрелка"
            />
         </span>

         <span className={styles["arrival-city"]}>
            {depTo || ""}
            {arrTrain && arrTrain.toLowerCase() !== "undefined" && (
               <img
                  className={styles["departure-arrow"]}
                  src={arrow}
                  alt="иконка - стрелка"
               />
            )}
         </span>

         {arrTrain && arrTrain.toLowerCase() !== "undefined" && (
            <>
               <span className={styles["arrival-city"]}>
                  {arrTo || ""}
               </span>

               <span className={styles["train-name"]}>
   {getTrainName(depTrain)}
</span>
            </>
         )}
      </>
   );
}

LeftPart.propTypes = {
   depTrain: PropTypes.string,
   depFrom: PropTypes.string,
   depTo: PropTypes.string,
   arrTrain: PropTypes.string,
   arrTo: PropTypes.string,
};

LeftPart.defaultProps = {
   depTrain: "",
   depFrom: "",
   depTo: "",
   arrTrain: "",
   arrTo: "",
};

export default LeftPart;