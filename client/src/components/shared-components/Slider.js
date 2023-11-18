import Slider from "react-slick";
import React from "react";
import { Image } from "antd";

export const SliderComponent = ({ arrImg }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };
  return (
    <Slider {...settings}>
      {arrImg.map((img) => {
        return (
          <Image
            src={img}
            alt="slider"
            preview={false}
            width="100%"
            key={img}
          />
        );
      })}
    </Slider>
  );
};

export default SliderComponent;
