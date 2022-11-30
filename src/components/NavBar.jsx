import "./navbar.css";
import CartWidget from "./CartWidget/CartWidget";
import { Link } from "react-router-dom";
import cartContext from "../storage/CartContext";
import { useContext } from "react";

function NavBar() {
    const { clearCart } = useContext(cartContext);

    return (
    <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to={"/home"} style={{textAlign: "center"}}>Tienda - Via France</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                        <li className="nav-item active">
                            <Link className="nav-link" to={"/home"}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/about"}>Acerca De</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false"
                                role="button"
                                id="navbarDropdown">
                                Catálogo
                            </Link>

                            
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">                                
                                <Link className="dropdown-item" to={"/products"}>Todas</Link>
                                <Link className="dropdown-item" to={"/products/category/day"}>De Día</Link>
                                <Link className="dropdown-item" to={"/products/category/night"}>De Noche</Link>
                            </div>
                        </li>
                        {/* <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="bottom" title="coming soon">
                            <a className="nav-link disabled" href="#">Login</a>
                        </li>
                        <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="bottom" title="coming soon">
                            <a className="nav-link disabled" href="#">Logout</a>
                        </li> */}
                    </ul>
                    
                    <div className="dropstart">
                        <button className="nav-item dropdown-toggle" data-bs-toggle="dropdown">
                            <img className="cartwidget-img" src="/img/cart.svg" alt="carrito"/>
                            <CartWidget></CartWidget>
                        </button>
                        <ul className="dropdown-menu">
                            <Link to='/cart' className="dropdown-item"> Ver Carrito </Link>
                            <button className="dropdown-item" onClick={() => clearCart()}>Vaciar Carrito</button>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </>
    );
}

export default NavBar;