import React from 'react';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';

const commentForm = (props) => {
  return (
    <div className="post-form mb-3">
    <div className="card card-info">
      <div className="card-header purple text-white">
        Make a comment...
      </div>
      <div className="card-body">
        <form onSubmit={props.onSubmit}>
          <div className="form-group">
            <TextAreaFieldGroup
              placeholder="Reply to post"
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

export default commentForm;


