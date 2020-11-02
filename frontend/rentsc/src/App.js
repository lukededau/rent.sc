import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

import { AuthProvider } from './Contexts/AuthContext';

//All views
import Home from './views/Home';
import PageNotFound from './views/PageNotFound';
import createListing from './views/createListing';
import Login from './views/Login';
import Signup1 from './views/SignupB';
import Signup from './views/Signup'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/create-listing" component={createListing} />
        <Route exact path="/signUp1" component={Signup1} />
        <AuthProvider>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
        </AuthProvider>
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;