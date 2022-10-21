import React from "react";
import "./cartwidget.css";

/**
 * @component CartWidget
 * @summary Componente parte del NavBar, que tiene parte del toggle del carrito junto con la imagen del mismo.
 * @param {Object} props Cualquier prop que se le pase por parámetro.
 * @returns {JSX.Element}
 */
function CartWidget(props) {
  return (
    <>
        <button className="nav-item dropdown-toggle" data-bs-toggle="dropdown">
            {props.children}
            <img className="cartwidget-img" src="/img/cart.svg" alt="carrito"/>
        </button>
        
    </>
  );
}

export default CartWidget;