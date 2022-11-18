import React from "react";
import { useNavigate } from "react-router-dom";

import './index.css'

const Category = ({
    name,
    icon
}) => {
    const navigate = useNavigate();
    return (
        <div className="category" onClick={() =>navigate(`/category/${name}`)}>
            <div className="category-icon" >
                {icon}
            </div>
            <h2 className="category-name">
                {name}
            </h2>
        </div>
    )
}

export default Category;