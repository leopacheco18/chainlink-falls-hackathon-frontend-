import { Col, Input, Row, Select } from "antd";
import React from "react";
import Title from "../../Title";
import countryList from "../../../mocks/Countries.json";

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
const Info = ({setProduct, product}) => {
  const selectAfter = (
    <Select defaultValue="matic" className="select-after" value={product.currency} onChange={(e) => setProduct({...product, currency : e})}>
      <Select.Option value="MATIC">Matic</Select.Option>
      <Select.Option value="USD">USD</Select.Option>
    </Select>
  );

const handleChange = (e) => {
    setProduct({...product, [e.target.name] : e.target.value})
}

  return (
    <Row gutter={24}>
      <Col span={24} md={12}>
        <div>
          <Title name={"Title"} fontSize="1rem" />

          <Input placeholder="Title..." name="name" onChange={handleChange} value={product.name}   />
        </div>
        <div>
          <Title name={"Price"} fontSize="1rem" />

          <Input type="number" placeholder="0.00"  value={product.price} addonBefore={selectAfter} name="price" onChange={handleChange}  />
        </div>
        <div>
          <Row gutter={24}>
            <Col md={12} span={24}>
              <Title name={"Category"} fontSize="1rem" />
              <Select
                placeholder="Categories..."
                className="w-100"
                options={CATEGORIES}
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                value={product.category}
                onChange={(e) => setProduct({...product, category : e})}
              />
            </Col>
            <Col md={12} span={24}>
              <Title name={"Country"} fontSize="1rem"  />
              
        <Select
          placeholder="Country..."
          className="w-100"
          options={countryList}
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          value={product.flag}
          onChange={(e) => setProduct({...product, flag : e})}
        />
            </Col>
          </Row>
        </div>
      </Col>

      <Col span={24} md={12}>
        <div>
          <Title name={"Description"} fontSize="1rem" />
          <Input.TextArea value={product.description} placeholder="Description..."  rows={10} name="description" onChange={handleChange} />
        </div>
      </Col>
    </Row>
  );
};

export default Info;
