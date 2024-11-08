import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

import OrdersList from './components/OrdersList';
// import OrderForm from './components/OrderForm';

import ProductList from './components/ProductsList';
import ProductForm from './components/ProductForm';  


const App = () => {

  return (
    <Router>
      <Routes>
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/login' element={<LoginForm />} />

        <Route path="/orders" element={<OrdersList />} />

        <Route path="/products" element={<ProductList />} />
        <Route path="/products/new" element={<ProductForm />} />
        <Route path="/products/edit/:id" element={<ProductForm />} />
      </Routes>
    </Router>
  )

}

export default App;
