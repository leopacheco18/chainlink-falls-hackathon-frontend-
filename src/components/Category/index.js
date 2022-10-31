import React from "react";

import './index.css'

const Category = ({
    name,
    icon
}) => {
    return (
        <div className="category">
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