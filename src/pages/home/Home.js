import React from "react";
import AboutUs from "../../components/AboutUs";
import BackgroundImage from "../../components/BackgroundImage";

import Categories from "../../components/Categories";

import Products from "../../components/Products";
import Title from "../../components/Title";
import productList from "../../mocks/Products.json"

import './Home.css'

const Home = () => {

    return (
        <div className="home container">

            <BackgroundImage />

            <Title  name="Lastest products" />
            <Products products={productList} />

            <Categories />

            <AboutUs />

        </div>
    )
}

export default Home;