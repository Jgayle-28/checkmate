import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
// When doing authentication use firebaseConnect
import { firestoreConnect } from 'react-redux-firebase';

class UserNavbar extends Component {
  // Delete Week
  deleteWeek = () => {
    const { firestore } = this.props;

    const collection = firestore.collection('dailyEntry');

    // CODE THAT CLEARS COLLECTION
    collection.get().then(snapshot => {
      snapshot.forEach(doc => {
        doc.ref.delete();
      });
    });
  };

  render() {
    return (
      <div>
        <nav className="white fade-in">
          <div className="nav-container">
            <div className="nav-wrapper">
              <ul className="center-align hide-on-med-and-down">
                <li className="nav-link">
                  <span className="blue-grey-text user-greeting">
                    WELCOME <span className="user-bar">|</span>{' '}
                    <span className="user-name">Jerehme</span>
                  </span>
                </li>
              </ul>
              <button
                className="btn btn-small right day-card-btn-delete clear-week-btn"
                type="submit"
                name="action"
                onClick={this.deleteWeek}
              >
                Clear Week
              </button>

              <Link
                to="/day/add"
                className="btn btn-small day-card-btn-edit right add-day-btn"
              >
                Add Day
              </Link>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

UserNavbar.propTypes = {
  firestore: PropTypes.object.isRequired,
  dailyEntry: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: 'dailyEntry' }]),
  connect((state, props) => ({
    dailyEntry: state.firestore.ordered.dailyEntry
  }))
)(UserNavbar);
