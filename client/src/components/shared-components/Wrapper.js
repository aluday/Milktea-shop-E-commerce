import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`

`;

export const WrapperAccount = styled.div`
  display: flex;
  align-items: center;
  color: #8B7D6B;
  gap: 10px;
`

export const WrapperContentPopup = styled.p`
  padding: 8px;
  cursor: pointer;
  &:hover {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    border-radius: 6px;
    background-color: rgba(250, 248, 241, 0.5);
  }
`
export const WrapperAccountBtnGroup = styled('ant-space')`
  .anticon-user, .anticon-shopping-cart, .anticon-login, .anticon-user-add {
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
    color: #C58940;
    font-weight: bold;
  }
`