import { useAddress } from "@thirdweb-dev/react";
import { Button, Card, Col, Input, Modal, notification } from "antd";
import { ethers } from "ethers";
import React, { useState } from "react";
import logoMatic from "../../assets/image/logo-matic.png";
import AbiOpenMarket from "../../mocks/AbiOpenMarket.json";
import Loading from "../Loading";

const TransactionContent = ({
  from,
  objectId,
  product,
  requestId,
  status,
  to,
  getTransactions,
  _id,
}) => {
  const address = useAddress();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [randomNumber,setRandomNumber] = useState(null);
  const [loading, setLoading] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const pay = async () => {
    setLoading(true)
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT_ADDRESS,
      AbiOpenMarket,
      signer
    );

    try {
      await contract.deposit(requestId, _id, {
        value: ethers.utils.parseEther(''+product.priceMatic),
      });
      notification.success({
        message: "Payment received",
      });
      getTransactions();
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Metamask rejected",
      });
    }
    setLoading(false)
  };

  const refund = async () => {
    setLoading(true)
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT_ADDRESS,
      AbiOpenMarket,
      signer
    );

    try {
      const res = await contract.randomByRequestId(requestId);
      const random = ethers.BigNumber.from(res).toString();
      await contract.refund(
        random,
        _id
      );
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Metamask rejected",
      });
    }
    setLoading(false)
  };
  const copyRandom = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT_ADDRESS,
      AbiOpenMarket,
      signer
    );

    try {
      const res = await contract.randomByRequestId(requestId);
      const random = ethers.BigNumber.from(res).toString();
      var input = document.createElement("input");
      input.setAttribute("value", random);
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      notification.success({
        message: "Random number copied!",
      });
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Metamask rejected",
      });
    }
  };

  const sell = async () => {
    setLoading(true)
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT_ADDRESS,
      AbiOpenMarket,
      signer
    );

    try {
      await contract.withdrawMoney(
        randomNumber,
        objectId,
        address,
        to,
        _id
      );
      handleCancel();
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Metamask rejected",
      });
    }
    setLoading(false)
  } 

  return (
    <Col span={24} md={12} lg={6}>

{loading && <Loading />}
      <Card
        style={{ width: "100%", position: "relative", height: "100%" }}
        // onClick={() => navigate(`/product/${tokenId}` )}
        cover={<img alt="product" src={product.image} />}
      >
        <h3 className="product-name">{product.name} </h3>
        <h3 className="product-name">Status: {status} </h3>

        <div className="d-flex vertically-center product-mini-price">
          <img alt="logo-mini" src={logoMatic} />
          <p> {parseFloat(product.priceMatic).toFixed(2)} </p>
          <div>${parseFloat(product.priceUSD).toFixed(2)}</div>
        </div>

        {status === "Pending for Pay" && to === address && (
          <Button block size="large" onClick={pay}>
            Pay
          </Button>
        )}

        {status === "Pending for deliver" && to === address && (
          <>
            <Button block size="large" onClick={copyRandom}>
              Copy Random Number
            </Button>
            <br />
            <br />
            <Button block size="large" onClick={refund}>
              Refund
            </Button>
          </>
        )}

        {status === "Pending for deliver" && from === address && (
          <Button block size="large" onClick={showModal}>
            Deliver
          </Button>
        )}

        <Modal
          title="Paste Random Number"
          open={isModalOpen}
          footer={null}
          onCancel={handleCancel}
        >
            <Input placeholder="Random Number...." onChange={(e) => setRandomNumber(e.target.value)} />
            <br /> <br/>
            <Button onClick={sell}  block>Sell</Button>
        </Modal>
      </Card>
    </Col>
  );
};

export default TransactionContent;
