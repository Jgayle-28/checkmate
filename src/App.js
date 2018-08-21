import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth';

import { Provider } from 'react-redux';
import store from './store';

import AppNavbar from './components/layout/AppNavbar';
import Home from './components/layout/Home';
import Dashboard from './components/layout/Dashboard';
// import AppFooter from './components/layout/AppFooter';
import AddDay from './components/dayLogs/AddDay';
import EditDay from './components/dayLogs/EditDay';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
            <div className="">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route
                  exact
                  path="/dashboard"
                  component={UserIsAuthenticated(Dashboard)}
                />
                <Route
                  exact
                  path="/day/add"
                  component={UserIsAuthenticated(AddDay)}
                />
                <Route
                  exact
                  path="/day/edit/:id"
                  component={UserIsAuthenticated(EditDay)}
                />
                <Route
                  exact
                  path="/login"
                  component={UserIsNotAuthenticated(Login)}
                />
                <Route
                  exact
                  path="/register"
                  component={UserIsNotAuthenticated(Register)}
                />
              </Switch>
            </div>
            {/* <AppFooter /> */}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
