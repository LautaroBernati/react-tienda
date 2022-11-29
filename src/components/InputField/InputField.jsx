import React, { useState } from 'react';

function InputField(props) {
    const [err, setErr] = useState(true);
    let errDisplay = <i className='text-danger'>Debe completar el campo requerido</i>;

    /**
     * @desc Función que se encargará de actualizar el State que controla la reactividad del mensaje de error, y de enviar la data del input al padre.
     * @note Aclaración: Si el input está vacío, lo manda igual para poder ser validado correctamente del lado del padre.
     * @param {event} event Evento por defecto de javascript. Viene nativamente.
     */
    function ValidateField(event) {
        const value = event.target.value;
        if(!value) {
            const newErr = true;
            setErr(newErr);
        } else {
            const newErr = false;
            setErr(newErr);
        }
        props.onInputChange(event);
    }

    return (
        <div className='mb-3'>
            <label className='form-label' style={{}}> { props.titulo } {err === true ? errDisplay : <></>}</label>
            <input
                className='form-control'
                placeholder={ props.placeholder }
                maxLength={ props.MAX_CHARS }
                name={ props.inputName }
                type={ props.inputType }
                // value={ props.inputBind }
                onChange={ ValidateField }
            />
            <small>máximo {props.MAX_CHARS} caracteres</small>
        </div>
    )
}

export default InputField;
