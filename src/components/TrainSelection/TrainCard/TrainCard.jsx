import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import LeftPart from "./LeftPart/LeftPart.jsx";
import MiddlePart from "./MiddlePart/MiddlePart.jsx";
import RightPart from "./RightPart/RightPart.jsx";

import { setIndex, setTrains } from "../../../store/slices/trainSlice.jsx";

import arrowRight from "./img/arrow-right.svg";
import arrowLeft from "./img/arrow-left.svg";

import directions from "../../../data/directions.jsx";
import links from "../../../data/links.jsx";

import styles from "./TrainCard.module.scss";

function TrainCard({ ticket, id, editBtn }) {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const availableSeats = ticket?.available_seats_info;
   const priceDep = ticket?.departure?.price_info;
   const priceArr = ticket?.arrival?.price_info;

   const departureFrom = ticket?.departure?.from;
   const departureTo = ticket?.departure?.to;
   const arrivalFrom = ticket?.arrival?.from;
   const arrivalTo = ticket?.arrival?.to;

   const onClick = (evt) => {
      evt.preventDefault();

      if (!ticket?.departure) return;

      dispatch(setIndex(id));

      dispatch(
         setTrains({
            value: ticket.departure,
            direction: directions.departure,
         })
      );

      if (ticket.arrival) {
         dispatch(
            setTrains({
               value: ticket.arrival,
               direction: directions.arrival,
            })
         );
      }

      navigate(links.seats);
   };

   const depTrainName =
   ticket?.departure?.train?.name
      ?.replace(/^undefined/i, "Поезд")
      ?.replace(/^null/i, "Поезд") || "Поезд";

   return (
      <div className={styles.card} role="button" tabIndex={0}>
         <div className={styles.card__left}>
            <LeftPart
               depTrain={depTrainName}
               depFrom={ticket?.departure?.from?.city?.name}
               depTo={ticket?.departure?.to?.city?.name}
               arrTrain={ticket?.arrival?.train?.name}
               arrTo={ticket?.arrival?.to?.city?.name}
            />
         </div>

         <div className={styles.card__middle}>
            <MiddlePart
               depTime={departureFrom?.datetime}
               depCity={departureFrom?.city?.name}
               depStation={departureFrom?.railway_station_name}
               duration={ticket?.departure?.duration}
               arrow={arrowRight}
               arrTime={departureTo?.datetime}
               arrCity={departureTo?.city?.name}
               arrStation={departureTo?.railway_station_name}
            />

            {ticket?.arrival && (
               <MiddlePart
                  depTime={arrivalFrom?.datetime}
                  depCity={arrivalFrom?.city?.name}
                  depStation={arrivalFrom?.railway_station_name}
                  duration={ticket?.arrival?.duration}
                  arrow={arrowLeft}
                  arrTime={arrivalTo?.datetime}
                  arrCity={arrivalTo?.city?.name}
                  arrStation={arrivalTo?.railway_station_name}
               />
            )}
         </div>

         <div className={styles.card__right}>
            <RightPart
               id={id}
               onClick={onClick}
               availableSeats={availableSeats}
               priceDep={priceDep}
               priceArr={priceArr}
               wifi={ticket?.departure?.have_wifi || ticket?.arrival?.have_wifi}
               conditioner={
                  Boolean(ticket?.departure?.have_air_conditioning) ||
                  Boolean(ticket?.arrival?.have_air_conditioning)
               }
               express={
                  ticket?.departure?.is_express || ticket?.arrival?.is_express
               }
               editBtn={editBtn}
            />
         </div>
      </div>
   );
}

TrainCard.propTypes = {
   ticket: PropTypes.object,
   id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   editBtn: PropTypes.node,
};

TrainCard.defaultProps = {
   ticket: null,
   id: null,
   editBtn: null,
};

export default TrainCard;