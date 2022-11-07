import React from "react";
import BackgroundImage from "../../components/BackgroundImage";

import Categories from "../../components/Categories";

import Products from "../../components/Products";

import './Home.css'

const Home = () => {

    return (
        <div className="home">

            <BackgroundImage />
{/* 
            <Products /> */}

            <Categories />

        </div>
    )
}

export default Home;