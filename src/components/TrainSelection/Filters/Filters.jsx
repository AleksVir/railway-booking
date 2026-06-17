import React from "react";
import { useSelector, useDispatch } from "react-redux";

import SelectItem from "./SelectItem/SelectItem.jsx";
import Button from "./Button/Button.jsx";

import { selectTotalCount } from "../../../store/slices/trainsSlice.jsx";
import { changeOffset, setCurrentPage } from "../../../store/slices/sortSlice.jsx";

import styles from "./Filters.module.scss";

const sortOptions = [
   { value: "date", label: "времени" },
   { value: "price__min", label: "стоимости" },
   { value: "duration", label: "длительности" },
];

const amounts = [5, 10, 20];

function Filters() {
   const dispatch = useDispatch();
   const totalCount = useSelector(selectTotalCount);

   const onChangeFilters = () => {
      dispatch(setCurrentPage(1));
      dispatch(changeOffset(0));
   };

   return (
      <section className={styles.filters}>
         <div className={styles.found}>
            найдено {totalCount || 0}
         </div>

         <div className={styles.sort}>
            сортировать по:
            <SelectItem
               options={sortOptions}
               onChangeFilters={onChangeFilters}
            />
         </div>

         <div className={styles.show}>
            <span className={styles.show__title}>
               показывать по:
            </span>

            {amounts.map((amount) => (
               <Button
                  key={amount}
                  amount={amount}
                  className={styles.show__amount}
                  onChangeFilters={onChangeFilters}
               />
            ))}
         </div>
      </section>
   );
}

export default Filters;