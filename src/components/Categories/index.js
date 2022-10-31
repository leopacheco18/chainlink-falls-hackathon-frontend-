import React from "react";

import { Col, Row } from 'antd';

import { 
    AiFillAppstore, 
    AiFillCustomerService, 
    AiFillGift, 
    AiFillPicture, 
    AiFillRobot, 
    AiFillRocket, 
    AiFillSkin, 
    AiFillTwitterCircle 
} from "react-icons/ai";

import Category from "../Category";

import Title from "../Title";

import './index.css'

const CATEGORIES = [
    { name: 'Beauty', icon: <AiFillGift /> },
    { name: 'Clothes Man', icon: <AiFillRobot /> },
    { name: 'Clothes Women', icon: <AiFillSkin /> },
    { name: 'NFT', icon: <AiFillPicture /> },
    { name: 'Pets', icon: <AiFillTwitterCircle /> },
    { name: 'Toys', icon: <AiFillRocket /> },
    { name: 'Technology', icon: <AiFillCustomerService /> },
    { name: 'Others', icon: <AiFillAppstore /> },
]

const Categories = () => {

    const renderedCategories = Object.values(CATEGORIES).map(category => {
        return (
            <Col className="gutter-row" span={6}>
                <Category {...category} />
            </Col>
        )
    })

    return (
        <div className="categories">

            <Title name="Categories" />

            <Row gutter={16}>
                {renderedCategories}
            </Row>
        </div>
    )
}

export default Categories;