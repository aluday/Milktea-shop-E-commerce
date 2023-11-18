import Input from "antd/es/input/Input";
import React from "react";

export const InputComponent = ({
  size,
  placeholder,
  bordered,
  style,
  ...rests
}) => {
  return (
    <Input
      style={{ style }}
      size={size}
      placeholder={placeholder}
      bordered={bordered}
      {...rests}
    />
  );
};

export default InputComponent;
