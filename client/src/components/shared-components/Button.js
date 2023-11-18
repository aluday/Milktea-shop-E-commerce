import React from "react";
import { Button } from "antd";

export const ButtonComponent = ({
  style,
  size,
  textButton,
  styleTextButton,
  disabled,
  ...rests
}) => {
  return (
    <Button
      bordered="false"
      style={{
        ...style,
        // background: disabled ? '#ccc' : style.background,
        // color: disabled ? '#fff':  style.color
      }}
      size={size}
      // styleButton={styleButton}
      {...rests}
    >
      <span style={styleTextButton}>{textButton}</span>
    </Button>
  );
};

export default ButtonComponent;
