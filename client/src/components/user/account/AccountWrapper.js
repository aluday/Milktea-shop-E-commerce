import Input from "antd/es/input/Input";
import styled from "styled-components";

export const WrapperTextLight = styled.span`
  color: #0099ff;
  font-size: 13px;
  cursor: pointer;
`;
export const WrapperInputStyle = styled(Input)`
  border-top: none;
  border-right: none;
  border-left: none;
  outline: none;
  &:focus {
    background-color: rgb(232, 240, 254);
  }
`;
