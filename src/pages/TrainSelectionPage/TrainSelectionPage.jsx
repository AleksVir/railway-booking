import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import Layout from "../../components/Layout/Layout.jsx";
import SidebarSelection from "../../components/SidebarSelection/SidebarSelection.jsx";
import MainSearchBlock from "../../components/MainSearchBlock/MainSearchBlock.jsx";
import ProgressBar from "../../components/ProgressBar/ProgressBar.jsx";
import LastTickets from "../../components/LastTickets/LastTickets.jsx";
import Filters from "../../components/TrainSelection/Filters/Filters.jsx";
import TrainSelection from "../../components/TrainSelection/TrainSelection.jsx";
import PaginationItem from "../../components/TrainSelection/Pagination/Pagination.jsx";
import LoadingAnimation from "../../components/TrainSelection/LoadingAnimation/LoadingAnimation.jsx";

import { fetchTrainsOptions, fetchLastTickets } from "../../store/thunks/asyncThunks.jsx";

import {
   selectLimit,
   selectCurrentPage,
   changeOffset,
   setCurrentPage,
} from "../../store/slices/sortSlice.jsx";

import {
   selectDepartureCity,
   selectArrivalCity,
   selectDepartureDate,
} from "../../store/slices/searchSlice.jsx";

import {
   selectTotalCount,
   selectLoading as selectLoadingTrains,
} from "../../store/slices/trainsSlice.jsx";

import { selectLoading as selectLoadingLastTickets } from "../../store/slices/lastTicketsSlice.jsx";

import { removeTrainData } from "../../store/slices/trainSlice.jsx";
import { removeSeatsData } from "../../store/slices/seatsSlice.jsx";
import { removeSeatInfo } from "../../store/slices/passengersSlice.jsx";

import widthOptions from "../../components/MainSearchBlock/widthOptions.jsx";
import picsOptions from "../../components/Layout/picsOptions.jsx";

import styles from "./TrainSelectionPage.module.scss";

function TrainSelectionPage() {
   const dispatch = useDispatch();

   const limit = useSelector(selectLimit) ?? 10;
   const total = useSelector(selectTotalCount) ?? 0;
   const currentPage = useSelector(selectCurrentPage) ?? 1;

   const departureCity = useSelector(selectDepartureCity);
   const arrivalCity = useSelector(selectArrivalCity);
   const departureDate = useSelector(selectDepartureDate);

   const loadingTrains = useSelector(selectLoadingTrains);
   const loadingLastTickets = useSelector(selectLoadingLastTickets);

   const departureId = departureCity?.id;
   const arrivalId = arrivalCity?.id;

   const TICKETS_API = import.meta.env.VITE_TICKETS;
   const LAST_TICKETS_API = import.meta.env.VITE_LAST_TICKETS;

   // ✅ ПРАВИЛЬНЫЙ URL
 const url = useMemo(() => {
   if (!departureId || !arrivalId || !TICKETS_API) {
      return null;
   }

   return `${TICKETS_API}?from_city_id=${departureId}&to_city_id=${arrivalId}`;
}, [departureId, arrivalId, TICKETS_API]);

   // загрузка поездов
   useEffect(() => {
      if (!url) return;
      dispatch(fetchTrainsOptions(url));
   }, [dispatch, url]);

   // очистка + last tickets
   useEffect(() => {
      dispatch(removeTrainData());
      dispatch(removeSeatsData());
      dispatch(removeSeatInfo());

      if (LAST_TICKETS_API) {
         dispatch(fetchLastTickets(LAST_TICKETS_API));
      }
   }, [dispatch, LAST_TICKETS_API]);

   const onChangePage = (value) => {
      dispatch(setCurrentPage(value));
      dispatch(changeOffset((value - 1) * limit));
   };

   if (loadingTrains || loadingLastTickets) {
      return (
         <Layout pic={picsOptions.search}>
            <LoadingAnimation />
         </Layout>
      );
   }


   return (
      <Layout pic={picsOptions.search}>
         <MainSearchBlock width={widthOptions.wide} />
         <ProgressBar step={1} />

         <div className={styles.body}>
            <div>
               <SidebarSelection />
               <LastTickets />
            </div>

            <div className={styles["wrapper-main"]}>
               <Filters />
               <TrainSelection />

               <PaginationItem
                  current={currentPage}
                  onChange={onChangePage}
                  total={total}
                  pageSize={limit}
               />
            </div>
         </div>
      </Layout>
   );
}

export default TrainSelectionPage;