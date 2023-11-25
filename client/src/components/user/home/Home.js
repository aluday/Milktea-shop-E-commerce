import React, { useEffect, useState, useContext } from "react";
import slider1 from "../../../assets/slides/slider_2.webp";
import slider2 from "../../../assets/slides/slider_3.webp";
import SliderComponent from "../../shared-components/Slider";
import { WrapperProducts } from "./HomeWrapper";
import CardProduct from "./Card";
import "./Home.css";
import Header from "../../shared-components/Header";
import {
  getAllProducts,
  handleError,
} from "../../../services/endpoint-services";
// using mockData because it haven't integrated yet
import mockData from "../../../mockData.json";
// import { UserContext } from "../../../providers/UserProvider";
import { OrderContext } from "../../../providers/OrderProvider";
import OrderModal from "./OrderModal";

export const HomePage = () => {
  const [products, setProducts] = useState([]);
  // const [limit, setLimit] = useState(4);
  // const { currentUser } = useContext(UserContext);
  const { listOfOrders, countNoOrders, setCountNoOrders, setListOfOrders } =
    useContext(OrderContext);
  const [productDetails, setProductDetails] = useState(null);
  const [openOrderModal, setOpenOrderModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [amount, setAmount] = useState(0);

  const handleConfirmOrderModal = () => {
    setOpenOrderModal(false);
    const prepareOrderData = {
      productDetails,
      amount,
      selectedSize,
    };
    setCountNoOrders((cur) => cur + 1);
    setListOfOrders((cur) => [...cur, prepareOrderData]);
    localStorage.setItem("countNoOrders", countNoOrders);
    localStorage.setItem("listOfOrders", JSON.stringify(listOfOrders));
    resetData();
  };

  const handleCancelOrderModal = () => {
    setOpenOrderModal(false);
    resetData();
  };

  const handleOpenOrderModal = (productDetails) => {
    setOpenOrderModal(true);
    setProductDetails(productDetails);
  };

  const handleSizeChange = (sizeVal) => {
    setSelectedSize(sizeVal);
    setAmount(0);
  };

  const handleIncreaseItem = (maxAmount) => {
    if (amount <= maxAmount) {
      setAmount((cur) => cur + 1);
    }
  };

  const handleDecreaseItem = () => {
    setAmount((cur) => (cur > 0 ? cur - 1 : 0));
  };

  const resetData = () => {
    setProductDetails(null);
    setSelectedSize("");
    setAmount(0);
  };

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        if (res.data && res.data.products) {
          const productData = res.data.products;
          setProducts(productData);
        }
      })
      .catch((err) => {
        handleError(err);
      });
  }, []);

  return (
    <>
      <Header />
      <div className="body">
        <SliderComponent arrImg={[slider1, slider2]} />
        <div className="container">
          <WrapperProducts>
            {products && products.length > 0
              ? products?.map((product) => {
                  return (
                    <CardProduct
                      product={product}
                      handleClick={() => {
                        handleOpenOrderModal(product);
                      }}
                    />
                  );
                })
              : mockData.products.map((product) => {
                  return (
                    <CardProduct
                      product={product}
                      handleClick={() => {
                        handleOpenOrderModal(product);
                      }}
                    />
                  );
                })}
          </WrapperProducts>
        </div>
      </div>
      {openOrderModal && (
        <OrderModal
          open={openOrderModal}
          content={productDetails}
          selectedSize={selectedSize}
          amount={amount}
          handleChangeSize={handleSizeChange}
          handleConfirm={handleConfirmOrderModal}
          handleCancel={handleCancelOrderModal}
          handleIncrease={handleIncreaseItem}
          handleDecrease={handleDecreaseItem}
        />
      )}
    </>
  );
};

export default HomePage;
