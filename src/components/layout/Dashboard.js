import React from 'react';
import Days from '../dayLogs/Days';
import StatCounters from '../layout/StatCounters';
import UserNavbar from './UserNavbar';

export default () => {
  return (
    <div>
      <div className="row">
        <UserNavbar />
      </div>
      <section className="section section-stats center">
        <div className="row">
          <StatCounters />
        </div>
      </section>

      <section className="section section-stats center">
        <div className="row">
          <Days />
        </div>
      </section>
    </div>
  );
};
