import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AutoComplete } from "antd";

import useDebounce from "../../../hooks/useDebounce.jsx";

import {
   changeSearchFields,
   selectDepartureCity,
   selectArrivalCity,
} from "../../../store/slices/searchSlice.jsx";

import {
   changeOffset,
   setCurrentPage,
} from "../../../store/slices/sortSlice.jsx";

import { removeTrainData } from "../../../store/slices/trainSlice.jsx";

import consts from "../consts.jsx";

function Direction({ name, placeholder, className }) {
   const dispatch = useDispatch();

   const departureCity = useSelector(selectDepartureCity);
   const arrivalCity = useSelector(selectArrivalCity);

   const savedCity =
      name === consts.depCity ? departureCity : arrivalCity;

   const [value, setValue] = useState(savedCity?.name || "");
   const [options, setOptions] = useState([]);

   const debounced = useDebounce(value, 300);

   useEffect(() => {
      setValue(savedCity?.name || "");
   }, [savedCity]);

   useEffect(() => {
      const fetchCities = async () => {
         if (debounced.length < 2) {
            setOptions([]);
            return;
         }

         try {
            const res = await fetch(
               `https://students.netoservices.ru/fe-diplom/routes/cities?name=${debounced}`
            );

            const data = await res.json();

            setOptions(
               data.map((c) => ({
                  value: c.name,
                  label: c.name,
                  id: c._id,
               }))
            );
         } catch {
            setOptions([]);
         }
      };

      fetchCities();
   }, [debounced]);

   const onSelect = (_, option) => {
      dispatch(
         changeSearchFields({
            name,
            value: { id: option.id, name: option.value },
         })
      );

      dispatch(changeOffset(0));
      dispatch(setCurrentPage(1));
      dispatch(removeTrainData());

      setValue(option.value);
      setOptions([]);
   };

   const onChange = (newValue) => {
      setValue(newValue);

      if (!newValue) {
         dispatch(
            changeSearchFields({
               name,
               value: "",
            })
         );
      }
   };

   return (
      <AutoComplete
         className={className}
         placeholder={placeholder}
         options={options}
         value={value}
         onChange={onChange}
         onSelect={onSelect}
         filterOption={false}
         allowClear
      />
   );
}

export default Direction;