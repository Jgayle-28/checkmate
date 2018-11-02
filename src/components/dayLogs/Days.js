import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class Days extends Component {
  // Delete day
  onDeleteClick = id => {
    const { day, firestore, history } = this.props;

    // Just to make sure we are still getting day.id if something breaks
    console.log(id);

    firestore.delete({ collection: 'dailyEntry', doc: id });
  };

  render() {
    const { dailyEntry } = this.props;

    if (dailyEntry) {
      return (
        <div>
          {dailyEntry.map(day => (
            <div key={day.id} className="col s12 m4 fade-in-fwd ">
              <div className=" hoverable card horizontal day-card">
                <div className="card-image" />
                <div className="card-stacked">
                  <span className="day-card-bt" />

                  <h4 className="card-title day-card-header">
                    {day.currentDay}
                  </h4>
                  <div className="card-content ">
                    <span className=" card-mr day-card-cat">Worked </span>
                    <span className="day-card-arrow">
                      <i className="material-icons tiny">navigate_next</i>
                    </span>
                    <span className="title day-card-cat-total">
                      {day.hoursWorked} Hrs
                    </span>
                    <hr />

                    <span className=" card-mr day-card-cat">MADE </span>
                    <span className="day-card-arrow">
                      <i className="material-icons tiny">navigate_next</i>
                    </span>
                    <span className="title day-card-cat-total">
                      ${parseFloat(day.moneyMade).toFixed(2)}
                    </span>
                    <hr />

                    <span className=" card-mr day-card-cat">NOTES </span>
                    <span className="day-card-arrow">
                      <i className="material-icons tiny">keyboard_arrow_down</i>
                    </span>
                    <div className="title day-card-cat-notes">
                      {day.dailyNotes}
                    </div>
                  </div>

                  <div className="card-action">
                    <button
                      onClick={this.onDeleteClick.bind(this, day.id)}
                      className="btn day-card-btn-delete"
                    >
                      Delete
                    </button>

                    <Link
                      to={`/day/edit/${day.id}`}
                      className="btn day-card-btn-edit"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      return null;
    }
  }
}

Days.propTypes = {
  firestore: PropTypes.object.isRequired,
  dailyEntry: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: 'dailyEntry' }]),
  connect((state, props) => ({
    dailyEntry: state.firestore.ordered.dailyEntry
  }))
)(Days);
