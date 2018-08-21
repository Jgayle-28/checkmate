import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';

import CountUp from 'react-countup';

class StatCounters extends Component {
  state = {
    weekTotalMade: null,
    weekTotalHours: null,
    weekTotalDays: null
  };

  static getDerivedStateFromProps(props, state) {
    const { dailyEntry } = props;

    if (dailyEntry) {
      //Adding weekTotalMade
      const totalMade = dailyEntry.reduce((totalMade, day) => {
        return totalMade + parseFloat(day.moneyMade.toString());
      }, 0);

      //Adding weekTotalHours
      const totalHours = dailyEntry.reduce((totalHours, day) => {
        return totalHours + parseFloat(day.hoursWorked.toString());
      }, 0);

      // Total Days worked
      const totalDays = dailyEntry.length;

      return {
        weekTotalMade: totalMade,
        weekTotalHours: totalHours,
        weekTotalDays: totalDays
      };
    } else {
      return null;
    }
  }

  componentDidMount() {}

  render() {
    const { dailyEntry } = this.props;
    const { weekTotalMade, weekTotalHours, weekTotalDays } = this.state;

    if (dailyEntry) {
      return (
        <div className="statCounters">
          {/* Section: Stats */}
          <div className="col s12 m6 l3 fade-in-top">
            <div className="card-panel card-bg white-text center">
              <i className="material-icons medium">attach_money</i>
              <h5 className="card-title">Total Made</h5>
              <h3 className="count">
                <CountUp delay={0.4} end={weekTotalMade} />
              </h3>
            </div>
          </div>
          <div className="col s12 m6 l3 fade-in-top">
            <div className="card-panel card-bg white-text center">
              <i className="material-icons medium">access_alarms</i>
              <h5 className="card-title">Total Hours</h5>
              <h3 className="count">
                <CountUp delay={0.4} end={weekTotalHours} />
              </h3>
            </div>
          </div>
          <div className="col s12 m6 l3 fade-in-top">
            <div className="card-panel card-bg white-text center">
              <i className="material-icons medium">gavel</i>
              <h5 className="card-title">Days Worked</h5>
              <h3 className="count">
                <CountUp delay={0.4} end={weekTotalDays} />
              </h3>
            </div>
          </div>
          <div className="col s12 m6 l3 fade-in-top">
            <div className="card-panel card-bg white-text center">
              <i className="material-icons medium">flash_on</i>
              <h5 className="card-title">
                {' '}
                <span>Meatloafs </span> <span> Made</span>
              </h5>
              <h3 className="count">
                <CountUp delay={0.4} end={100} />
              </h3>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

StatCounters.propTypes = {
  firestore: PropTypes.object.isRequired,
  dailyEntry: PropTypes.array
};

export default compose(
  // collection from firebase you want to work with
  firestoreConnect([{ collection: 'dailyEntry' }]),
  connect((state, props) => ({
    dailyEntry: state.firestore.ordered.dailyEntry
  }))
)(StatCounters);
