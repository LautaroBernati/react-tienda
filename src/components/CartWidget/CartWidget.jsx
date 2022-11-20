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
  const { totalItems } = useContext(cartContext);

  return (
    <>
        {/* <button className="nav-item dropdown-toggle" data-bs-toggle="dropdown"> */}
            <small> { totalItems > 0 ? totalItems : '' } </small>
            {/* {props.children} */}
        {/* </button> */}
        
    </>
  );
}

export default CartWidget;
