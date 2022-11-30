import React, { useState } from 'react'
import InputField from '../InputField/InputField';
import Swal from 'sweetalert2';
import "./buyform.css";

function BuyForm(props) {
    const [userData, setUserData] = useState({
        name: "",
        phone: "",
        email: "",
    });
    let err = false;

    function onInputChange(event) {
        const inputName = event.target.name;
        const value = event.target.value;

        const newUserData = { ...userData };
        newUserData[inputName] = value;
        setUserData(newUserData);
    }

    function onSubmit(event) {
        err = false;
        event.preventDefault();
        if (!userData.name || !userData.email || !userData.phone) { // Validación muy básica, required está siendo ignorado.
            console.error('Formulario incompleto');
            err = true;
            return;
        }

        Swal.fire({
            icon: 'warning',
            title: 'Chequee sus datos',
            // text: `Nombre completo: ${userData.name} Email: ${userData.email}\nTeléfono: ${userData.phone}\n`,
            html:
                `
                <hr>
                <ul class='text-start'>
                    <li> <b>Nombre completo:</b> ${userData.name} </li>
                    <li> <b>Email:</b> ${userData.email} </li>
                    <li> <b>Teléfono:</b> ${userData.phone} </li>
                </ul>
                <p>
                    Total a pagar: <b>$ ${props.total}</b>
                </p>`,
            showCancelButton: true,
            cancelButtonText: `Volver`,
            confirmButtonColor: '#198754',
            confirmButtonText: 'Confirmar compra',
        }).then((result) => {
            if (result.isConfirmed) {
                props.onSubmit(userData);
            }
        })

    }

    return (
        <>
            {/* Modal */}
            <div className="modal fade" id="formularioComprador" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ justifyContent: 'center' }}> Datos del comprador </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form onSubmit={onSubmit} className="m-4" style={{ textAlign: 'left' }}>
                                <InputField
                                    titulo={'* Nombre Completo'}
                                    placeholder={'Ej: Juancito Perez'}
                                    MAX_CHARS={40}
                                    inputType={'text'}
                                    inputName={'name'}
                                    onInputChange={onInputChange}
                                />
                                <InputField
                                    titulo={'* Teléfono'}
                                    placeholder={'Ej: 1168041511'}
                                    MAX_CHARS={15}
                                    inputType={'text'}
                                    inputName={'phone'}
                                    onInputChange={onInputChange}
                                />
                                <InputField
                                    titulo={'* Email'}
                                    placeholder={'Ej: ejemplo@hosting.com'}
                                    MAX_CHARS={25}
                                    inputType={'email'}
                                    inputName={'email'}
                                    onInputChange={onInputChange}
                                />
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={onSubmit}
                                style={{ width: '100%' }}
                                data-bs-dismiss="modal"
                                disabled={!userData.name || !userData.email || !userData.phone}>
                                    Continuar
                                </button>
                        </div>
                    </div>
                </div>
            </div>
            <button type='button' className='btn btn-success' data-bs-toggle="modal" data-bs-target="#formularioComprador">
                Continuar
            </button>

            {/* <div className='mt-3' style={{ border: '1px solid lightgrey', borderRadius: '5px', width: '40rem', margin: 'auto' }}>
                
            </div> */}
        </>
    );
}

export default BuyForm;
