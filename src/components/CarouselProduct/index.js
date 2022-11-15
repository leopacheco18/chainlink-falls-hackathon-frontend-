import { Carousel } from "antd";
import React from "react";
import './index.css'
const CarouselProduct = ({ images, base64 }) => {

    return (
      <div>
        <Carousel>
          {images.map((item, key) => (
              <div key={key} className="product-image-carousel-container">
                <div style={{backgroundImage: `url(${(!base64 ? process.env.REACT_APP_IPFS_GATEWAY : "") + item})`}} className="product-image-carousel"></div>
              </div>
          ))}
        </Carousel>
      </div>
    );
};

export default CarouselProduct;
