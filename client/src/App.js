import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';


const App = () => {

  return (
    <Router>
      <Routes>
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/login' element={<LoginForm />} />
      </Routes>
    </Router>
  )

}

export default App;
