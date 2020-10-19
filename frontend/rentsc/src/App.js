import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

//All views
import Home from './views/Home';
import Login from './views/Login';
import PageNotFound from './views/PageNotFound';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
