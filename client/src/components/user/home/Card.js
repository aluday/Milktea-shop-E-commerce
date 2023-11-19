import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../shared-components/Button";
import {
  StyleNameProduct,
  WrapperCardStyle,
  WrapperPriceText,
} from "./CardWrapper";
import image from "../../../assets/test.png";
import logo from "../../../assets/logo.png";

export const CardProduct = ({ key, name, price, id }) => {
  const navigate = useNavigate();

  return (
    <WrapperCardStyle
      hoverable
      headStyle={{ width: "300px", height: "200px" }}
      style={{ width: 300, padding: "10px" }}
      bodyStyle={{ padding: "10px" }}
      cover={<img alt="example" src={image} />}
      onClick={() => {
        navigate(`/product-details/${id}`);
      }}
    >
      <div className="card">
        <img className="cardImg" src={logo} alt="Logo" />
        <StyleNameProduct> {name} </StyleNameProduct>
        <WrapperPriceText style={{ padding: "5px" }}>
          <span style={{ marginRight: "8px" }}>
            {price.toLocaleString()} đ{/* {convertPrice(price)} */}
          </span>
        </WrapperPriceText>
        <ButtonComponent
          textButton={"Đặt hàng"}
          // style={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
        ></ButtonComponent>
      </div>
    </WrapperCardStyle>
  );
};

export default CardProduct;
