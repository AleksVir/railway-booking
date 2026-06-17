import React, { useState, useRef, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

import PassengerCard from "./PassengerCard/PassengerCard.jsx";

import { selectSelectedSeats } from "../../store/slices/seatsSlice.jsx";
import { selectPassengers } from "../../store/slices/passengersSlice.jsx";

import links from "../../data/links.jsx";
import passengerTypes from "../SeatsSelection/SelectionBlock/passengerTypes.jsx";
import directions from "../../data/directions.jsx";

import plus from "./img/plus.svg";

import styles from "./PassengersSelection.module.scss";

const seatsModifier = (obj) =>
   obj
      .map((el) =>
         el.seats.map((item) => ({
            ...item,
            coachId: el.coachId,
            coachName: el.coachName,
         }))
      )
      .flat();

function PassengersSelection() {
   const navigate = useNavigate();

   const [passArray, setPassArray] = useState([]);

   const seatsDep =
      useSelector(selectSelectedSeats)?.[directions.departure] || [];
   const seatsArr =
      useSelector(selectSelectedSeats)?.[directions.arrival] || [];

   const passengers = useSelector(selectPassengers) || [];

   const seatsDepModified = seatsModifier(seatsDep);
   const seatsArrModified = seatsModifier(seatsArr);

   const unchosenSeatsDep = useMemo(
      () => seatsDepModified.filter((el) => el.passengerId === null),
      [seatsDepModified]
   );

   const unchosenSeatsArr = useMemo(
      () => seatsArrModified.filter((el) => el.passengerId === null),
      [seatsArrModified]
   );

   const unchosenSeats = useMemo(
      () => [...unchosenSeatsDep, ...unchosenSeatsArr],
      [unchosenSeatsDep, unchosenSeatsArr]
   );

   const forwardBtn = useRef(null);

   useEffect(() => {
      if (unchosenSeats.length === 0) {
         forwardBtn?.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
         });
      }
   }, [unchosenSeats]);

   useEffect(() => {
      passengers.forEach((pas) => {
         const exists = passArray.find((item) => item.id === pas.id);
         if (!exists) {
            setPassArray((prev) => [...prev, { id: pas.id }]);
         }
      });

      if (
         unchosenSeats.length > 0 &&
         passengers.filter((pas) => !pas.seatArr && !pas.seatDep).length <= 0
      ) {
         setPassArray((prev) => [...prev, { id: nanoid() }]);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const unchosenAdultSeats = unchosenSeats.filter(
      (el) => el.priceCoefficient === 1
   );

   const clickOnAddPassHandler = () => {
      if (unchosenSeats.length > 0) {
         setPassArray((prev) => [...prev, { id: nanoid() }]);
      }
   };

   const clickOnNextPassHandler = (id) => {
      const index = passArray.findIndex((el) => el.id === id);

      if (index === passArray.length - 1 && unchosenSeats.length > 0) {
         setPassArray((prev) => [...prev, { id: nanoid() }]);
      } else {
         const element = document.getElementById(
            passArray[index + 1].id
         );
         element?.scrollIntoView({ behavior: "smooth" });
      }
   };

   const clickOnRemovePassHandler = (id) => {
      setPassArray((prev) => prev.filter((el) => el.id !== id));
   };

   const clickHandler = () => {
      navigate(links.paymentOptions);
   };

   const canGoNext = seatsDep.length > 0 || seatsArr.length > 0;

   return (
      <div>
         {passArray.map((item, index) => (
            <PassengerCard
               key={item.id}
               passengerType={
                  unchosenAdultSeats.length >= 1
                     ? passengerTypes.adults
                     : passengerTypes.children
               }
               id={item.id}
               pasNumber={index + 1}
               clickOnRemovePassHandler={clickOnRemovePassHandler}
               clickOnNextPassHandler={clickOnNextPassHandler}
               unchosenSeats={unchosenSeats}
               unchosenSeatsDep={unchosenSeatsDep}
               unchosenSeatsArr={unchosenSeatsArr}
            />
         ))}

         {unchosenSeats.length > 0 && (
            <button
               type="button"
               className={styles.addPassenger}
               onClick={clickOnAddPassHandler}
            >
               <span className={styles.text}>Добавить пассажира</span>
               <img src={plus} alt="иконка - добавить" />
            </button>
         )}

         {(seatsDep.length > 0 || seatsArr.length > 0) && (
            <div className={styles.buttonWrapper}>
               <button
   ref={forwardBtn}
   onClick={clickHandler}
   type="button"
   disabled={!canGoNext}
>
   далее
</button>
            </div>
         )}
      </div>
   );
}

export default PassengersSelection;