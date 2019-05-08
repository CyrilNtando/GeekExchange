import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logOutUser } from "./store/actions/authActions";
import { clearCurrentProfile } from "./store/actions/profileActions";
import { Provider } from "react-redux";
import store from "./store/store";
import PrivateRoute from "./components/common/PrivateRoute";
import "./App.css";

import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import CreateProfile from "./components/create-profile/CreateProfile";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import EditProfile from "./components/create-profile/EditProfile";
import AddExprience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import NotFound from "./components/not-found/NotFound";
import Post from "./components/post/Post";

//check if token exists on localstorage
if (localStorage.jwtToken) {
  //Set the auth token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user ingo and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  //Check for expired token
  const currenTime = Date.now() / 1000;
  if (decoded.exp < currenTime) {
    //logout user
    store.dispatch(logOutUser());
    //Clear current profile
    store.dispatch(clearCurrentProfile());
    //redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            {/**route for the landing page use exact to prevent routing multiple page*/}
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExprience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
