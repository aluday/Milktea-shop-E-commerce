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
// using mockData when do not running server
import mockData from "../../../mockData.json";
import { UserContext } from "../../../providers/UserProvider";

export const HomePage = () => {
  const [products, setProducts] = useState([]);
  // const [limit, setLimit] = useState(4);
  const { currentUser, handleOnClickCatalog } = useContext(UserContext);

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
      <Header currentUser={currentUser}  handleOnClickCatalog={handleOnClickCatalog} />
      <div className="body">
        <SliderComponent arrImg={[slider1, slider2]} />
        <div className="container">
          <WrapperProducts>
            {products && products.length > 0
              ? products?.map((product) => {
                  return (
                    <CardProduct
                      image={product.image_path}
                      name={product.productName}
                      price={product.basicPrice}
                      rating={product.rating}
                      id={product._id}
                    />
                  );
                })
              : mockData.products.map((product) => {
                  return (
                    <CardProduct
                      image={product.image_path}
                      name={product.productName}
                      price={product.basicPrice}
                      id={product.id}
                    />
                  );
                })}
          </WrapperProducts>

          {/* <div className="buttonLoadMore">
            <WrapperButtonMore
              textButton="Xem thêm"
              type="outline"
              style={{
                border: `1px solid ${
                  products?.data?.total === products?.data?.products.length
                    ? "#FF0000"
                    : "#FF0000"
                }`,
                color: `${
                  products?.data?.total === products?.data?.products.length
                    ? "#FF0000"
                    : "#FF0000"
                }`,
                width: "15%",
                height: "40px",
                borderRadius: "5px",
              }}
              disabled={
                products?.data?.total === products?.data?.products.length ||
                products?.data?.totalPage === 1
              }
              styleTextButton={{
                fontWeight: 500,
                color:
                  products?.data?.total === products?.data?.products.length &&
                  "#FF0000",
              }}
              onClick={() => {
                // setLimit((prev) => prev + 6);
              }}
            />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default HomePage;
