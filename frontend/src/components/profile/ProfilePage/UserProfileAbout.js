import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../../common/utils/isEmpty';

const UserProfileAbout = ( {profile} ) => {
    // Get first name
    const firstName = profile.user.name.trim().split(' ')[0];

    // Strong fields and weak fields
    const strongFieldsArray = profile.strongat.map((strong, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" /> {strong}
      </div>
    ));
    let weakFieldsArray = [];
    if (profile.weakat[0].length) {
     weakFieldsArray = profile.weakat.map((weak, index) => (
        <div key={index} className="p-3">
          <i className="fas fa-question" /> {weak}
        </div>
      ));
     }

  return (
    <div className="row">
    <div className="col-md-12">
      <div className="card card-body bg-light mb-3">
        <h3 className="text-center purpleRain">{firstName}'s Bio</h3>
        <p className="lead text-center">
          {isEmpty(profile.bio) ? (
            <span>{firstName} does not have a bio</span>
          ) : (
            <span>{profile.bio}</span>
          )}
        </p>
        <hr />
        <h3 className="text-center purpleRain">Willing To Help With</h3>
        <div className="row">
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {strongFieldsArray}
          </div>
        </div>
        <h3 className="text-center purpleRain mb-3">{weakFieldsArray.length ? 'Looking For Help With' : null}</h3>
        <div className="row">
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {weakFieldsArray.length ? weakFieldsArray : null}
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

UserProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
  };
  
export default UserProfileAbout;

