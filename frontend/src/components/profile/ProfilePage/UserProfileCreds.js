import React from 'react';
import Moment from 'react-moment';

const UserProfileCreds = ( {education} ) => {

    const eduArray = education.map(edu => (
      <li key={edu._id} className="list-group-item">
        <h4>{edu.school}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
          {edu.to === null ? (
            ' Now'
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </p>
        <p>
          <strong>Level Of Education:</strong> {edu.levelofeducation}
        </p>
        <p>
          <strong>Field Of Study:</strong> {edu.fieldofstudy}
        </p>
        <p>
          {edu.description === '' ? null : (
            <span>
              <strong>Description: </strong> {edu.description}
            </span>
          )}
        </p>
      </li>
    ));
    return (
        <div className="row">
          <div className="col-md-12">
            <h3 className="text-center purpleRain">Education</h3>
            {eduArray.length > 0 ? (
              <ul className="list-group">{eduArray}</ul>
            ) : (
              <p className="text-center">No Education Listed</p>
            )}
          </div>
        </div>
      );
}

export default UserProfileCreds;

