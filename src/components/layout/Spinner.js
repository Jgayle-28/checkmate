import React from 'react';
import spinner from '../../images/spinner.gif';
// import spinner from '../../images/spinner.png';

export default () => {
  return (
    <div>
      <img
        // className="blink"
        src={spinner}
        alt="Loading..."
        style={{ width: '200px', margin: 'auto', display: 'block' }}
      />
    </div>
  );
};
