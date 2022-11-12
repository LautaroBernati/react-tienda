import React, { useState } from 'react';
import './itemcount.css';

function ItemCount( { stock } ) {
    const [count, setCount] = useState(1);

    function handleAdd(evt) {
        if (count < stock) {
            setCount(count + 1);
        };
    }

    function handleSubstract(evt) {
        if (count > 1) setCount(count - 1);
    }

    function handleAgregarAlCarrito(e) {
        console.log('Todavía no hace nada');
    }

    return (
        <div className="itemcount_container">
            <div className="itemcount_control">
                <button className='btn btn-outline-dark' onClick={handleSubstract}>
                    -
                </button>
                <span className='fw-bold'>Cantidad : {count}</span>
                <button className='btn btn-outline-dark' onClick={handleAdd}>
                    +
                </button>
            </div>
            <div className="itemcount_btns">
                <button className='btn btn-outline-dark' onClick={ handleAgregarAlCarrito }>Agregar al Carrito</button>
            </div>
        </div>
    );
}

export default ItemCount;
