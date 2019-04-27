import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { setCurrentUser, logoutUser } from './redux/actions/auth';
import { clearCurrentProfile } from './redux/actions/handleProfile';
import jwt_decode from 'jwt-decode';
import setJwtAutorization from './common/utils/setJwtAutorzation';

import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './common/PrivateRoute';
import CreateProfile from './components/profile/CreateProfile';
import EditProfile from './components/profile/EditProfile';
import AddEducation from './components/profile/AddEducation';
import UserProfile from './components/profile/ProfilePage/UserProfile';
import Profiles from './components/profile/Profiles';
import Posts from './components/posts/Posts';
import Post from './components/comments/Post';

import './App.css';

if (localStorage.jwtToken) {
  // Set auth token header auth
  setJwtAutorization(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decodedJwt = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decodedJwt));
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decodedJwt.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
        <div className="Application">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile/:handle" component={UserProfile} />
            <Route exact path="/profiles" component={Profiles} />
            <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
                <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            </Switch>
            <Switch>
                <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            </Switch>
            <Switch>
                <PrivateRoute exact path="/add-education" component={AddEducation} />
            </Switch>
            <Switch>
                <PrivateRoute exact path="/news-feed" component={Posts} />
            </Switch>
            <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
            </Switch>
          </div>
        </div>
        <Footer />
      </Router>
      </Provider>
    );
  }
}

export default App;
