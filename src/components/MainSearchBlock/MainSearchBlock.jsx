import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import Direction from "./Direction/Direction.jsx";
import Calendar from "./Calendar/Calendar.jsx";

import {
   swapValues,
   selectDepartureCity,
   selectArrivalCity,
   selectDepartureDate,
} from "../../store/slices/searchSlice.jsx";

import location from "./img/location.svg";
import arrows from "./img/arrows.svg";
import date from "./img/date.svg";

import consts from "./consts.jsx";
import links from "../../data/links.jsx";
import widthOptions from "./widthOptions.jsx";

import styles from "./MainSearchBlock.module.scss";

function MainSearchBlock({ width }) {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const departureCity = useSelector(selectDepartureCity);
   const arrivalCity = useSelector(selectArrivalCity);
   const departureDate = useSelector(selectDepartureDate);

   // ✅ ВАЛИДАЦИЯ (без useState)
   const isCitiesValid =
      departureCity?.name &&
      arrivalCity?.name &&
      departureCity?.name !== arrivalCity?.name;

   const isDateValid = !!departureDate;

   const isFormValid = isCitiesValid && isDateValid;

   // ===== CLASSNAME =====
   const formCN =
      width === widthOptions.wide
         ? `${styles.form} ${styles["form-wide"]}`
         : styles.form;

   const inputGroupCN =
      width === widthOptions.regular
         ? `${styles.inputGroup} ${styles["inputGroup-regular"]}`
         : `${styles.inputGroup} ${styles["inputGroup-wide"]} ${styles["inputGroup-directions"]}`;

   // ===== HANDLERS =====
   const submitHandler = (evt) => {
      evt.preventDefault();

      if (isFormValid) {
         navigate(links.trains);
      }
   };

   const swapHandler = (evt) => {
      evt.preventDefault();
      dispatch(swapValues());
   };

   // ===== RENDER =====
   return (
      <section
         className={`${styles.wrapper} ${
            width === widthOptions.wide ? styles.wide : styles.regular
         }`}
      >
         <form className={formCN} onSubmit={submitHandler}>
            {/* ===== НАПРАВЛЕНИЕ ===== */}
            <div className={inputGroupCN}>
               <div
                  className={`${styles.inputGroup__header} ${
                     !isCitiesValid ? styles["inputGroup__header-invalid"] : ""
                  }`}
               >
                  направление
               </div>

               <div className={styles.inputGroup__directions}>
                  <div className={styles.direction}>
                     <Direction
                        className={`${styles.direction__input} ${
                           !isCitiesValid
                              ? styles["direction__input-invalid"]
                              : ""
                        }`}
                        name={consts.depCity}
                        placeholder="откуда"
                     />

                     <div className={styles.direction__icon}>
                        <img src={location} alt="location" />
                     </div>
                  </div>

                  <button
                     onClick={swapHandler}
                     className={styles.buttonArrows}
                     type="button"
                  >
                     <img src={arrows} alt="swap" />
                  </button>

                  <div className={styles.direction}>
                     <Direction
                        className={`${styles.direction__input} ${
                           !isCitiesValid
                              ? styles["direction__input-invalid"]
                              : ""
                        }`}
                        name={consts.arrCity}
                        placeholder="куда"
                     />

                     <div className={styles.direction__icon}>
                        <img src={location} alt="location" />
                     </div>
                  </div>
               </div>
            </div>

            {/* ===== ДАТА ===== */}
            <div className={`${styles.inputGroup} ${styles["inputGroup-dates"]}`}>
               <div
                  className={`${styles.inputGroup__header} ${
                     !isDateValid ? styles["inputGroup__header-invalid"] : ""
                  }`}
               >
                  дата
               </div>

               <div className={styles.inputGroup__dates}>
                  <div className={styles.date}>
                     <Calendar
                        name={consts.depDate}
                        className={`${styles.date__input} ${
                           !isDateValid ? styles["date__input-invalid"] : ""
                        }`}
                     />

                     <div className={styles.date__icon}>
                        <img src={date} alt="calendar" />
                     </div>
                  </div>

                  <div className={styles.date}>
                     <Calendar
                        name={consts.retDate}
                        className={styles.date__input}
                     />

                     <div className={styles.date__icon}>
                        <img src={date} alt="calendar" />
                     </div>
                  </div>
               </div>
            </div>

            {/* ===== КНОПКА ===== */}
            <button
               type="submit"
               className={`${styles.button} ${
                  !isFormValid ? styles["button-invalid"] : ""
               }`}
               disabled={!isFormValid}
            >
               найти билеты
            </button>
         </form>
      </section>
   );
}

MainSearchBlock.propTypes = {
   width: PropTypes.string.isRequired,
};

export default MainSearchBlock;