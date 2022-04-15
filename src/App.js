/* eslint-disable react/jsx-no-constructed-context-values */
import { React, useState } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import AuthContext from './store/authContext';

import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';
import AddPage from './pages/AddPage';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function logout() {
    setIsLoggedIn(false);
  }
  function login() {
    setIsLoggedIn(true);
  }

  const currentContextValue = { isLoggedIn, logout, login };

  return (
    <AuthContext.Provider value={currentContextValue}>
      <div className='App'>
        <Header />
        <Switch>
          <Route path='/' exact>
            <LoginPage />
          </Route>
          <ProtectedRoute path='/home'>
            <HomePage />
          </ProtectedRoute>
          <Route path='/register'>
            <RegisterPage />
          </Route>
          <Route path='/login'>
            <LoginPage />
          </Route>
          <ProtectedRoute path='/add'>
            <AddPage />
          </ProtectedRoute>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
