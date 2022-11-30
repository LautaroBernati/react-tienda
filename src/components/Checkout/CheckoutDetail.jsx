import React from 'react';
import './checkoutdetail.css';

function CheckoutDetail(props) {
    let fecha = new Date(props.transactionDate);
    fecha = fecha.getHours() + ':' + fecha.getMinutes() + 'hs, ' + fecha.getDate() + '-' + fecha.getMonth() + '-' + fecha.getFullYear()
    return (
        <div className='m-1 detail-container' style={{ border: '1px solid lightgrey', borderRadius: '5px', width: '90rem' }}>
            <div className='p-4'>
                <h3 className='mb-3'> Detalle de tu compra <hr /> </h3>

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
                        </tr>
                    </thead>
                    <tbody>
                        {props.orderDetail.map((cartItem) => (
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
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={5}></td>
                            <td colSpan={1}> <div className='text-success'> Total Abonado: </div> </td>
                            <td colSpan={1}> <div className='text-success'> $ {props.total} </div> </td>
                        </tr>
                        <tr>
                            <td colSpan={5}></td>
                            <td colSpan={1}> <div className='text-info'> Fecha Transacción: </div> </td>
                            <td colSpan={1}> <div className='text-info'> {fecha} </div> </td>
                        </tr>
                    </tbody>
                </table>
                <h3> Datos del Comprador <hr /></h3>

                <div className='datos-comprador' style={{width: '20rem'}}>
                    <div className='row'>
                        <div className='col'>
                            Nombre:
                        </div>
                        <div className='col'>
                            {props.buyer.name}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            Email:
                        </div>
                        <div className='col'>
                            {props.buyer.email}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            Teléfono:
                        </div>
                        <div className='col'>
                            {props.buyer.phone}
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default CheckoutDetail;
