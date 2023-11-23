import React, { useState, useContext } from "react";
// import { UserContext } from "../../../providers/UserProvider";
// import { OrderContext } from "../../../providers/OrderProvider";
import Header from "../../shared-components/Header";
import { Flex } from "antd";
import PaymentSteppers from "./PaymentSteppers";
import OrderList from "./OrderList";
import UserInfo from "./UserInfo";
import "./PaymentDetails.css";

export const PaymentDetails = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    {
      title: 'Thông tin đơn hàng',
      content: <OrderList />,
    },
    {
      title: 'Đặt hàng',
      content: <UserInfo />,
    }
  ];

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const completeStep = () => {

  }

  return (
    <>
      <Header />
      <h1 className="paymentHeading">Thanh toán</h1>
      <Flex className="paymentContainer" align="center" justify="center">
        <div className="paymentStepperContainer">
          <PaymentSteppers 
            steps={steps} 
            current={currentStep}
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
