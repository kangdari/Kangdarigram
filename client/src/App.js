import React from 'react';
import GlobalStyle from './GlobalStyle';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/Navbar/NavBar';
import HomePage from './components/pages/HomePage/HomePage';
import LoginPage from './components/pages/LoginPage/LoginPage';
import RegisterPage from './components/pages/RegisterPage/RegisterPage';

import Auth from './hoc/auth';

function App() {
  return (
    <>
      <GlobalStyle />
      <NavBar />
      <Switch>
        <Route path='/' component={Auth(HomePage, null)} exact />
        <Route path='/login' component={Auth(LoginPage, false)} exact />
        <Route path='/register' component={Auth(RegisterPage, false)} exact />
      </Switch>
    </>
  );
}

export default App;
