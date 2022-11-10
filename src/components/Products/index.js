import React from "react";

import { Col, Row } from 'antd';


import Product from "../Product";

const Products = ({ products }) => {


    const renderedProducts = Object.values(products).map((product, key) => {
        return (
            <Col className="gutter-row" span={6} key={key}>
                <Product {...product} />
            </Col>
        )
    })

    return (
        <div>
            <Row gutter={48} >
                {renderedProducts}
            </Row>
        </div>
    )
}


export default Products;