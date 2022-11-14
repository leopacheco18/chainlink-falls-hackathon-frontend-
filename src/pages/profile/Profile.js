import { Col, Input, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackgroundImage from "../../components/BackgroundImage";
import HeaderProfile from "../../components/HeaderProfile";
import Products from "../../components/Products";
import useHttp from "../../hooks/useHttp";
import "./Profile.css";

const options = [
  {
    value: "name",
    label: "Name",
  },
  {
    value: "date",
    label: "Date",
  },
  {
    value: "price",
    label: "Price",
  }
];
const Profile = () => {


  const [productList, setProductList] = useState([])
  const {loading, request } = useHttp();

  const { address } = useParams();
  useEffect(() => {
    getProductsByAddress();
  }, [])

  const getProductsByAddress = async () => {

    const data = await request({endpoint: `profile/${address}`});
    setProductList(data)
  }

  const handleChange = (e) => {
    console.log(e);
  };
  return (
    <div className="container">
      <BackgroundImage height={"35vh"} />
      <HeaderProfile  address={address} />
      <Row gutter={24}>
        <Col span={24} md={18}>
          <Input.Search placeholder="Search..." />
        </Col>
        <Col span={24} md={6}>
          <Select
            placeholder="Order by..."
            style={{
              width: "100%",
            }}
            onChange={handleChange}
            options={options}
          />
        </Col>
      </Row>
            <br />
            <br />
      <Products products={productList} />
    </div>
  );
};

export default Profile;
