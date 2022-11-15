import React, { useEffect, useState } from "react";
import AboutUs from "../../components/AboutUs";
import BackgroundImage from "../../components/BackgroundImage";

import Categories from "../../components/Categories";

import Products from "../../components/Products";
import Title from "../../components/Title";
import useHttp from "../../hooks/useHttp";

import './Home.css'

const Home = () => {

    const [productList, setProductList] = useState([])
    const {loading, request } = useHttp();

    useEffect(() => {
        getLastestProducts();
    },[])

    const getLastestProducts = async () => {
        const data = await request({endpoint: "get-lastest-products"});
        
        setProductList(data)
    }

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