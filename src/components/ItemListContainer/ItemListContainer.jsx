import React from "react";
import FlexWrapper from "../FlexWrapper/FlexWrapper";
import Item from "../Item/Item";

function ItemListContainer(props) {
  return (
    <div>
        <h2>{props.greeting}</h2>
        <FlexWrapper>
            <Item
            detail="Lorem ipsum"
            price={2100}
            title="Producto 1"
            imgurl="/img/silla1.webp"
            />
            <Item
            detail="Lorem ipsum"
            price={3100}
            title="Producto 2"
            imgurl="placeholder"
            />
            <Item
            detail="Lorem ipsum"
            price={5000}
            title="Producto 3"
            imgurl="placeholder"
            />
        </FlexWrapper>
    </div>
  );
}

export default ItemListContainer;