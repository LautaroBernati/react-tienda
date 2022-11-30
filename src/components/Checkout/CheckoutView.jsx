import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getBuyOrderByID } from '../../services/firebase';
import Loader from '../Loader/Loader';
import CheckoutDetail from './CheckoutDetail';

function CheckoutView() {
    const [buyOrder, setBuyOrder] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        getBuyOrderByID(id)
            .then((orderFromDB) => {
                setBuyOrder(orderFromDB);
            })
            .catch((error) => console.error(error))
            .finally(() => setIsLoading(false));
    }, [id]);

    if (isLoading) return (
        <div className='mt-2 text-center'>
            <Loader size={100} />
        </div>);

    return (
        <div className='m-5 text-center'>
            <h3>¡Muchas gracias por tu compra!</h3>
            <h5>Su identificador de orden de compra es: { id } </h5>
            <hr />
            <CheckoutDetail
                orderDetail={buyOrder.items}
                total={buyOrder.total}
                transactionDate={buyOrder.date}
                buyer={buyOrder.buyer}
                />
        </div>
    );
}

export default CheckoutView;
