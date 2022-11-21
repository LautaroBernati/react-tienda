import './App.css';
import NavBar from './components/NavBar';
// import { getSingleItemFromAPI } from './services/firebase';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Componentes
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Footer from './components/Footer/Footer';
import CartView from './components/CartView/CartView';
import { CartContextProvider } from './storage/CartContext';

function App() {
  return (
    <div className="App">
      <CartContextProvider>
        <BrowserRouter>
          <NavBar />

          <Routes>

            <Route path='/' element={ <h1 className='text-center w3-animate-opacity'>Esto va a ser un Home</h1> } />
            <Route path='/home' element={<Navigate to={'/'}></Navigate>}/>
            <Route path='/cart' element={ <CartView /> } />
            <Route path='/about' element={ <h1 className='text-center'>Acerca de tal y cual</h1> } />
            <Route path='/products' element={<ItemListContainer />} />
            <Route path='/products/category/:catId' element={<ItemListContainer />} />
            <Route path='/products/detail/:id' element={ <div style={{ textAlign: "-webkit-center" }}> <ItemDetailContainer /> </div> } />
            <Route path='*' element={ <h2 className='text-center'><p> oops 404 not found </p></h2> } />

          </Routes>
        </BrowserRouter>

        <Footer />
      </CartContextProvider>
    </div>
  );
}

export default App;
