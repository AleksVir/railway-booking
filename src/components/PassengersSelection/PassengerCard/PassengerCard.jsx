import React, {
   useState,
   useRef,
   useEffect,
   useCallback,
   useMemo,
} from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import dayjs from "dayjs";
import "dayjs/locale/ru";
dayjs.locale("ru");

import {
   Form,
   Select,
   Input,
   Checkbox,
   ConfigProvider,
   Radio,
   Button,
   InputNumber,
   Alert,
   DatePicker,
} from "antd";

import ru_RU from "antd/locale/ru_RU";

import { addPassengerId } from "../../../store/slices/seatsSlice.jsx";
import {
   addNewPassenger,
   editPassengerData,
   removePassenger,
   selectPassengers,
} from "../../../store/slices/passengersSlice.jsx";
import { selectSelectedCoaches } from "../../../store/slices/trainSlice.jsx";

import minusRound from "../img/minus-round.svg";
import cross from "../img/cross.svg";
import plusRound from "../img/plus-round.svg";

import passengerTypes from "../../SeatsSelection/SelectionBlock/passengerTypes.jsx";
import pasTypesRus from "../../SeatsSelection/SelectionBlock/pasTypesRus.jsx";
import docTypes from "./docTypes.jsx";
import directions from "../../../data/directions.jsx";
import fieldNames from "./fieldNames.jsx";
import rules from "./rules.jsx";

import styles from "./PassengerCard.module.scss";
import links from "../../../data/links.jsx";

function PassengerCard({
   passengerType,
   pasNumber,
   clickOnRemovePassHandler,
   clickOnNextPassHandler,
   id,
   unchosenSeats,
   unchosenSeatsDep,
   unchosenSeatsArr,
}) {
   const dispatch = useDispatch();

   const thisPassenger = useSelector(selectPassengers).filter(
      (pas) => pas.id === id
   );

   const coaches = useSelector(selectSelectedCoaches);

   const [expanded, setExpanded] = useState(true);
   const [showError, setShowError] = useState(false);
   const [departureOnly, setDepartureOnly] = useState(!unchosenSeatsArr);
   const [disabledForwardBtn, setDisabledForwardBtn] = useState(false);
   const [form] = Form.useForm();

   const passenger = thisPassenger[0];

   const [documentType, setDocumentType] = useState(
      passenger?.documentType ||
         (passengerType === passengerTypes.adults
            ? docTypes.passport
            : docTypes.birthCertif)
   );

   const safeArr = unchosenSeatsArr || [];

   const unchosenSeatsAdults = (unchosenSeats || []).filter(
      (el) => el.priceCoefficient === 1
   ).length;

   const unchosenSeatsChildren = (unchosenSeats || []).filter(
      (el) => el.priceCoefficient === 0.5
   ).length;

   const [unchosenSeatsDepSourse, setUnchosenSeatsDepSourse] = useState(
      (unchosenSeatsDep || []).filter(
         (el) =>
            el.priceCoefficient ===
            (passengerType === passengerTypes.adults ? 1 : 0.5)
      )
   );

   const [unchosenSeatsArrSourse, setUnchosenSeatsArrSourse] = useState(
      safeArr.length > 0
         ? safeArr.filter(
              (el) =>
                 el.priceCoefficient ===
                 (passengerType === passengerTypes.adults ? 1 : 0.5)
           )
         : []
   );

   const seatsFilter = useCallback(
      (coef) => {
         setUnchosenSeatsDepSourse(
            (unchosenSeatsDep || []).filter(
               (el) => el.priceCoefficient === coef
            )
         );

         if (safeArr.length > 0 && !departureOnly) {
            setUnchosenSeatsArrSourse(
               safeArr.filter((el) => el.priceCoefficient === coef)
            );
         }
      },
      [departureOnly, unchosenSeatsDep, safeArr]
   );

   const disabledDate = (current) =>
      current && current > dayjs().endOf("day");

   const clickOnHeaderHandler = () => setExpanded((v) => !v);

   const clickOnRemoveCardHandler = () => {
      dispatch(removePassenger(id));
      clickOnRemovePassHandler(id);
   };

   const onFinish = (values) => {
      dispatch(
         addNewPassenger({
            id,
            ...values,
            dateOfBirth: values.dateOfBirth?.format("DD.MM.YYYY"),
         })
      );
   };

   const seatInfo = passenger?.seatDep || passenger?.seatArr;

   const button = (
      <Form.Item>
         {!passenger && !disabledForwardBtn && (
            <Button type="primary" htmlType="submit">
               Следующий пассажир
            </Button>
         )}
         {passenger && (
            <button type="submit" className={styles.changeButton}>
               Изменить
            </button>
         )}
      </Form.Item>
   );

   return (
      <div id={id} ref={useRef(null)}>
         {!expanded && (
            <button onClick={clickOnHeaderHandler}>
               Пассажир {pasNumber}
            </button>
         )}

         {expanded && (
            <div className={styles.passengerCard}>
               <div className={styles.passengerCard__header}>
                  <span>Пассажир {pasNumber}</span>
                  <button onClick={clickOnRemoveCardHandler}>
                     <img src={cross} alt="remove" />
                  </button>
               </div>

               <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
                  initialValues={{
                     passengerType,
                     documentType:
                        passengerType === passengerTypes.adults
                           ? docTypes.passport
                           : docTypes.birthCertif,
                  }}
               >
                 <Form.Item name={fieldNames.dateOfBirth}>
   <DatePicker
      format="DD.MM.YYYY"
      disabledDate={disabledDate}
   />
</Form.Item>

                  <Form.Item name={fieldNames.passengerType}>
                     <Select>
                        <Select.Option value={passengerTypes.adults}>
                           Взрослый
                        </Select.Option>
                        <Select.Option value={passengerTypes.children}>
                           Ребёнок
                        </Select.Option>
                     </Select>
                  </Form.Item>

                  <Form.Item name={fieldNames.lastName}>
                     <Input placeholder="Фамилия" />
                  </Form.Item>

                  <Form.Item name={fieldNames.firstName}>
                     <Input placeholder="Имя" />
                  </Form.Item>

                  <Form.Item name={fieldNames.fathersName}>
                     <Input placeholder="Отчество" />
                  </Form.Item>

                  <Form.Item name={fieldNames.gender}>
                     <Radio.Group>
                        <Radio value="true">М</Radio>
                        <Radio value="false">Ж</Radio>
                     </Radio.Group>
                  </Form.Item>

                  {seatInfo && <div>Место выбрано</div>}

                  {button}
               </Form>
            </div>
         )}
      </div>
   );
}

PassengerCard.propTypes = {
   passengerType: PropTypes.string.isRequired,
   pasNumber: PropTypes.number.isRequired,
   clickOnRemovePassHandler: PropTypes.func.isRequired,
   clickOnNextPassHandler: PropTypes.func.isRequired,
   id: PropTypes.string.isRequired,
   unchosenSeats: PropTypes.array,
   unchosenSeatsDep: PropTypes.array,
   unchosenSeatsArr: PropTypes.array,
};

export default PassengerCard;