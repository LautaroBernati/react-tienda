import React, { useState, useEffect } from "react";
import { getSingleItemFromAPI } from "../../data/mockService";
import { useParams } from "react-router-dom";

function ItemDetailContainer() {
    const [product, setProduct] = useState([]);

    let params = useParams();
    let id = params.id;

    useEffect(() => {
        getSingleItemFromAPI(id)
            .then((itemsDB) => {
                setProduct(itemsDB);
            })
            .catch((error) => alert(error));
    }, [id]);

    return (
        <div className="w3-animate-opacity">
            <div className="card" style={{ width: "18rem" }}>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <img src={product.imgurl} className="card-img-top" alt="imgProduct"></img>
                    </li>
                    <li className="list-group-item">
                        <div className="card-body">
                            <h5 className="card-title"> {product.fragrance} </h5>
                            <p className="card-text">{product.creator}</p>
                            {product.gender}
                        </div>
                    </li>
                    <br />
                    <div className="text-center">
                        Precios
                    </div>
                    <br />
                    <li className="list-group-item">
                        <h5 className="priceTag">$ {product.price100ml} x 100 mL </h5>
                        <h5 className="priceTag">$ {product.price60ml} x 60 mL </h5>
                    </li>
                </ul>
                <div className="text-center m-3">
                    <p className="text-center fw-lighter fst-italic">
                        Categoría {product.category === "night" ? "Noche" : "Día"}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ItemDetailContainer;