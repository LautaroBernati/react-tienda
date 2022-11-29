import React, { useState } from 'react'
import InputField from '../InputField/InputField';

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

        const newUserData = {...userData};
        newUserData[inputName] = value;
        setUserData(newUserData);
    }

    function onSubmit(event) {
        err = false;
        event.preventDefault();
        console.log(userData);
        if (!userData.name || !userData.email || !userData.phone) { // Validación muy básica, required está siendo ignorado.
            console.error('Formulario incompleto');
            err = true;
            return;
        }
        // setUserData({
        //     name: "",
        //     phone: "",
        //     email: ""
        // });
        
        props.onSubmit(userData);
    }
    
    return (
        <div className='mt-3' style={{border:'1px solid lightgrey', borderRadius:'5px', width:'40rem', margin:'auto'}}>
        <h2 className='m-2'>Datos del comprador</h2>
        <form onSubmit={onSubmit} className="m-4" style={ {textAlign:'left'} }>
            <hr />
            {/* <div className='mb-3'>
                <label className='form-label' style={{}}> * Nombre {err === true ? errDisplay : <></>}</label>
                <input
                    placeholder='Ej: Juan Perez'
                    maxLength={ MAX_CHAR_NAME }
                    className='form-control'
                    id='FormControlName'
                    name='name'
                    type='text'
                    required={true}
                    value={ userData.name }
                    onChange={onInputChange}
                    />
                <small>máximo { MAX_CHAR_NAME } caracteres</small>
            </div> */}
            <InputField
                titulo={'* Nombre'}
                placeholder={'Ej: Juancito Perez'}
                MAX_CHARS={ 40 }
                inputType={'text'}
                inputName={'name'}
                // inputBind={ userData.name }
                onInputChange={ onInputChange }
            />
            <InputField
                titulo={'* Teléfono'}
                placeholder={'Ej: 1168041511'}
                MAX_CHARS={ 15 }
                inputType={'text'}
                inputName={'phone'}
                // inputBind={ userData.phone }
                onInputChange={ onInputChange }
            />
            {/* <div className='mb-3'>
                <label className='form-label' style={{}}>  </label>
                <input
                    placeholder='Ej: 1168041511'
                    maxLength={ MAX_CHAR_PHONE }
                    className='form-control'
                    id='FormControlPhone'
                    name='phone'
                    type='text'
                    required={true}
                    value={ userData.phone }
                    onChange={onInputChange}
                    />
                <small>máximo { MAX_CHAR_PHONE } caracteres</small>
            </div> */}
            <InputField
                titulo={'* Email'}
                placeholder={'Ej: ejemplo@hosting.com'}
                MAX_CHARS={ 25 }
                inputType={'email'}
                inputName={'email'}
                // inputBind={ userData.email }
                onInputChange={ onInputChange }
            />
            {/* <div className='mb-3'>
                <label className='form-label' style={{}}> * Email </label>
                <input
                    placeholder='Ej: ejemplo@hosting.com'
                    maxLength={ MAX_CHAR_EMAIL }
                    className='form-control'
                    id='FormControlEmail'
                    name='email'
                    type='email'
                    required={true}
                    value={ userData.email }
                    onChange={onInputChange}
                    />
                <small>máximo { MAX_CHAR_EMAIL } caracteres</small>
            </div> */}
            
            <button className='btn btn-outline-primary' style={{width:'100%'}} onClick={onSubmit}>
                Enviar
            </button>
        </form>
        </div>
    );
}

export default BuyForm;
