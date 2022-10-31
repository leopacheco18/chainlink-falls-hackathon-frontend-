import React, { useEffect, useState } from "react";

import './index.css'

const Title = ({ name }) => {

    const [pixels, setPixels] = useState(0)

    useEffect(() => {
        setPixels((name.length * 10) + 15)
    }, [name])

    return (
        <div className="title-name" style={{ width: pixels }}>
            <span className="name">
                {name}
            </span>
        </div>
    )
}

export default Title;