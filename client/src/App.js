import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

import OrdersList from './components/OrdersList';
import ProductList from './components/ProductsList';



const App = () => {

  return (
    <Router>
      <Routes>
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/login' element={<LoginForm />} />

        <Route path="/orders" element={<OrdersList />} />
        <Route path="/products" element={<ProductList />} />
      </Routes>
    </Router>
  )

}

export default App;
