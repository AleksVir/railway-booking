import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Select } from "antd";
import PropTypes from "prop-types";

import { selectSort, changeSort } from "../../../../store/slices/sortSlice.jsx";

import "antd/dist/antd.css";
import "./SelectItem.scss";

function SelectItem({ options, onChangeFilters }) {
   const dispatch = useDispatch();
   const activeOption = useSelector(selectSort);

   const handleChange = (value) => {
      dispatch(changeSort(value));
      onChangeFilters();
   };

   return (
      <div className="select-item">
         <Select
   options={options}
   value={activeOption}
   onChange={handleChange}
   labelInValue
   variant="borderless"
   classNames={{
      popup: {
         root: "filters-select"
      }
   }}
/>
      </div>
   );
}

SelectItem.propTypes = {
   options: PropTypes.arrayOf(
      PropTypes.shape({
         value: PropTypes.string.isRequired,
         label: PropTypes.string.isRequired,
      })
   ).isRequired,
   onChangeFilters: PropTypes.func.isRequired,
};

export default SelectItem;