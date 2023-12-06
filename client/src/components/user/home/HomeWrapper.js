import styled from "styled-components";
import ButtonComponent from "../../shared-components/Button";

export const WrapperType = styled.div`
  display: flex;
  font-size: 20px;
  gap: 24px;
  justify-content: center;
  height: 44px;
`;

export const WrapperButtonMore = styled(ButtonComponent)`
  &:hover {
    color: #fff;
    background: PapayaWhip;
    span {
      color: #ff0000;
    }
  }
  width: 15%;
  height: "50px";
  borderradius: "5px";
  color: #9255fd;
  text-align: center;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointers")};
`;

export const WrapperProducts = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 50px;
  margin-right: 32px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  .ant-empty {
    margin: 0 auto;
  }
`;

export const WrapperModal = styled('ant-modal')`
  .ant-modal-content .ant-modal-body img {
    height: 200px;
    width: 200px;
  }
`;
