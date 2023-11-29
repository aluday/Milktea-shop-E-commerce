import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)``;

export const WrapperAccount = styled.div`
  display: flex;
  align-items: center;
  color: #8b7d6b;
  gap: 10px;
`;

export const WrapperContentPopup = styled.p`
  cursor: pointer;
  padding: 8px;
  &:hover {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    border-radius: 6px;
    background-color: #f5f5f5;
  }
  .ant-flex {
    height: 24px;
  }
  .ant-flex .anticon {
    font-size: 16px;
  }
`;
export const WrapperAccountBtnGroup = styled("ant-space")`
  .anticon-user,
  .anticon-shopping-cart,
  .anticon-login,
  .anticon-user-add,
  .anticon-logout {
    background-color: #faf8f1;
    padding: 8px;
    border-radius: 48px;
    font-size: 22px;
  }
  .anticon:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  .ant-space {
    margin-left: 6px;
    margin-right: 6px;
  }
  .accountText {
    color: #c58940;
    font-weight: bold;
  }
`;
