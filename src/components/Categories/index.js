import React from "react";

import { Col, Row } from 'antd';

import { 
    AiFillAppstore, 
    AiFillPicture, 
} from "react-icons/ai";

import { 
    GiLipstick,
    GiUnderwearShorts,
    GiSkirt
} from "react-icons/gi";

import {
    MdOutlineToys,
    MdPets,
    MdPhoneIphone
} from "react-icons/md"

import Category from "../Category";

import Title from "../Title";

import './index.css'

const CATEGORIES = [
    { name: 'Beauty', icon: <GiLipstick /> },
    { name: 'Clothes Man', icon: <GiUnderwearShorts /> },
    { name: 'Clothes Women', icon: <GiSkirt /> },
    { name: 'NFT', icon: <AiFillPicture /> },
    { name: 'Pets', icon: <MdPets /> },
    { name: 'Toys', icon: <MdOutlineToys /> },
    { name: 'Technology', icon: <MdPhoneIphone /> },
    { name: 'Others', icon: <AiFillAppstore /> },
]

const Categories = () => {

    const renderedCategories = Object.values(CATEGORIES).map((category,key) => {
        return (
            <Col className="gutter-row" span={24} md={12} lg={6} key={key}>
                <Category {...category} />
            </Col>
        )
    })

    return (
        <div className="categories">

            <Title name="Categories" />

            <Row gutter={[48, 24]}>
                {renderedCategories}
            </Row>
        </div>
    )
}

export default Categories;