import React from 'react';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';

 const PostForm = (props) => {
  return (
    <div className="post-form mb-3">
    <div className="card card-info">
      <div className="card-header purple text-white">Need to consult with other students? post it here</div>
      <div className="card-body">
        <form onSubmit={props.onSubmit}>
          <div className="form-group">
            <TextAreaFieldGroup
              placeholder="Create a post"
              name="text"
              value={props.text}
              onChange={props.onChange}
              error={props.errors.text}
            />
          </div>
          <button type="submit" className="btn btn-dark">
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
  )
}

PostForm.propTypes = {
    errors: PropTypes.object.isRequired
  };

export default PostForm;


