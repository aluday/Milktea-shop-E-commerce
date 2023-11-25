import React, { useContext } from "react";
import { Avatar, List, Space, Flex, Segmented, Input } from "antd";
import { OrderContext } from "../../../providers/OrderProvider";
import { DeleteOutlined } from "@ant-design/icons";

const OrderList = ({
  listOfOrders,
  totalPrice,
  updateAmount,
  updateSelectedSize,
  deleteOrder,
}) => {
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={listOfOrders}
        renderItem={(item, index) =>
          item && (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.productDetails.image} />}
                title={<p>{item.productDetails.productName}</p>}
                description={
                  <Flex gap={16}>
                    <Space>
                      <p className="priceText">
                        {item.productDetails &&
                          item.productDetails.size.find(
                            (obj) => obj.sizeValue === item.selectedSize
                          ).price}
                        đ
                      </p>
                    </Space>
                    <Space>
                      <Segmented
                        options={
                          item.productDetails &&
                          item.productDetails.size.map((item) => item.sizeValue)
                        }
                        value={item.selectedSize}
                        onChange={(sizeVal) => {
                          updateSelectedSize(index, sizeVal);
                        }}
                      />
                    </Space>
                    <Space>
                      <Input
                        addonBefore={
                          <span
                            onClick={() => {
                              updateAmount(index, "decrease");
                            }}
                          >
                            -
                          </span>
                        }
                        addonAfter={
                          <span
                            onClick={() => {
                              updateAmount(index, "increase");
                            }}
                          >
                            +
                          </span>
                        }
                        value={item.amount}
                      />
                    </Space>
                    <Space>
                      <DeleteOutlined
                        onClick={() => {
                          deleteOrder(index);
                        }}
                      />
                    </Space>
                  </Flex>
                }
              />
            </List.Item>
          )
        }
      />
      <Flex className="total" gap={32}>
        <h3>Tổng tiền:</h3>
        <h3 className="totalText"> {totalPrice} đ</h3>
      </Flex>
    </>
  );
};
export default OrderList;
