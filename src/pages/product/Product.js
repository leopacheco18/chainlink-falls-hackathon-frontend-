import { Button, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CarouselProduct from "../../components/CarouselProduct";
import ProductInfo from "../../components/ProductInfo";
import products from "../../mocks/Products.json";
import "./Product.css";
import { RiArrowGoBackFill } from "react-icons/ri";
const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [productSelected, setProductSelected] = useState();
  const [images, setImages] = useState([]);
  useEffect(() => {
    searchProduct();
  }, []);

  const searchProduct = () => {
    const product = products.find((item) => item.id === productId);
    if (!product) {
      navigate("/");
    }
    setProductSelected(product);

    const images = [product.image];
    for (let i = 0; i < 4; i++) {
      if (product[`image${i}`]) {
        images.push(product[`image${i}`]);
      }
    }
    setImages(images);
  };

  const redirect = () => {
    navigate(-1)
  };

  return (
    <div className="container container-product">
      <Row gutter={64}>
        <Col span={24}>
          <Button className="btn-with-icon" onClick={redirect}>
            <RiArrowGoBackFill />
            Back
          </Button>
          <br />
        </Col>
        <Col span={24} md={12}>
          <CarouselProduct images={images} />
        </Col>
        <Col span={24} md={12}>
          <ProductInfo {...productSelected} />
        </Col>
      </Row>
    </div>
  );
};

export default Product;
