import "./navbar.css";
import CartWidget from "./CartWidget/CartWidget";
import { Link } from "react-router-dom";

function NavBar() {
    return (
    <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/" style={{textAlign: "center"}}>Tienda - Via France</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                        <li className="nav-item active">
                        <a className="nav-link" href="/home">Home</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="/about">Acerca De</a>
                        </li>
                        <li className="nav-item dropdown">
                            
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Catálogo
                            </a>
                            
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">                                
                                <Link className="dropdown-item" to={"/products"}>Todas</Link>
                                <Link className="dropdown-item" to={"/products/category/day"}>De Día</Link>
                                <Link className="dropdown-item" to={"/products/category/night"}>De Noche</Link>
                            </div>
                        </li>
                        <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="bottom" title="coming soon">
                            <a className="nav-link disabled" href="#">Login</a>
                        </li>
                        <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="bottom" title="coming soon">
                            <a className="nav-link disabled" href="#">Logout</a>
                        </li>
                    </ul>
                    
                    <div className="dropstart">
                        <CartWidget></CartWidget>
                        <ul className="dropdown-menu">
                            <Link to='/cart' className="dropdown-item"> Ver Carrito </Link>
                            <a className="dropdown-item" href="/vaciarcarrito">Vaciar Carrito</a>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </>
    );
}

export default NavBar;