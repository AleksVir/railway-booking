import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import Coach from "./Coach/Coach.jsx";

import {
   selectSelectedCoaches,
   selectTrains,
} from "../../../../store/slices/trainSlice.jsx";
import { fetchSeats } from "../../../../store/thunks/asyncThunks.jsx";

import styles from "./CoachBlock.module.scss";

function CoachBlock({ direction, NumOfPplView, adultSeats, childrenSeats }) {
   const dispatch = useDispatch();

   const activeCoaches =
      useSelector(selectSelectedCoaches)?.[direction] || [];

   const train = useSelector(selectTrains)?.[direction];

   const TICKETS_API = import.meta.env.VITE_TICKETS;

   const url =
      train?._id && TICKETS_API
         ? `${TICKETS_API}/${train._id}/seats`
         : null;

   useEffect(() => {
      if (!url) return;

      dispatch(fetchSeats({ url, direction }));
   }, [direction, dispatch, url]);

   const classMaker = (index) => {
      if (index === 0) {
         return activeCoaches.length === 1
            ? styles.coaches
            : styles["coaches-first"];
      }

      if (index === activeCoaches.length - 1) {
         return styles["coaches-last"];
      }

      return styles["coaches-middle"];
   };

   return (
      <div className={styles.coaches}>
         {activeCoaches.length > 0 &&
            activeCoaches.map((coach, index) => (
               <Coach
                  adultSeats={adultSeats}
                  childrenSeats={childrenSeats}
                  key={coach.name}
                  className={classMaker(index)}
                  direction={direction}
                  NumOfPplView={NumOfPplView}
                  coachName={coach.name}
               />
            ))}

         {activeCoaches.length === 0 && (
            <div className={styles.noCoach}>
               Выберите вагон для отображения схемы
            </div>
         )}
      </div>
   );
}

CoachBlock.propTypes = {
   direction: PropTypes.string.isRequired,
   NumOfPplView: PropTypes.number.isRequired,
   adultSeats: PropTypes.number.isRequired,
   childrenSeats: PropTypes.number.isRequired,
};

export default CoachBlock;