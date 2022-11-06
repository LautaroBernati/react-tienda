import './App.css';
import NavBar from './components/NavBar';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Componentes
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />

        
        <Routes>

          <Route
            path='/'
            element={
              <h1 className='text-center'>Esto va a ser un Home</h1>
            }
            >
          </Route>

          <Route
            path='/home'
            element={<Navigate to={'/'}></Navigate>}
            >
          </Route>
          
          <Route
            path='/about'
            element={
              <h1 className='text-center'>Acerca de tal y cual</h1>
            }
            >
          </Route>

          <Route
            path='/products'
            element={<ItemListContainer />}
            >
          </Route>
          <Route
            path='/products/category/:catId'
            element={<ItemListContainer />}
            >
          </Route>
          <Route
            path='/products/detail/:id'
            element={
              <div style={{textAlign:"-webkit-center"}}>
                <ItemDetailContainer />
              </div>
            }
            >
          </Route>

          <Route 
            path='*'
            // exact={true}
            element = {
                <h2 className='text-center'><p> oops 404 not found </p></h2>
              }
            />

        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
