import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import dayjs from "dayjs";

import { DatePicker, ConfigProvider } from "antd";
import ru_RU from "antd/lib/locale/ru_RU";

import "dayjs/locale/ru";
import "./Calendar.scss";

import consts from "../consts.jsx";
import links from "../../../data/links.jsx";

import {
   changeSearchFields,
   selectDepartureDate,
   selectReturnDate,
} from "../../../store/slices/searchSlice.jsx";

import { changeOffset, setCurrentPage } from "../../../store/slices/sortSlice.jsx";
import { removeTrainData } from "../../../store/slices/trainSlice.jsx";

dayjs.locale("ru");

function Calendar({ name, className }) {
   const { pathname } = useLocation();
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const departureDate = useSelector(selectDepartureDate);
   const returnDate = useSelector(selectReturnDate);

   // ❗ без useState
   const selectedDate =
      name === consts.depDate
         ? departureDate ? dayjs(departureDate) : null
         : returnDate ? dayjs(returnDate) : null;

   let minDate = dayjs();
   let maxDate = dayjs().add(100, "day");

   if (name === consts.retDate && departureDate) {
      minDate = dayjs(departureDate);
   }

   if (name === consts.depDate && returnDate) {
      maxDate = dayjs(returnDate);
   }

   const disabledDate = (current) =>
      current &&
      (current.isBefore(minDate, "day") || current.isAfter(maxDate, "day"));

   const changeHandler = (date) => {
      dispatch(
         changeSearchFields({
            name,
            value: date ? date.format("YYYY-MM-DD") : null,
         })
      );

      dispatch(changeOffset(0));
      dispatch(setCurrentPage(1));
      dispatch(removeTrainData());

      if (pathname === links.seats) {
         navigate(links.trains);
      }
   };

   return (
      <ConfigProvider locale={ru_RU}>
         <DatePicker
            className={className}
            placeholder="дд/мм/гг"
            onChange={changeHandler}
            disabledDate={disabledDate}
            format="DD/MM/YY"
            allowClear
            showToday={false}
            value={selectedDate}
         />
      </ConfigProvider>
   );
}

Calendar.propTypes = {
   name: PropTypes.string.isRequired,
   className: PropTypes.string.isRequired,
};

export default Calendar;