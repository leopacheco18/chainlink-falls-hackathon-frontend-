import { Col, Input, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackgroundImage from "../../components/BackgroundImage";
import HeaderProfile from "../../components/HeaderProfile";
import Loading from "../../components/Loading";
import Products from "../../components/Products";
import useHttp from "../../hooks/useHttp";
import "./Profile.css";

const options = [
  {
    value: "nameAsc",
    label: "Name (A-Z)",
  },
  {
    value: "nameDesc",
    label: "Name (Z-A)",
  },
  {
    value: "priceAsc",
    label: "Price (0-10)",
  },
  {
    value: "priceDesc",
    label: "Price (10-0)",
  },
];
const Profile = () => {


  const [productList, setProductList] = useState([])
  const [productShow, setProductShow] = useState([]);
  const {loading, request } = useHttp();

  const { address } = useParams();
  useEffect(() => {
    getProductsByAddress();
  }, [])

  const getProductsByAddress = async () => {

    const data = await request({endpoint: `profile/${address}`});
    setProductList(data)
    setProductShow(data)
  }

  const handleChange = (value) => {
    let arrAux = [...productShow];
    switch (value) {
      case "nameAsc":
        arrAux.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameDesc":
        arrAux.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "priceAsc":
        arrAux.sort((a, b) => parseFloat(a.priceMatic) - parseFloat(b.priceMatic));
        break;
      case "priceDesc":
        arrAux.sort((a, b) => parseFloat(b.priceMatic) - parseFloat(a.priceMatic));
        break;
    }
    setProductShow(arrAux);
  };

  const search = (value ) => {
    let arrAux = [...productList];
    arrAux = arrAux.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
    setProductShow(arrAux)
  }
  
  return (
    <div className="container">

{loading && <Loading />}
      <BackgroundImage height={"35vh"} />
      <HeaderProfile  address={address} />
      <Row gutter={[24,24]}>
        <Col span={24} md={18}>
          <Input.Search onSearch={search} placeholder="Search..."  />
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
      <Products products={productShow} />
    </div>
  );
};

export default Profile;
