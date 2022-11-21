import React, { useState, useEffect } from "react";
import ItemList from "./ItemList";
// import { getItemsFromAPIByCategory, getItemsFromAPI } from "../../data/mockService";
import { getItemsFromAPI, getItemsFromAPIByCategory } from "../../services/firebase";
// import { getItemsFromAPIByCategory } from "../../data/mockService";
import { useParams } from "react-router-dom";

function ItemListContainer() {

  const [productsList, setProductsList] = useState([]);
  const { catId } = useParams();

  useEffect(() => {
    if (catId) {
      getItemsFromAPIByCategory(catId)
        .then((itemsDB) => {
          setProductsList(itemsDB);
        });
    } else {
      getItemsFromAPI()
        .then((itemsDB) => {
          setProductsList(itemsDB);
        });
    }
  }, [catId]);

  return (
      <>
        <ItemList productsList={productsList} />
        <div className="container">
          <p>Cantidad de resultados: {productsList.length} </p>
        </div>
      </>
    );
}

export default ItemListContainer;