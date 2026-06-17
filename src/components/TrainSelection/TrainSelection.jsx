import React from "react";
import { useSelector } from "react-redux";

import TrainCard from "./TrainCard/TrainCard.jsx";

import {
   selectLoading,
   selectError,
   selectTrainsOptions,
} from "../../store/slices/trainsSlice.jsx";

import styles from "./TrainSelection.module.scss";

function TrainSelection() {
   const loading = useSelector(selectLoading);
   const error = useSelector(selectError);
   const trainsOptions = useSelector(selectTrainsOptions);

   // защита от undefined
   const safeTrains = Array.isArray(trainsOptions) ? trainsOptions : [];

   if (loading) {
      return (
         <section className={styles.trainSelection}>
            <div className={styles.text}>Загрузка поездов...</div>
         </section>
      );
   }

   return (
      <section className={styles.trainSelection}>
         {error && <div className={styles.error}>{error}</div>}

         {safeTrains.length > 0 ? (
            safeTrains.map((item) => (
               <TrainCard
                  key={item.id}
                  ticket={item.ticket}
                  id={item.id}
               />
            ))
         ) : (
            <div className={styles.text}>
               Поезда не найдены. Выберите другую дату или маршрут
            </div>
         )}
      </section>
   );
}

export default TrainSelection;