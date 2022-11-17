import { Button, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CarouselProduct from "../../components/CarouselProduct";
import ProductInfo from "../../components/ProductInfo";
import "./Product.css";
import { RiArrowGoBackFill } from "react-icons/ri";
import useGetMetadata from "../../hooks/useGetMetadata";
import Loading from "../../components/Loading";
const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [productSelected, setProductSelected] = useState();
  const [images, setImages] = useState([]);
  const { getMetadata , loading} = useGetMetadata();

  useEffect(() => {
    searchProduct();
  }, []);

  const searchProduct = async () => {
    const product = await getMetadata(productId);
    if(!product){
      navigate('/')
    }

    const images = [product.image];
    for (let i = 0; i < 4; i++) {
      if (product[`image${i}`]) {
        images.push(product[`image${i}`]);
      }
    }
    setImages(images);
    setProductSelected(product)
  };

  const redirect = () => {
    navigate(-1)
  };

  return (
    <div className="container container-product">

{loading && <Loading />}
      <Row gutter={64}>
        <Col span={24}>
          <Button className="btn-with-icon" onClick={redirect}>
            <RiArrowGoBackFill />
            Back
          </Button>
          <br />
        </Col>
        <Col span={24} lg={12}>
          <CarouselProduct images={images} />
        </Col>
        <Col span={24} lg={12}>
          <ProductInfo {...productSelected} tokenId={productId} />
        </Col>
      </Row>
    </div>
  );
};

export default Product;
