import React from "react";
import { Button, Steps } from "antd";

export const PaymentSteppers = ({ steps, current, handleClickNextStep, handleClickPreviousStep, handleComplete }) => {

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <>
      <Steps current={current} items={items} />
      <div>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={handleClickNextStep}>
            Tiếp theo
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={handleComplete}>
            Hoàn thành
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={handleClickPreviousStep}
          >
            Quay lại
          </Button>
        )}
      </div>
    </>
  );
};

export default PaymentSteppers;
