import React, { useState, useEffect } from "react";
import Header from "../../shared-components/Header";
import { Flex, Form } from "antd";
import PaymentSteppers from "./PaymentSteppers";
import OrderList from "./OrderList";
import UserInfo from "./UserInfo";
import "./PaymentDetails.css";
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
  const [totalPrice, setTotalPrice] = useState(0);
  const [userInfoForm] = Form.useForm();
  const listOfOrders = JSON.parse(localStorage.getItem("listOfOrders"));
  const [forceRerender, setForceRerender] = useState(1);

  const updateAmount = (itemIndex, action) => {
    let listOfCloneOrders = cloneDeep(listOfOrders);
    const currentAmount = listOfCloneOrders[itemIndex].amount;

    if (action === "increase") {
      if (
        currentAmount < listOfCloneOrders[itemIndex].productDetails.countInStock
      ) {
        listOfCloneOrders[itemIndex].amount = currentAmount + 1;
        localStorage.setItem("listOfOrders", JSON.stringify(listOfCloneOrders));
        setForceRerender((cur) => cur + 1);
      }
    } else if (action === "decrease") {
      if (currentAmount === 1) {
        deleteOrder(itemIndex);
      }
      if (currentAmount > 1) {
        listOfCloneOrders[itemIndex].amount = currentAmount - 1;
        localStorage.setItem("listOfOrders", JSON.stringify(listOfCloneOrders));
        setForceRerender((cur) => cur + 1);
      }
    }
  };

  const updateSelectedSize = (itemIndex, sizeVal) => {
    let listOfCloneOrders = cloneDeep(listOfOrders);
    listOfCloneOrders[itemIndex].selectedSize = sizeVal;
    localStorage.setItem("listOfOrders", JSON.stringify(listOfCloneOrders));
    setForceRerender((cur) => cur + 1);
  };

  const deleteOrder = (itemIndex) => {
    let listOfCloneOrders = cloneDeep(listOfOrders);
    if (listOfCloneOrders && listOfCloneOrders.length === 1) {
      reset();
    } else {
      listOfCloneOrders.splice(itemIndex);
      localStorage.setItem("listOfOrders", JSON.stringify(listOfCloneOrders));
      setForceRerender((cur) => cur + 1);
    }
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

  const reset = () => {
    navigate("/");
    localStorage.removeItem("listOfOrders");
  };

  useEffect(() => {
    const total = calTotalPrice();
    setTotalPrice(total);
  }, [forceRerender]);

  const steps = [
    {
      title: "Thông tin đơn hàng",
      content: (
        <OrderList
          listOfOrders={listOfOrders || []}
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
        if (res && res.status) {
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
            user: res.data._id,
          };
          createOrder(prepareOrderData)
            .then((res) => {
              if (res && res.status === 200) {
                messages.successNotification(
                  "Success!",
                  "Đặt hàng thành công"
                );
                reset();
              } else {
                messages.errorNotification("Error!", res.message);
              }
            })
            .catch((err) => {
              handleError(err);
              messages.error(
                "Rất tiếc, đã xảy ra lỗi! :(",
                "Vui lòng thử lại hoặc liên hệ với bộ phận hỗ trợ."
              );
              reset();
            });
        } else {
          messages.errorNotification("Error!", res.message);
        }
      })
      .catch((err) => {
        handleError(err);
        reset();
        messages.error(
          "Rất tiếc, đã xảy ra lỗi! :(",
          "Vui lòng thử lại hoặc liên hệ với bộ phận hỗ trợ."
        );
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
            isDisabledNextStepBtn={listOfOrders && listOfOrders.length === 0}
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
