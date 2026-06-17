import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Form, Input, InputNumber, Radio } from "antd";

import {
   addPersonalData,
   selectPersonalData,
} from "../../store/slices/personalDataSlice.jsx";

import { selectPassengers } from "../../store/slices/passengersSlice.jsx";

import links from "../../data/links.jsx";
import fieldNames from "./fieldNames.jsx";
import rules from "./rules.jsx";
import paymentTypes from "./paymentTypes.jsx";

import passengerTypes from "../SeatsSelection/SelectionBlock/passengerTypes.jsx";

import styles from "./PaymentOptions.module.scss";
import "./PaymentOptions.scss";

function PaymentOptions() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [form] = Form.useForm();

   const personalData = useSelector(selectPersonalData);
   const passengers = useSelector(selectPassengers);

   const firstAdult = passengers?.find(
      (pas) => pas.passengerType === passengerTypes.adults
   );

   let initialValues = undefined;

   if (personalData?.[fieldNames.firstName]) {
      initialValues = personalData;
   }

   if (
      !personalData?.[fieldNames.firstName] &&
      firstAdult?.[fieldNames.firstName]
   ) {
      initialValues = {
         [fieldNames.lastName]: firstAdult?.[fieldNames.lastName],
         [fieldNames.firstName]: firstAdult?.[fieldNames.firstName],
         [fieldNames.fathersName]: firstAdult?.[fieldNames.fathersName],
      };
   }

   const onChangeFullName = (evt) => {
      form.setFieldValue(evt.target.id, evt.target.value.toLowerCase());
   };

   // ✅ FIX: async + try/catch
   const clickHandler = async () => {
      try {
         const values = await form.validateFields();

         dispatch(addPersonalData(values));
         navigate(links.confirmOrder);
      } catch (error) {
         console.log("Form validation error:", error);
      }
   };

   return (
      <>
         <section className={styles.card}>
            <Form
               form={form}
               layout="vertical"
               scrollToFirstError
               initialValues={initialValues}
            >
               <div className={`${styles.header} ${styles.section}`}>
                  Персональные данные
               </div>

               <div className={styles.section}>
                  <Form.Item
                     name={fieldNames.lastName}
                     label={fieldNames.lastNameLabel}
                     rules={rules.lastName}
                  >
                     <Input className={styles.inputField} />
                  </Form.Item>

                  <Form.Item
                     name={fieldNames.firstName}
                     label={fieldNames.firstNameLabel}
                     rules={rules.firstName}
                  >
                     <Input className={styles.inputField} />
                  </Form.Item>

                  <Form.Item
                     name={fieldNames.fathersName}
                     label={fieldNames.fathersNameLabel}
                     rules={rules.fathersName}
                  >
                     <Input className={styles.inputField} />
                  </Form.Item>

                  <Form.Item
   name={fieldNames.phone}
   label={fieldNames.phoneLabel}
   rules={[
      {
         required: true,
         message: "Введите номер телефона",
      },
      {
         pattern: /^\d{10}$/,
         message: "Введите 10 цифр без +7",
      },
   ]}
>
   <Input
      className={styles.inputField}
      placeholder="9991234567"
      maxLength={10}
   />
</Form.Item>

                  <Form.Item
                     name={fieldNames.email}
                     label={fieldNames.emailLabel}
                     rules={rules.email}
                  >
                     <Input className={styles.inputField} />
                  </Form.Item>
               </div>

               <div className={`${styles.header} ${styles.section}`}>
                  Способ оплаты
               </div>

               <Form.Item
                  name={fieldNames.paymentMethod}
                  rules={rules.paymentMethod}
               >
                  <Radio.Group>
                     <Radio value={paymentTypes.onlineEng}>
                        Онлайн
                     </Radio>

                     <Radio value={paymentTypes.cashEng}>
                        Наличные
                     </Radio>
                  </Radio.Group>
               </Form.Item>
            </Form>
         </section>

         {/* ✅ FIX: type="button" */}
         <div className={styles.buttonWrapper}>
            <button type="button" onClick={clickHandler}>
               купить билеты
            </button>
         </div>
      </>
   );
}

export default PaymentOptions;