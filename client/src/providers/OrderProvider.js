import React, { useState } from "react";

export const OrderContext = React.createContext();


export const OrderProvider = ({ children }) => {
  const orderItems = JSON.parse(localStorage.getItem("listOfOrders"));
  const [listOfOrders, setListOfOrders] = useState(
    orderItems && orderItems.length > 0 ? orderItems : []
  );

  return (
    <OrderContext.Provider
      value={{
        listOfOrders,
        setListOfOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
