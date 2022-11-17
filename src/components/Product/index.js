import React from "react";

import { Avatar, Card } from "antd";
import "./index.css";
import Flag from "react-world-flags";
import { GiLipstick, GiSkirt, GiUnderwearShorts } from "react-icons/gi";
import { AiFillAppstore, AiFillPicture } from "react-icons/ai";
import { MdOutlineToys, MdPets, MdPhoneIphone } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import logoMatic from "../../assets/image/logo-matic.png";

const { Meta } = Card;
const CATEGORIES = [
  { name: "Beauty", icon: <GiLipstick style={{ fontSize: "1.5rem" }} /> },
  {
    name: "Clothes Man",
    icon: <GiUnderwearShorts style={{ fontSize: "1.5rem" }} />,
  },
  { name: "Clothes Women", icon: <GiSkirt style={{ fontSize: "1.5rem" }} /> },
  { name: "NFT", icon: <AiFillPicture style={{ fontSize: "1.5rem" }} /> },
  { name: "Pets", icon: <MdPets style={{ fontSize: "1.5rem" }} /> },
  { name: "Toys", icon: <MdOutlineToys style={{ fontSize: "1.5rem" }} /> },
  {
    name: "Technology",
    icon: <MdPhoneIphone style={{ fontSize: "1.5rem" }} />,
  },
  { name: "Others", icon: <AiFillAppstore style={{ fontSize: "1.5rem" }} /> },
];

const Product = ({
  name,
  priceMatic,
  image,
  owner,
  flag,
  category,
  tokenId,
  priceUSD,
  status,
}) => {
  const navigate = useNavigate();

  const shortAddress = (address) => {
    return (
      address.slice(0, 4) +
      "..." +
      address.slice(address.length - 4, address.length)
    );
  };

  return (
    <Card
      hoverable
      style={{ width: "100%", position: "relative" }}
      onClick={() => navigate(`/product/${tokenId}`)}
      cover={<img alt="product" src={image} />}
    >
      <h3 className="product-name">{name}</h3>

      <div className="d-flex vertically-center product-mini-price">
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

      <div className="product-category">
        {CATEGORIES.find((item) => item.name === category)?.icon}
      </div>
      <div className="product-flag">
        <Flag code={flag} />
      </div>

      <Meta
        title={shortAddress(owner)}
        avatar={
          <Avatar src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
        }
      />
    </Card>
  );
};

export default Product;
