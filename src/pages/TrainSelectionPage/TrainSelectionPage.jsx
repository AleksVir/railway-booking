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

import {
   fetchTrainsOptions,
   fetchLastTickets,
} from "../../store/thunks/asyncThunks.jsx";

import {
   selectLimit,
   selectCurrentPage,
   selectOffset,
   selectSort,
   changeOffset,
   setCurrentPage,
} from "../../store/slices/sortSlice.jsx";

import {
   selectDepartureCity,
   selectArrivalCity,
   selectDepartureDate,
  selectReturnDate,
} from "../../store/slices/searchSlice.jsx";

import {
   selectTotalCount,
   selectLoading as selectLoadingTrains,
} from "../../store/slices/trainsSlice.jsx";

import {
   selectOptions,
   selectPrices,
   selectTime,
} from "../../store/slices/sidebarSelectSlice.jsx";

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
   const offset = useSelector(selectOffset) ?? 0;
   const sort = useSelector(selectSort);

   const options = useSelector(selectOptions);
   const prices = useSelector(selectPrices);
   const time = useSelector(selectTime);

   const total = useSelector(selectTotalCount) ?? 0;
   const currentPage = useSelector(selectCurrentPage) ?? 1;

   const departureCity = useSelector(selectDepartureCity);
   const arrivalCity = useSelector(selectArrivalCity);
   const departureDate = useSelector(selectDepartureDate);
   const returnDate = useSelector(selectReturnDate);

   const loadingTrains = useSelector(selectLoadingTrains);
   const loadingLastTickets = useSelector(selectLoadingLastTickets);

   const departureId = departureCity?.id;
   const arrivalId = arrivalCity?.id;

   const TICKETS_API = import.meta.env.VITE_TICKETS;
   const LAST_TICKETS_API = import.meta.env.VITE_LAST_TICKETS;

   const url = useMemo(() => {
      if (!departureId || !arrivalId || !TICKETS_API) {
         return null;
      }

      const params = new URLSearchParams({
         from_city_id: departureId,
         to_city_id: arrivalId,
         limit: String(limit),
         offset: String(offset),
         sort: sort?.value || sort || "date",
      });

      if (departureDate) {
         params.append("date_start", departureDate);
      }

      if (returnDate) {
   params.append("date_end", returnDate);
}

      if (options?.firstClass) params.append("have_first_class", "true");
      if (options?.secondClass) params.append("have_second_class", "true");
      if (options?.thirdClass) params.append("have_third_class", "true");
      if (options?.fourthClass) params.append("have_fourth_class", "true");
      if (options?.wifi) params.append("have_wifi", "true");
      if (options?.express) params.append("is_express", "true");

      if (prices?.min) params.append("price_from", String(prices.min));
      if (prices?.max) params.append("price_to", String(prices.max));

      if (time?.to?.departure?.min !== 0) {
         params.append(
            "start_departure_hour_from",
            String(Math.floor(time.to.departure.min / 60))
         );
      }

      if (time?.to?.departure?.max !== 24 * 60) {
         params.append(
            "start_departure_hour_to",
            String(Math.floor(time.to.departure.max / 60))
         );
      }

      if (time?.to?.arrival?.min !== 0) {
         params.append(
            "start_arrival_hour_from",
            String(Math.floor(time.to.arrival.min / 60))
         );
      }

      if (time?.to?.arrival?.max !== 24 * 60) {
         params.append(
            "start_arrival_hour_to",
            String(Math.floor(time.to.arrival.max / 60))
         );
      }

      if (time?.back?.departure?.min !== 0) {
         params.append(
            "end_departure_hour_from",
            String(Math.floor(time.back.departure.min / 60))
         );
      }

      if (time?.back?.departure?.max !== 24 * 60) {
         params.append(
            "end_departure_hour_to",
            String(Math.floor(time.back.departure.max / 60))
         );
      }

      if (time?.back?.arrival?.min !== 0) {
         params.append(
            "end_arrival_hour_from",
            String(Math.floor(time.back.arrival.min / 60))
         );
      }

      if (time?.back?.arrival?.max !== 24 * 60) {
         params.append(
            "end_arrival_hour_to",
            String(Math.floor(time.back.arrival.max / 60))
         );
      }

      return `${TICKETS_API}?${params.toString()}`;
   }, [
      departureId,
      arrivalId,
      TICKETS_API,
      limit,
      offset,
      sort,
      departureDate,
      returnDate,
      options,
      prices,
      time,
   ]);

   useEffect(() => {
      if (!url) return;
      dispatch(fetchTrainsOptions(url));
   }, [dispatch, url]);

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
         <Layout
            pic={picsOptions.search}
            searchBlock={<MainSearchBlock width={widthOptions.wide} />}
         >
            <LoadingAnimation />
         </Layout>
      );
   }

   return (
      <Layout
         pic={picsOptions.search}
         searchBlock={<MainSearchBlock width={widthOptions.wide} />}
      >
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