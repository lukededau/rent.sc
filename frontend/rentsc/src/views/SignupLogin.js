import React, { useState, useEffect } from 'react';
//import { BrowserRouter, Switch, Route } from 'react-router-dom';
import firebase from '../firebase';
import Login from './Login';
import Hero from './Hero'

function SignupLogin() {
  
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [hasAccount, setHasAccount] = useState(false);

  function clearInputs() {
    setEmail('');
    setPassword('');
  };

  function clearErrors() {
    setEmailError('');
    setPasswordError('');
  };

  function handleLogin() {
    clearErrors();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
          switch(error.code){
              case "auth/invalid-email":
              case "auth/user-disabled":
              case "auth/user-not-found":
                  setEmailError(error.message);
                  break;
              case "auth/wrong-password":
                  setPasswordError(error.message);
                  break;
          }
      });
  };

  function handleSignUp() {
    clearErrors();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
          switch(error.code){
              case "auth/email-already-in-use":
              case "auth/invalid-email":
                  setEmailError(error.message);
                  break;
              case "auth/weak-password":
                  setPasswordError(error.message);
                  break;
          }
      });
  };

  function handleLogout() {
    firebase.auth().signOut();
  };

  function authListener() {
    firebase.auth().onAuthStateChanged((user) => {
        if(user) {
          clearInputs();
          setUser(user);
        }
        else {
          setUser('');
        }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  /*return (
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
  */

  return (
    <div className="App">
      {user ? (
          // Change later
        <Hero handleLogout={handleLogout}/>
      ) : (
        <Login
          email = {email}
          setEmail = {setEmail}
          password = {password}
          setPassword = {setPassword}
          handleLogin = {handleLogin}
          handleSignUp = {handleSignUp}
          hasAccount = {hasAccount}
          setHasAccount = {setHasAccount}
          emailError = {emailError}
          passwordError = {passwordError}
        />
      )}
    </div>
  );
}

export default SignupLogin;