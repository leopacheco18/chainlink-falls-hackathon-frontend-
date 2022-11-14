import { Carousel } from "antd";
import React from "react";
import './index.css'
const CarouselProduct = ({ images }) => {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  console.log(images);


    return (
      <div>
        <Carousel afterChange={onChange}>
          {images.map((item, key) => (
              <div key={key} className="product-image-carousel-container">
                <div style={{backgroundImage: `url(${process.env.REACT_APP_IPFS_GATEWAY + item})`}} className="product-image-carousel"></div>
              </div>
          ))}
        </Carousel>
      </div>
    );
};

export default CarouselProduct;
