import React, { useState } from "react";

export const OrderContext = React.createContext();

export const OrderProvider = ({ children }) => {
  const [countNoOrders, setCountNoOrders] = useState(0);
  const [listOfOrders, setListOfOrders] = useState([]);

  return (
    <OrderContext.Provider
      value={{
        countNoOrders,
        setCountNoOrders,
        listOfOrders, 
        setListOfOrders
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
