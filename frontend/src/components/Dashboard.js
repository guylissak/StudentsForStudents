import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount, deleteEducation } from '../redux/actions/handleProfile';
import Spinner from '../common/Spinner';
import ProfileToolBar from './profile/ProfileToolBar';
import Education from './profile/Education';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  // Delete Account
  onDelete = () => {
    this.props.deleteAccount();
  }

  // Delete Education
  onDeleteEducation = (id) => {
    this.props.deleteEducation(id);
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.handleProfile;

    let content;

    if (profile === null || loading) {
      content = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        content = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileToolBar />
            <Education education={profile.education} onDeleteEducation={this.onDeleteEducation}/>
            <div style={{ marginBottom: '60px' }} />
            <button
              onClick={this.onDelete}
              className="btn btn-danger dark-purple"
            >
              Delete My Account
            </button>
          </div>
        );
      } else {
        // User is logged in but has not created a profile
        content = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>Click to create a profile, and connect with other members</p>
            <Link to="/create-profile" className="btn btn-lg btn-success dark-purple">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">My Student Account</h1>
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  handleProfile: PropTypes.object.isRequired,
  deleteEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  handleProfile: state.handleProfile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount, deleteEducation })(
  Dashboard
);
