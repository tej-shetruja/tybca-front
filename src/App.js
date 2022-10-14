
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddPrduct from './components/AddProduct'
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
        <Routes>

          <Route path='/' element={<PrivateComponent />}>
            <Route path='/' element={<ProductList />}></Route>
            <Route path='/add' element={<AddPrduct />}></Route>
            <Route path='/update/:id' element={<UpdateProduct />}></Route>
            <Route path='/logout' element={<h1>Logout Component</h1>}></Route>
          </Route>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          
        </Routes>
      </BrowserRouter>
      <Footer />

    </div>
  );
}

export default App;
