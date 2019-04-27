import React from 'react';
import { Link } from 'react-router-dom';

const PostItem = (props) => {
    const { post, auth, showActions } = props;
    console.log(auth)
  return (
    <div className="card card-body mb-3">
    <div className="row">
      <div className="col-md-2">
        {/* <a href="profile.html"> */}
          <img
            className="rounded-circle userImage d-none d-md-block"
            src={((post.userpicture !== undefined) && (post.userpicture.length > 2)) ? post.userpicture : post.avatar}
            alt=""
          />
        {/* </a> */}
        <br />
        <p className="text-center"><strong>{post.name}</strong></p>
      </div>
      <div className="col-md-10">
        <p className="lead">{post.text}</p>
        {showActions ? (
          <span>
            <button
              onClick={() => props.onLikeClick(post._id)}
              type="button"
              className="btn btn-light mr-1"
            >
              <i
                className={`fas fa-thumbs-up 
                  ${() => props.findUserLike(post.likes) ? "text-info": ""}`}
              />
              <span className="badge badge-light">{post.likes.length}</span>
            </button>
            <button
              onClick={() => props.onUnlikeClick(post._id)}
              type="button"
              className="btn btn-light mr-1"
            >
              <i className="text-secondary fas fa-thumbs-down" />
            </button>
            <Link to={`/post/${post._id}`} className="btn btn-info purple mr-1">
              Comments
            </Link>
            {post.user === auth.user.id ? (
              <button
                onClick={() => props.onDeleteClick(post._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </span>
        ) : null}
      </div>
    </div>
  </div>
  )
}

export default PostItem;
