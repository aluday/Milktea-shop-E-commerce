import React, { useContext } from 'react';
import { Avatar, List, Space, Flex, Segmented, Input } from 'antd';
// import { OrderContext } from "../../../providers/OrderProvider";
import mockData from "../../../mockData.json";
import image from "../../../assets/test.png";
import { DeleteOutlined } from "@ant-design/icons";

const OrderList = () => {
  // const { listOfOrders } = useContext(OrderContext);
  const listOfOrders = mockData.listOfOrders;

  console.log("listOfOrders", listOfOrders);
  
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={listOfOrders}
        renderItem={(item, index) => item && (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={image} />}
              title={<p>{item.productDetails.productName}</p>}
              description={
                <Flex gap={16}>
                  <Space>
                    <p className='priceText'>
                      {
                        item.productDetails && 
                        item.productDetails.size.find((obj) => obj.sizeValue === item.selectedSize).price
                      } đ
                    </p>
                  </Space>
                  <Space>
                    <Segmented options={
                      item.productDetails && 
                      item.productDetails.size.map(item => item.sizeValue)} value={item.selectedSize} onChange={() => {}} 
                    />
                  </Space>
                  <Space>
                    <Input addonBefore={<span onClick={() => {}}>+</span>} addonAfter={<span onClick={() => {}}>-</span>} value={item.amount} />
                  </Space>
                  <Space>
                    <DeleteOutlined />
                  </Space>
                </Flex>
              }
            />
          </List.Item>
        )}
      />
      <Flex className='total' gap={32}>
        <h3>Tổng tiền:</h3>
        <h3 className='totalText'>70000 đ</h3>
      </Flex>
    </>
  );
}
export default OrderList;