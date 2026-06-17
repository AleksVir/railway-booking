import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AutoComplete } from "antd";

import useDebounce from "../../../hooks/useDebounce.jsx";

import {
   changeSearchFields,
} from "../../../store/slices/searchSlice.jsx";

import { changeOffset, setCurrentPage } from "../../../store/slices/sortSlice.jsx";
import { removeTrainData } from "../../../store/slices/trainSlice.jsx";

import consts from "../consts.jsx";

function Direction({ name, placeholder, className }) {
   const dispatch = useDispatch();

   const [value, setValue] = useState("");      // input
   const [options, setOptions] = useState([]);

   const debounced = useDebounce(value, 300);

   // ===== fetch =====
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
                  value: c.name,   // 👈 важно: value = текст
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

   // ===== select =====
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

   return (
      <AutoComplete
         className={className}
         placeholder={placeholder}
         options={options}
         value={value}
         onChange={setValue}
         onSelect={onSelect}
         filterOption={false}
         allowClear
      />
   );
}

export default Direction;