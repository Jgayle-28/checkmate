import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
// When doing authentication use firebaseConnect
import { firebaseConnect } from 'react-redux-firebase';

import logo from '../../images/logo.svg';
import clogo from '../../images/clogo.svg';

class AppNavbar extends Component {
  state = {
    isAuthenticated: false
  };

  // Use when you want to get something from your redux state and manipulate / use state
  static getDerivedStateFromProps(props, state) {
    // Getting the state from the auth prop of firebase from below
    const { auth } = props;

    if (auth.uid) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
  }

  onLogoutClick = e => {
    e.preventDefault();

    const { firebase } = this.props;

    firebase.logout();
  };

  render() {
    const { isAuthenticated } = this.state;
    const { uath } = this.props;

    return (
      <div>
        <div className=" navbar-fixed">
          <nav className="nav-bg fade-in">
            <div className="nav-container">
              {' '}
              {/* Logo */}
              <div className="nav-wrapper">
                <Link to="/" className="brand-logo">
                  <img
                    src={logo}
                    alt="Check Mate Logo"
                    className="brand-logo"
                  />
                </Link>
                <a
                  href="#"
                  data-target="mobile-nav"
                  className="sidenav-trigger right"
                >
                  <i className="material-icons">menu</i>
                </a>
                <ul className="right hide-on-med-and-down">
                  {isAuthenticated ? (
                    <span>
                      <li className="nav-link">
                        <Link to="/dashboard">DASHBOARD</Link>
                      </li>
                      <li className="nav-link">
                        <a href="#!" onClick={this.onLogoutClick}>
                          LOGOUT
                        </a>
                      </li>
                    </span>
                  ) : (
                    <span>
                      {/* <li className="nav-link">
                        <Link to="/register">REGISTER</Link>
                      </li> */}
                      <li className="nav-link">
                        <Link to="/login">LOGIN</Link>
                      </li>
                    </span>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
        {/* Side Nav */}
        <ul id="mobile-nav" className="sidenav">
          <li className="center">
            <Link to="/" className="brand-logo center">
              <img src={clogo} alt="Check Mate Logo" className="center" />
            </Link>
          </li>

          <div className="divider" />
          <li>
            <Link to="/">
              <i className="material-icons">home</i> Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard">
              <i className="material-icons">dashboard</i> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/day/add">
              <i className="material-icons">note_add</i> Add Day
            </Link>
          </li>

          <div className="divider" />

          <li>
            <a className="subheader">Account Controls</a>
          </li>
          <li>
            <a href="login.html" className="waves-effect">
              <i className="material-icons">lock</i>
              Logout
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

AppNavbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(AppNavbar);
