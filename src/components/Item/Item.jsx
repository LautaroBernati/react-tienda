import React, { useState, /*useEffect*/ } from "react";
import { Link } from "react-router-dom";
import "./item.css";

function Item(props) {
  const [isFavorite, setIsFavorite] = useState(false);

  let classButtonFavorite = isFavorite === true ? "card-favicon favorite" : "card-favicon";

  let urlDetail = `/products/detail/${props.product.id}`;

  function handleFavorite() {
    setIsFavorite(!isFavorite);
  }

  return (
    <div className="card text-center">
      <button onClick={handleFavorite} className={classButtonFavorite}>
        ♥
      </button>
      <div className="card-img">
        <img src={props.product.imgurl} alt="Product img" />
      </div>
      <div className="card-detail">
        <h3>{props.product.fragrance}</h3>
        <p>{props.product.creator}</p>
        <p> {props.product.gender} </p>
        <h4 className="priceTag">$ {props.product.price100ml}</h4>
        <h4 className="priceTag">$ {props.product.price60ml}</h4>
      </div>
      <Link to={urlDetail}>
        <button className="btn btn-outline-info">Ver más!</button>
      </Link>
      <br />
      <div className="card-footer text-center">
        <p className="text-center fw-lighter fst-italic">
          Categoría {props.product.category === "night" ? "Noche" : "Día"}
        </p>
      </div>
    </div>
  );
}

export default Item;