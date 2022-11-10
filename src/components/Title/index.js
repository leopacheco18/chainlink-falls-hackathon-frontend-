import React from "react";

import './index.css'

const Title = ({ name , width, fontSize}) => {

    return (
        <div className="title-name" style={{width, fontSize}}>
            <span className="name">
                {name}
            </span>
        </div>
    )
}

export default Title;