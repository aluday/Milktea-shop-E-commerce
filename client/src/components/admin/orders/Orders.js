import React, { useState, useEffect } from "react";
import { Tag, Popover, Flex, Badge } from "antd";
import TableComponent from "../../shared-components/Table";
import { getAllOrders, handleError } from "../../../services/endpoint-services";
import * as messages from "../../../services/messages";
import moment from "moment";

export const Orders = () => {
  const [listOfOrders, setListOfOrders] = useState([]);

  const displayedColumns = [
    {
      title: "#",
      dataIndex: "columnNo",
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "orderNo",
    },
    {
      title: "Khách hàng",
      dataIndex: "user",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Địa chỉ giao hàng",
      dataIndex: "shippingAddress",
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createAt",
    },
  ];

  const renderOrderItems = (orderItems, totalAmount) => {
    return (
      <Popover
        placement="topLeft"
        title="Đơn hàng"
        content={orderItems.map((item) => (
          <>
            <span className="primary-text">{item.productName}</span>
            <Flex justify="space-between">
              <span className="secondary-text">
                Size: {item.size.toUpperCase()}
              </span>
              <span className="secondary-text">x{item.amount}</span>
            </Flex>
          </>
        ))}
      >
        <Badge
          style={{
            backgroundColor: "#52c41a",
          }}
          count={totalAmount}
          size="large"
        />
      </Popover>
    );
  };

  useEffect(() => {
    getAllOrders()
      .then((res) => {
        if (res.status) {
          const orders = res.data.map((item, index) => {
            const initialValue = 0;
            const totalAmount = item.orderItems.reduce(
              (accumulator, currentValue) => accumulator + currentValue.amount,
              initialValue
            );
            return {
              columnNo: index + 1,
              orderNo: item.orderNo,
              user: item.user.name,
              phone: item.user.phone,
              shippingAddress: item.user.address,
              amount: renderOrderItems(item.orderItems, totalAmount),
              totalPrice: item.totalPrice,
              status: item.isPaid ? (
                <Tag bordered={false} color="green">
                  Hoàn thành
                </Tag>
              ) : (
                <Tag bordered={false} color="gold">
                  Chờ thanh toán
                </Tag>
              ),
              createAt: moment(item.createdAt).format("DD/MM/YYYY, h:mm:ss A"),
            };
          });
          setListOfOrders(orders);
        } else {
          messages.error("Error!", res.message);
        }
      })
      .catch((err) => {
        handleError(err);
      });
  }, []);

  return (
    <div>
      <h2>Quản lý đơn hàng</h2>
      <TableComponent columns={displayedColumns} data={listOfOrders} />
    </div>
  );
};

export default Orders;
