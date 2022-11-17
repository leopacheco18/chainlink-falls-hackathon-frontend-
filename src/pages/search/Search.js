import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Search.css";
import { Col, Drawer, Input, Row, Select } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Products from "../../components/Products";
import Title from "../../components/Title";
import countryList from "../../mocks/Countries.json";
import useHttp from "../../hooks/useHttp";
import Loading from "../../components/Loading";
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

  const [filters, setFilters] = useState({
    country: null,
    category: [],
    priceMin: null,
    priceMax: null,
  });
  const [productList, setProductList] = useState([]);
  const [productShow, setProductShow] = useState([]);
  const { loading, request } = useHttp();
  const { search } = useParams();
  const onClose = () => {
    setOpen(false);
  };
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
  useEffect(() => {
    searchProduct();
  }, [search]);

  useEffect(() => {
    filterArray();
  }, [filters]);

  const filterArray = () => {
    if (productList) {
      let arrAux = [...productList];
      if (filters.country) {
        arrAux = arrAux.filter((item) => item.flag === filters.country);
      }
      if (filters.category.length > 0) {
        let arrAux2 = [...arrAux];
        arrAux = [];
        arrAux2.forEach((item) => {
          filters.category.forEach((category) => {
            if (category === item.category) {
              arrAux.push(item);
            }
          });
        });
      }
      if (filters.priceMin) {
        arrAux = arrAux.filter(
          (item) => parseFloat(item.priceMatic) >= filters.priceMin
        );
      }

      if (filters.priceMax) {
        arrAux = arrAux.filter(
          (item) => parseFloat(item.priceMatic) <= filters.priceMax
        );
      }
      setProductShow(arrAux);
    }
  };

  const searchProduct = async () => {
    const data = await request({ endpoint: `search/${search}` });
    setFilters({
      country: null,
      category: [],
      priceMin: null,
      priceMax: null,
    });
    setProductList(data);
    setProductShow(data);
  };
  return (
    <div className="container">

{loading && <Loading />}
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
          value={filters.country}
          showSearch
          allowClear
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          onChange={(val) => setFilters({ ...filters, country: val })}
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
          onChange={(val) => setFilters({ ...filters, category: val })}
        />
        <Title name={"Filter by price"} fontSize="1.25rem" />
        <Row gutter={24}>
          <Col span={24} md={12}>
            <Input
              type="number"
              placeholder="Min..."
              step={0.01}
              onChange={(e) =>
                setFilters({ ...filters, priceMin: e.target.value })
              }
            />
          </Col>
          <Col span={24} md={12}>
            <Input
              type="number"
              placeholder="Max..."
              step={0.01}
              onChange={(e) =>
                setFilters({ ...filters, priceMax: e.target.value })
              }
            />
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
      <Products products={productShow} />
    </div>
  );
};

export default Search;
