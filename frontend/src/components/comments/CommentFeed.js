import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

const CommentFeed = ({comments, postId, onDeleteClick, auth}) => {
    const commentItems =  comments.map(comment => (
        <CommentItem key={comment._id} comment={comment} postId={postId} onDeleteClick={onDeleteClick} auth={auth}/>
      ));
  return (
    <div>
      {commentItems}
    </div>
  )
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired
};

export default CommentFeed;
