import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class AddDay extends Component {
  state = {
    currentDay: '',
    hoursWorked: '',
    moneyMade: '',
    dailyNotes: ''
  };

  onSubmit = e => {
    e.preventDefault();

    const newDay = this.state;

    const { firestore, history } = this.props;

    var id = 0;

    if (newDay.dailyNotes === '') {
      newDay.dailyNotes = 'No Notes for today';
    }

    if (id >= 0) {
      id++;
    }

    console.log(id);

    firestore
      .add({ collection: 'dailyEntry' }, newDay)
      .then(() => history.push('/dashboard'));
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="">
        <div className="valign-wrapper row login-box fade-in-fwd">
          <div className="col card hoverable s10 pull-s1 m6 pull-m3 l6 pull-l3">
            <form onSubmit={this.onSubmit}>
              <div className="card-content">
                <span className="card-title">Add Todays Numbers</span>
                <div className="row">
                  <div className="input-field col s12">
                    <label htmlFor="currentDay">Current Day</label>
                    <input
                      type="text"
                      className="validate"
                      name="currentDay"
                      minLength="2"
                      required
                      onChange={this.onChange}
                      value={this.state.currentDay}
                      id="currentDay"
                    />
                  </div>

                  <div className="input-field col s12">
                    <label htmlFor="hoursWorked">Hours Worked</label>
                    <input
                      type="text"
                      className="validate"
                      name="hoursWorked"
                      minLength="1"
                      required
                      onChange={this.onChange}
                      value={this.hoursWorked}
                      id="hoursWorked"
                    />
                  </div>

                  <div className="input-field col s12">
                    <label htmlFor="hoursWorked">Money Made</label>
                    <input
                      type="text"
                      className="validate"
                      name="moneyMade"
                      minLength="1"
                      required
                      onChange={this.onChange}
                      value={this.moneyMade}
                      id="moneyMade"
                    />
                  </div>

                  <div className="input-field col s12">
                    <label htmlFor="hoursWorked">Notes</label>
                    <input
                      type="text"
                      className="validate"
                      name="dailyNotes"
                      onChange={this.onChange}
                      value={this.dailyNotes}
                      id="dailyNotes"
                    />
                  </div>
                </div>
              </div>
              <div className="card-action center-align ">
                <input
                  type="submit"
                  className="btn cyan lighten-2 waves-effect waves-light add-day-btn"
                  value="ADD DAY"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddDay.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(AddDay);
