import React from "react";
import { Flex } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "./ErrorPages.css";
import { useNavigate } from "react-router-dom";
import forbiddenImg from "../../../assets/403-forbidden-error.png";

export const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="errorPageContainer">
      <Flex
        align="center"
        justify="center"
        onClick={() => {
          navigate("/");
        }}
      >
        <ArrowLeftOutlined />
        <p className="text-link">Trở về trang chủ</p>
      </Flex>
      <Flex className="errorImgContainer" justify="center">
        <img className="errorImg" src={forbiddenImg} />
      </Flex>
    </div>
  );
};

export default Forbidden;
