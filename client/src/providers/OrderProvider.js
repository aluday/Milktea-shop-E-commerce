import React, { useState } from "react";

export const OrderContext = React.createContext();


export const OrderProvider = ({ children }) => {
  const orderItems = JSON.parse(localStorage.getItem("listOfOrders"));
  const count = localStorage.getItem("countNoOrders");
  const [countNoOrders, setCountNoOrders] = useState(count ? count : 0);
  const [listOfOrders, setListOfOrders] = useState(
    orderItems && orderItems.length > 0 ? orderItems : []
  );

  return (
    <OrderContext.Provider
      value={{
        countNoOrders,
        setCountNoOrders,
        listOfOrders,
        setListOfOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
