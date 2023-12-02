import React, { useEffect, useState } from "react";
import { WrapperProducts } from "./HomeWrapper";
import CardProduct from "./Card";
import {
  getAllProducts,
  getProductsByType,
  handleError,
} from "../../../services/endpoint-services";
import * as message from "../../../services/messages";
import OrderModal from "./OrderModal";
import { useLocation } from "react-router-dom";
import Header from "../../shared-components/Header";
import { Empty } from "antd";

export const ProductDetails = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [openOrderModal, setOpenOrderModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [amount, setAmount] = useState(0);

  const handleConfirmOrderModal = () => {
    setOpenOrderModal(false);
    const currentListOfOrders = JSON.parse(
      localStorage.getItem("listOfOrders")
    );
    const prepareOrderData = {
      productDetails,
      amount,
      selectedSize,
    };
    if (currentListOfOrders && currentListOfOrders.length > 0) {
      localStorage.setItem(
        "listOfOrders",
        JSON.stringify([...currentListOfOrders, prepareOrderData])
      );
    } else {
      localStorage.setItem("listOfOrders", JSON.stringify([prepareOrderData]));
    }
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
    if (location.state && location.state.typeId) {
      getProductsByType(location.state.typeId)
        .then((res) => {
          console.log(res);
          if (res.status) {
            setProducts(res.products);
          } else {
            message.error("Error!", res.message);
          }
        })
        .catch((err) => {
          handleError(err);
          message.error(
            "Rất tiếc, đã xảy ra lỗi! :(",
            "Vui lòng thử lại hoặc liên hệ với bộ phận hỗ trợ."
          );
        });
    } else {
      getAllProducts()
        .then((res) => {
          if (res.data && res.data.products) {
            const productData = res.data.products;
            setProducts(productData);
          } else {
            message.error("Error!", res.message);
          }
        })
        .catch((err) => {
          handleError(err);
          message.error(
            "Rất tiếc, đã xảy ra lỗi! :(",
            "Vui lòng thử lại hoặc liên hệ với bộ phận hỗ trợ."
          );
        });
    }
  }, [location.state]);

  return (
    <>
      {location.state && (
        <>
          <Header />
          <h2 className="magin-left-32 magin-top-32">
            {location.state.typeName}
          </h2>
        </>
      )}
      <WrapperProducts>
        {products && products.length > 0 ? (
          products.map((product) => {
            return (
              <div className={location.state && "magin-left-32"}>
                <CardProduct
                  product={product}
                  handleClick={() => {
                    handleOpenOrderModal(product);
                  }}
                />
              </div>
            );
          })
        ) : (
          <Empty />
        )}
      </WrapperProducts>
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

export default ProductDetails;
