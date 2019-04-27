import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/auth';
import { clearCurrentProfile } from '../../redux/actions/handleProfile';

class Navbar extends Component {

  onLogout = (event) => {
    event.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() 
  {
    const { isAuth, user } = this.props.auth;
    const memberMode = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/news-feed">
          <i className="far fa-comment-alt"></i>
            {' '}News Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
          <i className="far fa-address-card"></i>
           {' '}My Account
          </Link>
        </li>
        <li className="nav-item pointer">
          <div
            onClick={this.onLogout}
            className="nav-link"
          >
            <img
              className="rounded-circle"
              src={((user.userpicture !== undefined) && (user.userpicture.length > 2)) ? user.userpicture : user.avatar}
              alt={user.name}
              style={{ width: '25px', marginRight: '5px' }}
            />{' '}
            Logout
          </div>
        </li>
      </ul>
    );

    const visitorMode = 
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
          <Link className="nav-link" to="/register">
          <i className="fas fa-user-plus"></i> 
            {' '}Sign Up
            </Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/login">
            <i className="fas fa-user"></i> 
            {' '}Login
          </Link>
          </li>
        </ul>

    return (
       <nav className="navbar navbar-expand-md navbar-dark nav-purple mb-4 fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Students4Students
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                <i className="fas fa-user-graduate"></i>
                  {' '}
                  Students
                </Link>
              </li>
            </ul>
            {isAuth ? memberMode : visitorMode}
          </div>
        </div>
      </nav>        
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logoutUser, clearCurrentProfile})(Navbar);
