import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../common/utils/isEmpty';
import { Link } from 'react-router-dom';

const ProfileCard =  ( {profile} ) => {
  return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img src={((profile.user.userpicture !== undefined) && (profile.user.userpicture.length > 2 )) ? 
            profile.user.userpicture : profile.user.avatar} alt="" className="rounded-circle userImage d-none d-md-block"/>
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.user.name}</h3>
            <p>
              {profile.status}{' '}
              {isEmpty(profile.education) ? null : (
                <span>{profile.status === 'Graduated' ? 'from' : 'at'} {profile.education[0].school}</span>
              )}
            </p>
            <p>
              {isEmpty(profile.contactemail) ? null : (
                <span>{profile.contactemail}</span>
              )}
            </p>
            <Link to={`/profile/${profile.handle}`} className="btn btn-success purple">
              View Profile
            </Link>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <h4>{profile.user.name} Can Help You With</h4>
            <ul className="list-group">
              {profile.strongat.slice(0, 6).map((skill, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
  )
}

ProfileCard.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileCard;

