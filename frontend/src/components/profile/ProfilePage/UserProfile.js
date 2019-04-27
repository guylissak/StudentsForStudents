import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserProfileHeader from './UserProfileHeader';
import UserProfileAbout from './UserProfileAbout';
import UserProfileCreds from './UserProfileCreds';
import Spinner from '../../../common/Spinner';
import { getProfileByHandle } from '../../../redux/actions/handleProfile';

class UserProfile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.handleProfile.profile !== null && this.props.handleProfile.profile === null) {
      this.props.history.push('/login');
    }
  }

  render() {
    const { profile, loading } = this.props.handleProfile;
    let profileContent;

    if (profile === null || loading) {

      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <UserProfileHeader profile={profile} />
          <UserProfileAbout profile={profile} />
          <UserProfileCreds education={profile.education} />
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  handleProfile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  handleProfile: state.handleProfile
});

export default connect(mapStateToProps, { getProfileByHandle })(UserProfile);
