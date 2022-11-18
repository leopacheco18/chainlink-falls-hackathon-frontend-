import React, { useState } from "react";
import logoMini from "../../assets/image/logo-mini.png";
import logoMatic from "../../assets/image/logo-matic.png";
import "./index.css";
import Title from "../Title";
import { Button, Input, Modal, notification } from "antd";
import { IoMdChatboxes } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import { useAddress } from "@thirdweb-dev/react";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import { ethers } from "ethers";
import AbiOpenMarket from "../../mocks/AbiOpenMarket.json";

const ProductInfo = ({
  name,
  owner,
  priceMatic,
  priceUSD,
  description,
  hideButton,
  tokenId,
  status,
  currency,
  price
}) => {
  const navigate = useNavigate();
  const address = useAddress();
  const {  request } = useHttp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPrice,setNewPrice] = useState(0);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setNewPrice(0)
  };
  const shortAddress = () => {
    if (owner) {
      if(owner === address){
        return 'Owned by you'
      }
      return (
        owner.slice(0, 4) + "..." + owner.slice(owner.length - 4, owner.length)
      );
    } else {
      return "";
    }
  };

  const createChat = async () => {
    const res = await request({
      type: "post",
      endpoint: "create-chat",
      data: { owner, buyer: address, tokenId },
    });
    localStorage.setItem("chatId", res.chatId);
    navigate("/chat");
  };

  const changeStatus = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT_ADDRESS,
      AbiOpenMarket,
      signer
    );

    try {
      await contract.changeStatus(!status, tokenId);
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Metamask rejected",
      });
    }
  };

  const changeCurrency = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT_ADDRESS,
      AbiOpenMarket,
      signer
    );

    try {
      await contract.changePriceType(
        currency === "MATIC" ? "USD" : "MATIC",
        tokenId
      );
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Metamask rejected",
      });
    }
  };


  const changePrice = async () => {
    if(newPrice <= 0){
      notification.error({
        message: `Price ${newPrice} is not valid`
      })
      return
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT_ADDRESS,
      AbiOpenMarket,
      signer
    );

    try {
      await contract.changePrice(
        ethers.utils.parseUnits(newPrice.toString()),
        tokenId
      );
      handleCancel();
      
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Metamask rejected",
      });
    }
  };

  return (
    <div>
      <h2 className="product-info-title">{name}</h2>
      <div className="d-flex vertically-center header-profile">
        <img alt="logo-mini" src={logoMini} />
        <p onClick={() => navigate(`/profile/${owner}`)}> {shortAddress()} </p>
      </div>

      <div className="d-flex vertically-center product-info-price">
        <img alt="logo-mini" src={logoMatic} />
        {status ? (
          <>
            <p> {parseFloat(priceMatic).toFixed(2)} </p>
            <div>${parseFloat(priceUSD).toFixed(2)}</div>
          </>
        ) : (
          <p>Not for sale</p>
        )}
      </div>

      <div className="d-flex vertically-center product-info-price"></div>
      <Title name={"Description"} fontSize={"1.25rem"} />
      <p className="product-info-description">{description}</p>
      {!hideButton && address && address !== owner && (
        <Button
          block
          size="large"
          className="product-info-btn-chat"
          onClick={createChat}
        >
          <IoMdChatboxes /> Chat
        </Button>
      )}

      {!hideButton && owner === address && (
        <>
          <div className="d-flex product-info-price">
            <Button
              block
              size="large"
              className="product-info-btn-chat"
              onClick={showModal}
            >
              <DollarCircleOutlined /> Change Price ({price})
            </Button>
            <br />
          </div>

          <div className="d-flex product-info-price">
            <Button
              block
              size="large"
              className="product-info-btn-chat"
              onClick={changeCurrency}
            >
              <DollarCircleOutlined /> Change Currency ({currency})
            </Button>
            <br />
          </div>

          <div className="d-flex product-info-price">
            <Button
              block
              size="large"
              className="product-info-btn-chat"
              onClick={changeStatus}
            >
              {status ? <DeleteOutlined /> : <CheckCircleOutlined />}{" "}
              {status ? "Stop Selling" : "Sell"}
            </Button>
            <br />
          </div>
        </>
      )}

        <Modal
          title="Change price"
          open={isModalOpen}
          footer={null}
          onCancel={handleCancel}
        >
            <Input value={newPrice} type="number" placeholder="0.00" onChange={(e) => setNewPrice(e.target.value)} />
            <br /> <br/>
            <Button onClick={changePrice}  block>Change</Button>
        </Modal>
    </div>
  );
};

export default ProductInfo;
