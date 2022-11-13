import React, { useState } from "react";
import ItemCount from "../ItemCount/ItemCount";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

function ItemDetail({product}) {
    const [isInCart, setIsInCart] = useState(false);



    function onAddToCart(contador) {
        console.log('Desde el padre, recibo el contador:', contador);
        setIsInCart(true);
        Swal.fire({
            title: 'Éxito',
            text: 'Se agregó el item al carrito',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
        });
        // aca se haria lo de agregar al carrito puntualmente
    }

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

        {
            !isInCart ?
                <ItemCount stock={product.stock} addToCart={onAddToCart} />
            :
                <>
                    <Link to='/cart'>
                        <button className="btn btn-outline-success">Ir al carrito</button>
                    </Link>
                </>
        }

        </div>
    );
}

export default ItemDetail;
