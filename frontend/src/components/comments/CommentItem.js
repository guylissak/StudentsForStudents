import React from 'react';
import PropTypes from 'prop-types';

const CommentItem = (props) => {
  const { comment, postId, auth } = props;
  console.log(auth.user)
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          {/* <a href="profile.html"> */}
            <img
              className="rounded-circle userImage d-none d-md-block"
              src={((comment.userpicture !== undefined) && (comment.userpicture.length > 2)) ? comment.userpicture : comment.avatar}
              alt=""
            />
          {/* </a> */}
          <br />
          <p className="text-center">{comment.name}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{comment.text}</p>
          {comment.user === auth.user.id ? (
            <button
              onClick={() => props.onDeleteClick(postId, comment._id)}
              type="button"
              className="btn btn-danger mr-1"
            >
              <i className="fas fa-times" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

export default CommentItem;


