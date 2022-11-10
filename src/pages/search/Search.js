import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./Search.css";
import productList from "../../mocks/Products.json";
import { Col, Drawer, Input, Row, Select } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Products from "../../components/Products";
import Title from "../../components/Title";
import countryList from "../../mocks/Countries.json";
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
];

const CATEGORIES = [
  { label: "Beauty", value: "Beauty" },
  { label: "Clothes Man", value: "Clothes Man" },
  { label: "Clothes Women", value: "Clothes Women" },
  { label: "NFT", value: "NFT" },
  { label: "Pets", value: "Pets" },
  { label: "Toys", value: "Toys" },
  { label: "Technology", value: "Technology" },
  { label: "Others", value: "Others" },
];
const Search = () => {
  const [open, setOpen] = useState(false);
  const { search } = useParams();
  const onClose = () => {
    setOpen(false);
  };
  const handleChange = (value) => {};
  return (
    <div className="container">
      <Drawer
        title={null}
        placement={"left"}
        closable={false}
        onClose={onClose}
        open={open}
        width="25vw"
      >
        <Title name={"Filter by country"} fontSize="1.25rem" />
        <Select
          placeholder="Country..."
          className="w-100"
          options={countryList}
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        />
        <Title name={"Filter by categories"} fontSize="1.25rem" />
        <Select
          placeholder="Categories..."
          className="w-100"
          options={CATEGORIES}
          showSearch
          allowClear
          mode="multiple"
          maxTagCount={"responsive"}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        />
        <Title name={"Filter by price"} fontSize="1.25rem" />
        <Row gutter={24}>
          <Col span={24} md={12}>
            <Input type="number" placeholder="Min..." />
          </Col>
          <Col span={24} md={12}>
            <Input type="number" placeholder="Max..." />
          </Col>
        </Row>
      </Drawer>
      <br />
      <div className="border-bottom-green">
        <Row gutter={24}>
          <Col span={20}>
            <div className="search-filters">
              <MenuOutlined
                style={{ fontSize: "1.5rem" }}
                onClick={() => setOpen(true)}
              />
            </div>
          </Col>
          <Col span={4} className="center-vertically">
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
      </div>

      <br />
      <br />
      <Products products={productList} />
    </div>
  );
};

export default Search;
