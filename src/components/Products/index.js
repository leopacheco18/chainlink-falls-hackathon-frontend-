import React, { useEffect } from "react";

import { Col, Row } from 'antd';

import { connect } from "react-redux";

import { receiveProductsRequest } from "../../store/product/actions";

import Product from "../Product";

import Title from "../Title";

const Products = ({ product, receiveProducts }) => {

    const { products, loading, error } = product

    const renderedProducts = Object.values(products).map(product => {
        return (
            <Col className="gutter-row" span={6}>
                <Product {...product} />
            </Col>
        )
    })

    useEffect(() => {
        receiveProducts()
    }, [receiveProducts])

    return (
        <div>
            <Title name="Lastest products" />
            <Row gutter={16} justify="space-between" >
                {renderedProducts}
            </Row>
        </div>
    )
}

const mapStateToProps = state => ({
    product: state.product
})

const mapDispatchToProps = dispatch => ({
    receiveProducts: () => dispatch(receiveProductsRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(Products);