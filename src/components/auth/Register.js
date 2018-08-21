import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { compose } from 'redux';
// import { connect } from 'react-redux';
// When doing authentication use firebaseConnect
import { firebaseConnect } from 'react-redux-firebase';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  onSubmit = e => {
    e.preventDefault();

    const { firebase } = this.props;
    const { email, password } = this.state;

    // Register with firebase
    firebase
      .createUser({ email, password })
      .catch(err => alert('User Already exists'));
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <div className="valign-wrapper row login-box">
          <div className="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
            <form onSubmit={this.onSubmit}>
              <div className="card-content center-align ">
                <i className="material-icons medium">how_to_reg</i>
                <span className="card-title center-align">Register</span>
                <div className="row">
                  <div className="input-field col s12">
                    <label htmlFor="email">Email address</label>
                    <input
                      type="email"
                      className="validate"
                      name="email"
                      required
                      value={this.state.email}
                      onChange={this.onChange}
                      id="email"
                    />
                  </div>
                  <div className="input-field col s12">
                    <label htmlFor="password">Password </label>
                    <input
                      type="password"
                      className="validate"
                      name="password"
                      required
                      value={this.state.password}
                      onChange={this.onChange}
                      id="password"
                    />
                  </div>
                </div>
              </div>
              <div className="card-action center-align">
                <input
                  type="submit"
                  className="btn cyan lighten-2 waves-effect waves-light"
                  value="Login"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired
};

export default firebaseConnect()(Login);
