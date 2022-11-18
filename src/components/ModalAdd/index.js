import { useAddress } from "@thirdweb-dev/react";
import { Button, Col, message, Modal, notification, Row, Steps } from "antd";
import React, { useState } from "react";
import "./index.css";
import {
  RightOutlined,
  LeftOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import Info from "./Info";
import Photos from "./Photos/Index";
import CarouselProduct from "../CarouselProduct";
import ProductInfo from "../ProductInfo";
import axios from "axios";
import { ethers } from "ethers";
import AbiOpenMarket from "../../mocks/AbiOpenMarket.json";
import Loading from "../Loading";

const productEmpty = {
  name: null,
  price: null,
  owner: null,
  image: null,
  image0: null,
  image1: null,
  image2: null,
  image3: null,
  flag: null,
  description: null,
  category: null,
  currency: "MATIC",
};

const ModalAdd = ({ setShowModal, showModal }) => {
  const [current, setCurrent] = useState(0);
  const address = useAddress();

  const [product, setProduct] = useState(productEmpty);

  const [fileList, setFileList] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    setCurrent(0);
    setProduct(productEmpty);
    setFileList([])
    setImages([])
  };

  const next = async () => {
    if (current === 0) {
      if (
        !product.name ||
        !product.category ||
        !product.description ||
        !product.flag ||
        !product.price ||
        product.price <= 0
      ) {
        message.error("All fields are required.");
        return;
      }
    }
    if (current === 1) {
      if (fileList.length === 0) {
        message.error("You need at least 1 image");
        return;
      }
      setLoading(true);
      let productAux = { ...product };
      productAux.image = fileList[0].preview;
      for (let i = 0; i < 4; i++) {
        if (fileList[i + 1]) {
          productAux[`image${i}`] = fileList[i + 1].preview;
        }
      }
      const images = [productAux.image];
      for (let i = 0; i < 4; i++) {
        if (productAux[`image${i}`]) {
          images.push(productAux[`image${i}`]);
        }
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        process.env.REACT_APP_CONTRACT_ADDRESS,
        AbiOpenMarket,
        signer
      );

      let maticPrice = await contract.callStatic.getMaticPrice();
      maticPrice = ethers.utils.formatUnits(maticPrice, 8);

      if (productAux.currency === "MATIC") {
        productAux.priceMatic = productAux.price;
        productAux.priceUSD =
          parseFloat(productAux.price) * parseFloat(maticPrice);
      } else {
        productAux.priceUSD = productAux.price;
        productAux.priceMatic =
          parseFloat(productAux.price) * parseFloat(maticPrice);
      }

      setImages(images);
      productAux.owner = address;
      productAux.status = true;
      setProduct(productAux);
      setLoading(false);
    }
    setCurrent(current + 1);
  };

  const saveProduct = async () => {
    const arrImages = [];
    setLoading(true);
    for (let i = 0; i < fileList.length; i++) {
      let formData = new FormData();
      formData.append("file", fileList[i].originFileObj);
      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
          pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET}`,
          "Content-Type": "multipart/form-data",
        },
      });
      arrImages.push(resFile.data.IpfsHash);
    }
    let productFinal = { ...product };
    productFinal.image = arrImages[0];
    for (let i = 0; i < 4; i++) {
      if (arrImages[i + 1]) {
        productFinal[`image${i}`] = arrImages[i + 1];
      }
    }
    const res = await axios({
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      headers: {
        "Content-Type": "application/json",
        pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
        pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET}`,
      },
      data: JSON.stringify(productFinal),
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT_ADDRESS,
      AbiOpenMarket,
      signer
    );

    try {
      await contract.addItem(
        res.data.IpfsHash,
        ethers.utils.parseUnits(productFinal.price.toString()),
        productFinal.name,
        process.env.REACT_APP_IPFS_GATEWAY + productFinal.image,
        productFinal.category,
        productFinal.flag,
        productFinal.currency
      );
      closeModal();
    } catch (error) {
      notification.error({
        message: "Metamask rejected",
      });
    }
    setLoading(false);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  return (
    <Modal
      maskClosable={false}
      title="Add Product"
      open={showModal}
      footer={null}
      onCancel={closeModal}
      className="modal-create"
    >
      {loading && <Loading />}
      <Steps current={current}>
        <Steps.Step title="Info" />
        <Steps.Step title="Photos" />
        <Steps.Step title="Preview" />
      </Steps>

      <div className="container-steps">
        {current === 0 && <Info setProduct={setProduct} product={product} />}
        {current === 1 && (
          <Photos fileList={fileList} setFileList={setFileList} />
        )}
        {current === 2 && (
          <Row gutter={64}>
            <Col span={24} md={12}>
              <CarouselProduct images={images} base64={true} />
            </Col>
            <Col span={24} md={12}>
              <ProductInfo {...product} hideButton={true} />
            </Col>
          </Row>
        )}
      </div>

      <div className="modal-create-btns">
        {current > 0 && (
          <Button onClick={() => prev()} className="btn-with-icon-default">
            <LeftOutlined />
            Previous
          </Button>
        )}
        {current < 2 && (
          <Button className="btn-with-icon" onClick={() => next()}>
            Next
            <RightOutlined />
          </Button>
        )}
        {current === 2 && (
          <Button className="btn-with-icon" onClick={saveProduct}>
            Done <CheckCircleOutlined />
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default ModalAdd;
