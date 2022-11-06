import React from "react";
import { useParams, NavLink } from "react-router-dom";
import FlexWrapper from "../FlexWrapper/FlexWrapper";
import Item from "../Item/Item";
import "./itemlist.css";

function ItemList(props) {
    let params = useParams();
    let category = params.catId;

    return (
        <>
            <div className="text-center container p-4">
                <h4 className="text-muted mb-3"> Filtrar por Categoría </h4>
                <div>
                <NavLink to={"/products"} className={() => category === undefined ? "btn btn-outline-success disabled" : "btn btn-outline-success"}
                    role="button">
                    Todos
                </NavLink>
                <NavLink to={"/products/category/night"} className={() => category === "night" ? "btn btn-outline-success disabled" : "btn btn-outline-success"}
                    role="button">
                    De Noche
                </NavLink>
                <NavLink to={"/products/category/day"} className={() => category === "day" ? "btn btn-outline-success disabled" : "btn btn-outline-success"}
                    role="button">
                    De Día
                </NavLink>
                </div>
                <hr />
            </div>

            <FlexWrapper>
                {props.productsList.map((product) => (
                    <Item key={product.id} product={product} />
                ))}
            </FlexWrapper>
        </>
    );
}

export default ItemList;