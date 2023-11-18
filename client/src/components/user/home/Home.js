import React, { useEffect, useState } from "react";
import { WrapperButtonMore, WrapperProducts, WrapperType } from "./HomeWrapper";
import TypeProduct from "../../shared-components/TypeProduct";
import SliderComponent from "../../shared-components/Slider";
import slider1 from "../../../assets/slides/slider_2.webp";
import slider2 from "../../../assets/slides/slider_3.webp";
import CardProduct from "./Card";
import "./Home.css";
import { PRODUCT_TYPES } from "../../../services/constants";

export const HomePage = () => {
  const [products, setProducts] = useState([]);
  // const [limit, setLimit] = useState(4);

  return (
    <>
      <div className="productType">
        <WrapperType
          style={{
            alignItems: "center",
          }}
        >
          {PRODUCT_TYPES.map((item) => {
            return <TypeProduct name={item.value} key={item.type} />;
          })}
        </WrapperType>
      </div>

      <div className="body">
        <div className="container">
          <SliderComponent arrImg={[slider1, slider2]} />

          <WrapperProducts>
            {products?.map((product) => {
              return (
                <CardProduct
                  key={product._id}
                  image={product.image_path}
                  name={product.productname}
                  price={product.basicPrice}
                  rating={product.rating}
                  id={product._id}
                />
              );
            })}
          </WrapperProducts>

          <div className="buttonLoadMore">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
