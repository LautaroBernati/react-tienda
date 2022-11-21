import React, { useState, useEffect } from "react";
// import { getSingleItemFromAPI } from "../../data/mockService";
import { getSingleItemFromAPI } from "../../services/firebase";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
// import ItemCount from "../ItemCount/ItemCount";
import ItemDetail from "../ItemDetail/ItemDetail";

function ItemDetailContainer() {
    const [product, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    let params = useParams();
    let id = params.id;


    useEffect(() => {
        getSingleItemFromAPI(id)
            .then((itemsDB) => {
                setProduct(itemsDB);
            })
            .catch((error) => alert(error))
            .finally(() => setIsLoading(false));
    }, [id]);

    if (isLoading) return <Loader>Cargando...</Loader>;

    return <ItemDetail product={ product }/>;
}

export default ItemDetailContainer;