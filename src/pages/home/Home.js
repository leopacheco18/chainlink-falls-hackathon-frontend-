import React from "react";

import Categories from "../../components/Categories";

import Products from "../../components/Products";

import './Home.css'

const Home = () => {

    return (
        <div className="home">

            <Products />

            <Categories />

        </div>
    )
}

export default Home;