import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';

class EditDay extends Component {
  constructor(props) {
    super(props);

    // Create ref
    this.currentDayInput = React.createRef();
    this.hoursWorkedInput = React.createRef();
    this.moneyMadeInput = React.createRef();
    this.dailyNotesInput = React.createRef();
  }

  onSubmit = e => {
    e.preventDefault();

    const { day, firestore, history } = this.props;

    // Updated day
    const updDay = {
      currentDay: this.currentDayInput.current.value,
      hoursWorked: this.hoursWorkedInput.current.value,
      moneyMade: this.moneyMadeInput.current.value,
      dailyNotes:
        this.dailyNotesInput.current.value === ''
          ? 'No Notes for today'
          : this.dailyNotesInput.current.value
    };

    // Update day in firstore
    firestore
      .update({ collection: 'dailyEntry', doc: day.id }, updDay)
      .then(history.push('/dashboard'));
  };

  render() {
    const { day } = this.props;

    if (day) {
      return (
        <div className="">
          <div className="row center-align">
            <div className="col s12 m6 mt-5">
              <Link to="/dashboard" className="">
                <div className="valign-wrapper center-align">
                  <i className="material-icons small">keyboard_arrow_left</i>
                  BACK TO DASHBOARD
                </div>
              </Link>
            </div>
          </div>

          <div className="valign-wrapper row login-box fade-in-fwd">
            <div className="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
              <form onSubmit={this.onSubmit}>
                <div className="card-content">
                  <span className="card-title">Edit {day.currentDay}</span>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        placeholder=""
                        type="text"
                        className="validate"
                        name="currentDay"
                        minLength="2"
                        required
                        ref={this.currentDayInput}
                        defaultValue={day.currentDay}
                        id="currentDay"
                      />
                      <span
                        className="helper-text"
                        data-error="wrong"
                        data-success="right"
                      >
                        Day
                      </span>
                    </div>

                    <div className="input-field col s12">
                      <input
                        type="text"
                        className="validate"
                        name="hoursWorked"
                        minLength="1"
                        required
                        ref={this.hoursWorkedInput}
                        defaultValue={day.hoursWorked}
                        id="hoursWorked"
                      />
                      <span
                        className="helper-text"
                        data-error="wrong"
                        data-success="right"
                      >
                        Hours Worked
                      </span>
                    </div>

                    <div className="input-field col s12">
                      <input
                        type="text"
                        className="validate"
                        name="moneyMade"
                        minLength="1"
                        required
                        ref={this.moneyMadeInput}
                        defaultValue={day.moneyMade}
                        id="moneyMade"
                      />
                      <span
                        className="helper-text"
                        data-error="wrong"
                        data-success="right"
                      >
                        Money Made
                      </span>
                    </div>

                    <div className="input-field col s12">
                      <input
                        type="text"
                        className="validate"
                        name="dailyNotes"
                        ref={this.dailyNotesInput}
                        defaultValue={day.dailyNotes}
                        id="dailyNotes"
                      />
                      <span
                        className="helper-text"
                        data-error="wrong"
                        data-success="right"
                      >
                        Daily Notes
                      </span>
                    </div>
                  </div>
                </div>
                <div className="card-action center-align ">
                  <input
                    type="submit"
                    className="btn cyan lighten-2 waves-effect waves-light add-day-btn"
                    value="UPDATE DAY"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

EditDay.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: 'dailyEntry', storeAs: 'day', doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    day: ordered.day && ordered.day[0]
  }))
)(EditDay);
