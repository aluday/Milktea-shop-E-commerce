import React, { useState, useContext } from "react";
import { UserContext } from "../../../providers/UserProvider";
import { OrderContext } from "../../../providers/OrderProvider";
import Header from "../../shared-components/Header";
import { Button, message, Steps, theme, Flex } from "antd";
import { UserOutlined } from "@ant-design/icons";
import PaymentSteppers from "./PaymentSteppers";
import OrderList from "./OrderList";
import UserInfo from "./UserInfo";
import "./PaymentDetails.css";

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

export const PaymentDetails = () => {
  const [currentStep, setCurrentStep] = useState(0);

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
