import React, { useState  } from "react";
import image from "../../../assets/test.png";
import { Modal, Row, Col, Space, Segmented, Input, Flex, Divider } from "antd";
import { WrapperModal } from "./HomeWrapper";

export const OrderModal = ({
  open,
  content,
  selectedSize,
  amount,
  handleConfirm,
  handleCancel,
  handleChangeSize,
  handleIncrease,
  handleDecrease
}) => {
  const [displayedPrice, setdisplayedPrice] = useState(content && content.basicPrice);

  const handleChange = (sizeVal) => {
    handleChangeSize(sizeVal);
    setdisplayedPrice(content.size.find((item => item.sizeValue === sizeVal)).price);
  }

  return (
    <WrapperModal>
      <Modal
        title="Đặt hàng"
        centered
        open={open}
        onOk={handleConfirm}
        onCancel={handleCancel}
      >
        <Row className="orderModalRow">
          <Col>
            <img alt="example" src={image} width={200} height={200} />
          </Col>
          <Col>
            <Flex className="nameAndPriceWrapper" vertical justify="flex-end">
              <Space>
                <p className="productNameText">{content && content.productName}</p>
              </Space>
              <Space>
                <p className="priceText">{displayedPrice} đ</p>
              </Space>
              <Space>
                <p className="inStock">* Còn hàng</p>
              </Space>
            </Flex>
          </Col>
        </Row>
        <Divider />
        <Flex className="sizeAndAmountWrapper" vertical>
          <Space>
            <p className="sizeAndAmountText">Chọn size</p>
            <Segmented options={content && content.size && content.size.map(item => item.sizeValue)} value={selectedSize} onChange={handleChange} />
          </Space>
          <Divider />
          <Space>
            <p className="sizeAndAmountText">Số lượng</p>
            <Input className="orderAmountInput" addonBefore={<span onClick={handleIncrease}>+</span>} addonAfter={<span onClick={handleDecrease}>-</span>} value={amount} />
          </Space>
        </Flex>
      </Modal>
    </WrapperModal>
  );
};

export default OrderModal;