import { createContext, useState } from "react"

const cartContext = createContext();

/**
 * @function CartContextProvider Componente que sirve para almacenar datos en la aplicación a nivel global. Parecido a Redux pero no tan complicado.
 * @param {*} props Todos los componentes hijos de mi aplicación.
 * @property {*} values Valores a los cuales la aplicación va a poder acceder. Se debe declarar en forma de objeto y se lo pasa al Provider.
 * @returns {Component} Render de toda la aplicación, ya que si uno entra a App.js verá que los tags de este component abarcan toda la aplicación.
 */
export function CartContextProvider(props) {
    const [cart, setCart] = useState([]);

    /**
     * @func itemsInCart
     * @summary Devuelve la cantidad total de productos en el carrito.
     * @returns {number} Total de items.
     */
    function totalItemsInCart() {
        let total = 0;
        cart.forEach(item => {
            total = total + item.quantity;
        });
        return total;
    }


    /**
     * @function addToCart
     * @summary Agrega un item que recibe por parámetro al carrito. No debe repetirse ningún item, en cambio, debe sumarse a la quantity del item pre-existente.
     * @param {*} item Item a agregar al carrito con State.
     */
    function addToCart(item) {
        let itemFound = cart.find(itemInCart => itemInCart.id === item.id); 

        if (itemFound) {
            let newCart = cart.map(itemInCart2 => {
                if (itemInCart2.id === item.id) {
                    itemInCart2.quantity += item.quantity;
                    return itemInCart2;
                } else {
                    return itemInCart2;
                }
            });
            setCart(newCart);
        }
        else {
            const newCart = [...cart];
            newCart.push(item);
            setCart(newCart);
        }
        // else {
        //     setCart ( (newCart) => {
        //         newCart.push(item);
        //         return newCart;
        //     });
        // }
    }

    /**
     * @member values Propiedades pre-definidas del Context. 
     * @desc En forma de objeto, "values" se van a pasar a "value". Haciendo esto, logramos que las propiedades definidas en "values" puedan ser utilizadas en todo el Context (es decir la aplicación).
     */
    const values = {
        totalItems: totalItemsInCart(),
        randomValue: 55,
        addToCart: addToCart,
        cart: cart
    }

    return (
        <cartContext.Provider value={values}>
            {props.children}
        </cartContext.Provider>

    );
}

export default cartContext;
