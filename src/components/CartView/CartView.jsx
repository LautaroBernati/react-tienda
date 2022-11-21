import React, { useContext } from 'react';
import cartContext from "../../storage/CartContext";
import { Link } from "react-router-dom";


function CartView() {
    const { cart, clearCart, removeItem, totalPrice } = useContext(cartContext);

    if (cart.length === 0) return <h1 className='text-center'>Tu carrito está vacío.</h1>

    return (
        <div className='container text-center mt-3'>
            <h1 className='fw-bold'>
                Tu carrito de compras
            </h1>
            <hr />

            <table className='table table-dark table-striped'>
                <thead>
                    <tr>
                        <th>Creador</th>
                        <th>Fragancia</th>
                        <th>Sexo</th>
                        <th>Medida</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Precio Total</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody>
                    {/* //TODO: Arreglar la lista segun el carrito*/}
                    {cart.map((cartItem) => (
                        <tr key={cartItem.id}>
                            <td>
                                {cartItem.creator}
                            </td>
                            <td>
                                {cartItem.fragrance}
                            </td>
                            <td>
                                {cartItem.gender}
                            </td>
                            <td>
                                100 mL
                            </td>
                            <td>
                                {cartItem.quantity}
                            </td>
                            <td>
                                $ {cartItem.price100ml}
                            </td>
                            <td>
                                $ {cartItem.quantity * cartItem.price100ml}
                            </td>
                            <td>
                                <button onClick={() => removeItem(cartItem.id)} className='btn btn-outline-danger'>
                                    X
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <hr />
            <h4>Total a pagar:</h4>
            <h5>$ {totalPrice()}</h5>
            <br />

            <button className='btn btn-success'> Finalizar compra </button>
            <Link to='/products'>
                <button className='btn btn-info'> Volver al catálogo </button>
            </Link>

            <button className='btn btn-warning' onClick={() => clearCart()}> Vaciar carrito </button>
        </div>
    )
}

export default CartView