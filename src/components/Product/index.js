import React from "react";

import { Avatar, Card } from 'antd';

const { Meta } = Card;

const Product = ({
    name,
    price,
    image
}) => {

    return (
        <Card
            hoverable
            style={{ width: 350 }}
            cover={<img alt="product" src={image} />}
        >
            <h3 className="product-name">
                {name}
            </h3>

            <p className="product-price">
                {price}
            </p>

            <Meta
                title="Europe Street beat"
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            />
        </Card>
    )
}

export default Product;