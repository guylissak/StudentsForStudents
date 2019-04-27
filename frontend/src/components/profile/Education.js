import React from 'react'
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const Education = ( {education, onDeleteEducation }) => {
    const educationArray = education.map(edu => (
        <tr  key={edu._id}>
            <td>{edu.school}</td>
            <td>{edu.levelofeducation}</td>
            <td>{edu.fieldofstudy}</td>
            <td className="d-none d-sm-block">
            <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
            {edu.to === null ? (
                ' Current'
            ) : (
                <Moment format="YYYY/MM/DD">{edu.to}</Moment>
            )}
            </td>
            <td>
            <div className="d-none d-sm-block">
            <button
                onClick={() => onDeleteEducation(edu._id)}
                className="btn btn-danger purple"
            >
                Delete Education
            </button>
            </div>
            </td>
        </tr>));

    return(
        <div>
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table ">
        <thead>
            <tr>
            <th>School</th>
            <th>Level Of Education</th>
            <th>Major</th>
            <th className="d-none d-sm-block">Years</th>
            <th />
            </tr>
            {educationArray}
        </thead>
        </table>
    </div>
    );
}
Education.propTypes = {
    onDeleteEducation: PropTypes.func.isRequired,
    education: PropTypes.array.isRequired
};

export default Education;
