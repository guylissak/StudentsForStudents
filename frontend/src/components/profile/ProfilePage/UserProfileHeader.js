import React from 'react';
import isEmpty from '../../../common/utils/isEmpty';

 const UserProfileHeader = ( {profile}) => {
    return (
        <div className="row">
          <div className="col-md-12">
            <div className="card card-body dark-purple text-white mb-3">
              <div className="row">
                <div className="col-4 col-md-3 m-auto">
                  <img
                    className="rounded-circle"
                    src={(profile.user.userpicture !== undefined) && (profile.user.userpicture.length > 2) ? profile.user.userpicture  :
                       profile.user.avatar}
                    alt=""
                  />
                </div>
              </div>
              <div className="text-center">
                <h1 className="display-4 text-center">{profile.user.name}</h1>
                <p className="lead text-center">
                  {profile.status}{' '}
                  {isEmpty(profile.education) ? null : (
                    <span>{profile.status === 'Graduated' ? 'from' : 'at'} {profile.education[0].school}</span>
                  )}
                </p>
                {isEmpty(profile.location) ? null : <p>{profile.location}</p>}
                {isEmpty(profile.contactemail) ? null : <p>{profile.contactemail}</p>}
                <p>
                 
                  {isEmpty(profile.social && profile.social.twitter) ? null : (
                    <a
                      className="text-white p-2"
                      href={profile.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-twitter fa-2x" />
                    </a>
                  )}
  
                  {isEmpty(profile.social && profile.social.facebook) ? null : (
                    <a
                      className="text-white p-2"
                      href={profile.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-facebook fa-2x" />
                    </a>
                  )}
  
                  {isEmpty(profile.social && profile.social.linkedin) ? null : (
                    <a
                      className="text-white p-2"
                      href={profile.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-linkedin fa-2x" />
                    </a>
                  )}
  
                  {isEmpty(profile.social && profile.social.youtube) ? null : (
                    <a
                      className="text-white p-2"
                      href={profile.social.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-youtube fa-2x" />
                    </a>
                  )}
  
                  {isEmpty(profile.social && profile.social.instagram) ? null : (
                    <a
                      className="text-white p-2"
                      href={profile.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-instagram fa-2x" />
                    </a>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
  )
}

export default UserProfileHeader;