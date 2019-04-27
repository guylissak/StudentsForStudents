import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../../common/Spinner';
import ProfileCard from './ProfileCard';
import { getProfiles } from '../../redux/actions/handleProfile';
import { searchStudentsBySkills } from '../../redux/actions/searchStudents';
import TextFieldGroup from '../../common/TextFieldGroup';

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.handleProfile.profile !== null && this.props.handleProfile.profile === null) {
      this.props.history.push('/login');
    }
  }

  render() {
    const  { searchField } = this.props.searchStudent;
    const { profiles, loading } = this.props.handleProfile;
    let profileCardsContent;

    if (profiles === null || loading) {
      profileCardsContent = <Spinner />;
    } else {
      if (profiles.length > 0) {
          // filter the profiles by search of strong skills
        const filteredProfiles = profiles.filter(profileCard => {
            return (profileCard.strongat.join(',').toLowerCase().includes(searchField.toLowerCase())) 
        })
        profileCardsContent = filteredProfiles.map(profileCard => (
          <ProfileCard key={profileCard._id} profile={profileCard} />
        ))
      } else {
        profileCardsContent = <h4>No profiles found...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Students Profiles</h1>
              <p className="lead text-center">
                Connect with other Students, help and get help with studies materials
              </p>
              <TextFieldGroup
                  placeholder="Search Students by Skills, for example C++"
                  name="searchField"
                  type="search"
                  value={searchField}
                  onChange={(event) => this.props.searchStudentsBySkills(event.target.value)}
                />
              {profileCardsContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  handleProfile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  handleProfile: state.handleProfile,
  searchStudent: state.searchStudent
});

export default connect(mapStateToProps, { getProfiles, searchStudentsBySkills })(Profiles);
