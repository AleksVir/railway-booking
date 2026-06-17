import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import info from "./img/info.svg";
import error from "./img/error.svg";

import styles from "./PopUp.module.scss";

function PopUp({ reason, message }) {
   const [open, setOpen] = useState(true);

   const img = reason === "info" ? info : error;

   const portalElement = document.getElementById("popups");

   // защита от краша
   if (!portalElement) return null;

   const popup = (
      <div className={styles.wrapper}>
         <div className={styles.popUp}>
            <div className={styles[`popUp__${reason}`]}>
               <img
                  className={styles.popUp__img}
                  src={img}
                  alt={`${reason} icon`}
               />
            </div>

            <div className={styles.popUp__wrapper}>
               <div className={styles.popUp__message}>
                  {message}
               </div>
            </div>

            <button
               className={styles.popUp__button}
               onClick={() => setOpen(false)}
               type="button"
            >
               понятно
            </button>
         </div>
      </div>
   );

   if (!open) return null;

   return ReactDOM.createPortal(popup, portalElement);
}

PopUp.propTypes = {
   reason: PropTypes.string.isRequired,
   message: PropTypes.string.isRequired,
};

export default PopUp;