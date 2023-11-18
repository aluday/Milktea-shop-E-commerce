import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    padding: 10px 100px;
    background-color: PapayaWhip;
    gap: 16px,
    flex-wrap: nowrap,
`;
    
export const WrapperAccount = styled.div`
    display: flex;
    align-items: center;
    color: #8B7D6B;
    gap: 10px;
`

export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        color: rgb(26, 148, 255);
    }
`
