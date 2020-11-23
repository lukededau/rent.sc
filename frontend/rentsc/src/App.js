import React/*, { Component }*/ from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

import { AuthProvider } from './Contexts/AuthContext';
import PrivateRoute from './Components/PrivateRoute';

//All views
import Home from './views/Home';
import PageNotFound from './views/PageNotFound';
import createListing from './views/createListing';
import Login from './views/Login';
import Signup1 from './views/SignupB';
import Signup from './views/Signup';
import UserProfile from './views/UserProfile';
import listing from './views/listing';
import Messages from './views/Messages'

function App() {
  return (
    <BrowserRouter>
      <Switch>
<<<<<<< HEAD
        <Route exact path="/listings" component={listing} />
        <Route exact path="/" component={Home} />
        <Route exact path="/create-listing" component={createListing} />
        <Route exact path="/signUp1" component={Signup1} />
        <Route exact path="/messages" component={Messages} />
||||||| merged common ancestors
        <Route exact path="/listings" component={listing} />
        <Route exact path="/" component={Home} />
        <Route exact path="/create-listing" component={createListing} />
        <Route exact path="/signUp1" component={Signup1} />
=======
>>>>>>> 6908dbadd7775293446fc241e5e21ac1fa49184c
        <AuthProvider>
          <PrivateRoute exact path="/userprofile" component={UserProfile} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route exact path="/create-listing" component={createListing} />
          <Route exact path="/listings" component={listing} />
          <Route exact path="/" component={Home} />
        </AuthProvider>
<<<<<<< HEAD
        <Route exact path="/signUp1" component={Signup} />
||||||| merged common ancestors
        <Route exact path="/signUp1" component={Signup} />

=======

>>>>>>> 6908dbadd7775293446fc241e5e21ac1fa49184c
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;