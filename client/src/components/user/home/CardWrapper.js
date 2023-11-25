import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
    width: 400px;
    &img {
      height: 200px;
      width: 200px;
    },
    justify-content: flex-start;
    position: relative;
    box-sizing: border-box;
    display: block;
    background-color: ${(props) => (props.disabled ? "#ccc" : "#fff")};
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")}
`;
export const StyleNameProduct = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: rgb(56, 56, 61);
  font-weight: 500;
`;
export const WrapperPriceText = styled.div`
  .priceText {
    color: rgb(255, 66, 78);
    font-size: 16px;
    font-weight: 500;
  }
  .inStockText {
    font-style: italic;
  }
`;

// export const WrapperReportText = styled.div`
//     font-size: 11px;
//     color: rgb(128, 128, 137);
//     display: flex;
//     margin: 6px 0 0px;
// `
// export const WrapperStyleTextSell = styled.span`
//     font-size: 15px;
//     line-height: 24px;
//     color: rgb(120, 120, 120)
// `
