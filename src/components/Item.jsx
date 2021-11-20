import React from "react";

const Item = ({title, imgUrl}) => {
    return (
        <div className="item">
            <h3>{title}</h3>
            <img src={imgUrl} alt="img" />
        </div>
    )
}

export default Item;