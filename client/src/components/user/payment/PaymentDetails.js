import React, { useState, useContext, useEffect } from "react";
import Header from "../../shared-components/Header";
import { Flex, Form } from "antd";
import PaymentSteppers from "./PaymentSteppers";
import OrderList from "./OrderList";
import UserInfo from "./UserInfo";
import "./PaymentDetails.css";
import { OrderContext } from "../../../providers/OrderProvider";
import { cloneDeep } from "lodash";
import {
  createUser,
  createOrder,
  handleError,
} from "../../../services/endpoint-services";
import * as messages from "../../../services/messages";
import { useNavigate } from "react-router-dom";

export const PaymentDetails = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const { countNoOrders, setCountNoOrders, listOfOrders, setListOfOrders } =
    useContext(OrderContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userInfoForm] = Form.useForm();

  const updateAmount = (itemIndex, action) => {
    let listOfCloneOrders = cloneDeep(listOfOrders);
    if (action === "increase") {
      const currentAmount = listOfCloneOrders[itemIndex].amount;
      if (
        currentAmount < listOfCloneOrders[itemIndex].productDetails.countInStock
      ) {
        listOfCloneOrders[itemIndex].amount = currentAmount + 1;
      }
    } else if (action === "decrease") {
      const currentAmount = listOfCloneOrders[itemIndex].amount;
      if (currentAmount === 1) {
        deleteOrder(itemIndex);
      }
      if (currentAmount > 1) {
        listOfCloneOrders[itemIndex].amount = currentAmount - 1;
      }
    }
    setListOfOrders(listOfCloneOrders);
    setLocalStorage();
  };

  const updateSelectedSize = (itemIndex, sizeVal) => {
    let listOfCloneOrders = cloneDeep(listOfOrders);
    listOfCloneOrders[itemIndex].selectedSize = sizeVal;
    setListOfOrders(listOfCloneOrders);
    setLocalStorage();
  };

  const deleteOrder = (itemIndex) => {
    let count = cloneDeep(countNoOrders);
    let listOfCloneOrders = cloneDeep(listOfOrders);
    listOfCloneOrders.splice(itemIndex);
    count = count - 1;
    setListOfOrders(listOfCloneOrders);
    setCountNoOrders(count);
    setLocalStorage();
    // if (listOfCloneOrders.length == 0) {
    //   clearLocalStorage();
    //   setListOfOrders([]);
    //   setCountNoOrders(0);
    // } else {
    //   setListOfOrders(listOfCloneOrders);
    //   setCountNoOrders(count);
    //   setLocalStorage();
    // }
  };

  const calTotalPrice = () => {
    const initialValue = 0;
    const totalPrice = listOfOrders.reduce((accumulator, currentValue) => {
      const price = currentValue.productDetails.size.find(
        (item) => item.sizeValue === currentValue.selectedSize
      ).price;
      return accumulator + currentValue.amount * price;
    }, initialValue);
    return totalPrice;
  };

  const setLocalStorage = () => {
    localStorage.setItem("countNoOrders", countNoOrders);
    localStorage.setItem("listOfOrders", JSON.stringify(listOfOrders));
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("countNoOrders");
    localStorage.removeItem("listOfOrders");
  };

  useEffect(() => {
    const total = calTotalPrice();
    setTotalPrice(total);
  }, [listOfOrders]);

  const steps = [
    {
      title: "Thông tin đơn hàng",
      content: (
        <OrderList
          totalPrice={totalPrice}
          updateAmount={updateAmount}
          updateSelectedSize={updateSelectedSize}
          deleteOrder={deleteOrder}
        />
      ),
    },
    {
      title: "Đặt hàng",
      content: <UserInfo userInfoForm={userInfoForm} />,
    },
  ];

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const completeStep = () => {
    const prepareUserInfo = {
      name: userInfoForm.getFieldValue("fullName"),
      phone: userInfoForm.getFieldValue("phone"),
      address: userInfoForm.getFieldValue("address"),
    };
    createUser(prepareUserInfo)
      .then((res) => {
        if (res && res.status === 200 && res.data.newUser) {
          const prepareOrderItems = listOfOrders.map((item) => {
            return {
              product: item.productDetails._id,
              amount: item.amount,
              size: item.selectedSize,
            };
          });
          const prepareOrderData = {
            orderItems: prepareOrderItems,
            totalPrice,
            user: res.data.newUser._id,
          };
          createOrder(prepareOrderData)
            .then((res) => {
              if (res && res.status === 200) {
                messages.success();
                clearLocalStorage();
                window.location.reload();
                navigate('/');
              }
            })
            .catch((err) => {
              handleError(err);
              messages.error();
            });
        }
      })
      .catch((err) => {
        handleError(err);
        messages.error();
      });
  };

  return (
    <>
      <Header />
      <h1 className="paymentHeading">Thanh toán</h1>
      <Flex className="paymentContainer" align="center" justify="center">
        <div className="paymentStepperContainer">
          <PaymentSteppers
            steps={steps}
            current={currentStep}
            isDisabledNextStepBtn={listOfOrders.length === 0}
            handleClickNextStep={nextStep}
            handleClickPreviousStep={prevStep}
            handleComplete={completeStep}
          />
        </div>
      </Flex>
    </>
  );
};

export default PaymentDetails;
