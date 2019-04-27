import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Landing = (props) => {
    if (props.auth.isAuth) {
      props.history.push('/dashboard');
    }

  return (
    <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Students For Students</h1>
                <p className="lead">
                  {' '}
                  Help other students in courses/assignments you are good at,
                  And get assist from other students in courses you struggle with
                </p>
                <Link to="/register" className="btn btn-lg btn-success light-purple mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
