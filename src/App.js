//import logo from './logo.svg';
import './App.css';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
        <NavBar/>
        <ItemListContainer
          greeting="Mensaje desde App (padre)"
        />
    </div>
  );
}

export default App;
