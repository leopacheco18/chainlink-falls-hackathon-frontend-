import { Col, Input, Row, Select } from "antd";
import React from "react";
import BackgroundImage from "../../components/BackgroundImage";
import HeaderProfile from "../../components/HeaderProfile";
import Products from "../../components/Products";
import productList from "../../mocks/Products.json"
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
  },
  {
    value: "category",
    label: "Category",
  },
];
const Profile = () => {
  const handleChange = (e) => {
    console.log(e);
  };
  return (
    <div className="container">
      <BackgroundImage height={"35vh"} />
      <HeaderProfile />
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
