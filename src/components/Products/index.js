import React from "react";

import { Col, Row } from 'antd';


import Product from "../Product";

const Products = ({ products }) => {


    const renderedProducts = Object.values(products).map((product, key) => {
        return (
            <Col className="gutter-row" span={24} md={12} lg={6} key={key}>
                <Product {...product} />
            </Col>
        )
    })

    return (
        <div>
            <Row gutter={[48, 24]} >
                {renderedProducts}
            </Row>
        </div>
    )
}


export default Products;