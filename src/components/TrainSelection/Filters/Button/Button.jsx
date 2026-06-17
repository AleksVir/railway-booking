import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { changeLimit, selectLimit } from "../../../../store/slices/sortSlice.jsx";
import { selectTotalCount } from "../../../../store/slices/trainsSlice.jsx";

import styles from "./Button.module.scss";

function Button({ amount, className, onChangeFilters }) {
   const dispatch = useDispatch();
   const limit = useSelector(selectLimit);
   const totalCount = useSelector(selectTotalCount);

   const [active, setActive] = useState(false);

   useEffect(() => {
      setActive(limit === amount);
   }, [amount, limit]);

   const clickHandler = () => {
      dispatch(changeLimit(amount));
      onChangeFilters();
   };

   return (
      <button
         type="button"
         onClick={clickHandler}
         className={`${styles.button} ${active ? styles["button-active"] : ""} ${className}`}
         disabled={totalCount <= amount}
      >
         {amount}
      </button>
   );
}

Button.propTypes = {
   amount: PropTypes.number.isRequired,
   className: PropTypes.string,
   onChangeFilters: PropTypes.func.isRequired,
};

export default Button;