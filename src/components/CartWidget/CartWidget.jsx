import React from "react";
import "./cartwidget.css";
import cartContext from "../../storage/CartContext";
import { useContext } from "react";

/**
 * @component CartWidget
 * @summary Componente parte del NavBar, que tiene parte del toggle del carrito junto con la imagen del mismo.
 * @param {any} props Cualquier prop que se le pase por parámetro.
 * @returns {JSX.Element}
 */
function CartWidget(props) {
  const context = useContext(cartContext);

  return (
    <div>
        <button className="nav-item dropdown-toggle" data-bs-toggle="dropdown">
            {props.children}
            <img className="cartwidget-img" src="/img/cart.svg" alt="carrito"/>
            <small> { context.totalItems } </small>
        </button>
        
    </div>
  );
}

export default CartWidget;
