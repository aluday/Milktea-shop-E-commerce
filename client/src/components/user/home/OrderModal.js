import React from "react";
import image from "../../../assets/test.png";
import { Modal, Row, Col, Space, Segmented, Input } from "antd";
import { WrapperModal } from "./HomeWrapper";

export const OrderModal = ({
  productDetails,
  open,
  handleConfirm,
  handleCancel,
}) => {
  return (
    <WrapperModal>
      <Modal
        title="Đặt hàng"
        centered
        open={open}
        onOk={handleConfirm}
        onCancel={handleCancel}
      >
        <Row>
          <Col>
            <img alt="example" src={image} width={200} height={200} />
          </Col>
          <Col>
            <Space>
              <p>Test 1</p>
            </Space>
            <br />
            <Space>
              <p>123 đ</p>
            </Space>
            <br />
          </Col>
        </Row>
        <div>
          <Space>
            <p>Chọn size</p>
            <Segmented options={["S", "M", "L"]} value="" onChange={() => {}} />
            ;
          </Space>
          <Space>
            <p>Số lượng</p>
            <Input addonBefore={<span>+</span>} addonAfter={<span>-</span>} defaultValue="1" />
          </Space>
        </div>
      </Modal>
    </WrapperModal>
  );
};

export default OrderModal;
