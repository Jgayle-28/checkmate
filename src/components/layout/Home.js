import React from 'react';

export default () => {
  return (
    <div className="fade-in">
      <header className="main-header">
        <div className="primary-overlay">
          <div className="showcase container">
            <div className="row">
              <div className="col s12 main-text">
                <h5>Welcome to...</h5>
                <h1>Check Mate</h1>
                <p className="flow-text">
                  The place where you can keep track of your work week.
                </p>
                <br />
                <a href="#about" className="btn btn-large white black-text">
                  Learn More
                </a>
                {/* <a href="#contact" class="white-text">
                  <i class="material-icons medium scroll-icon">
                    arrow_drop_down_circle
                  </i>
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
