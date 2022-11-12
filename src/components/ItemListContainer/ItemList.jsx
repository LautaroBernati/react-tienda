import React from "react";
import { useParams, NavLink } from "react-router-dom";
import FlexWrapper from "../FlexWrapper/FlexWrapper";
import Item from "../Item/Item";
import Loader from "../Loader/Loader";
import "./itemlist.css";

function ItemList(props) {
    let params = useParams();
    let category = params.catId;

    let emptyArray = props.productsList.length === 0;

    if (emptyArray) return (
        <div className="container text-center mt-5">
            <Loader size={128} color={"darkgrey"} />
        </div>
    );

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

            <div className="container">
                <FlexWrapper>
                    {props.productsList.map((product) => (
                        <Item key={product.id} product={product} />
                    ))}

                </FlexWrapper>
            </div>
        </>
    );
}

export default ItemList;