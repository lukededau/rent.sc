import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

//All views
import Home from './views/Home';
import PageNotFound from './views/PageNotFound';
import createListing from './views/createListing';
import SignupLogin from './views/SignupLogin';
//import Signup from './views/Signup';
import Signup from './views/SignupB';
import listing from './views/listing'
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignupLogin} />
        <Route exact path="/create-listing" component={createListing} />
        <Route exact path="/signUp1" component={Signup} />
        <Route exact path="/listings" component={listing} />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;