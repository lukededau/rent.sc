import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

import { AuthProvider } from './Contexts/AuthContext';
import PrivateRoute from './Components/PrivateRoute';

//All views
import Home from './views/Home';
import PageNotFound from './views/PageNotFound';
import createListing from './views/createListing';
import Login from './views/Login';
import Signup from './views/Signup';
import UserProfile from './views/UserProfile';
import listing from './views/listing';
import SelectAppointmentTimes from './views/SelectAppointmentTimes';
import ScheduleAppointment from './views/ScheduleAppointment';
import ViewAppointments from './views/ViewAppointments';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthProvider>
          <PrivateRoute exact path="/userprofile" component={UserProfile} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route exact path="/create-listing" component={createListing} />
          <Route exact path="/listings" component={listing} />
          <Route exact path="/select-appointment-times" component={SelectAppointmentTimes} />
          <Route exact path="/schedule-appointment" component={ScheduleAppointment} />
          <Route exact path="/view-appointments" component={ViewAppointments} />
          <Route exact path="/" component={Home} />
        </AuthProvider>

        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;