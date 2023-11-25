import React from "react";
import {
  StyleNameProduct,
  WrapperCardStyle,
  WrapperPriceText,
} from "./CardWrapper";
import { Button } from "antd";

export const CardProduct = ({ product, handleClick }) => {
  return (
    <WrapperCardStyle
      hoverable
      headStyle={{ width: "300px", height: "200px" }}
      style={{ width: 300, padding: "10px" }}
      bodyStyle={{ padding: "10px" }}
      cover={<img alt="example" src={product.image} />}
    >
      <div className="card">
        <StyleNameProduct> {product.productName} </StyleNameProduct>
        <WrapperPriceText style={{ padding: "5px" }}>
          <span className="priceText" style={{ marginRight: "8px" }}>
            {product.basicPrice.toLocaleString()} đ
          </span>
        </WrapperPriceText>
        <WrapperPriceText style={{ padding: "5px" }}>
          <span className="inStockText" style={{ marginRight: "8px" }}>
            * {product.countInStock > 0 ? "Còn hàng" : "Hết hàng"}
          </span>
        </WrapperPriceText>
        <Button
          bordered="false"
          onClick={handleClick}
          disabled={product.countInStock === 0}
        >
          Thêm vào giỏ hàng
        </Button>
      </div>
    </WrapperCardStyle>
  );
};

export default CardProduct;
