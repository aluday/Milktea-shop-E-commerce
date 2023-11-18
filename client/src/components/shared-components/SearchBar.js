import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import InputComponent from "./Input";
import ButtonComponent from "./Button";

export const SearchBar = (props) => {
  const {
    size,
    placeholder,
    textbutton,
    backgroundColorButton = "#EED5B7",
  } = props;
  return (
    <div style={{ display: `flex`, backgroundColor: "#ffffff" }}>
      <InputComponent
        style={{ borderRadius: "0px" }}
        size={size}
        placeholder={placeholder}
        bordered={false}
        {...props}
      />
      <ButtonComponent
        bordered="false"
        style={{
          borderRadius: "0px",
          border: "none",
          backgroundColor: backgroundColorButton,
          borderColor: "red",
          color: "#FF0000",
        }}
        size={size}
        icon={<SearchOutlined style={{ color: "#FF0000" }} />}
        textButton={textbutton}
      />
    </div>
  );
};

export default SearchBar;
