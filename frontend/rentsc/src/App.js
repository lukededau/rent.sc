import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

//All views
import Home from './views/Home';
import Login from './views/Login';
import PageNotFound from './views/PageNotFound';
import createListing from './views/createListing';
import Signup from './views/Signup';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/create-listing" component={createListing} />
        <Route exact path="/signUp" component={Signup} />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;