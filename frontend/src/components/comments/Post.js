import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PostItem from '../posts/PostItem';
import CommentForm from './commentForm';
import CommentFeed from './CommentFeed';
import { getPost, addComment, deleteComment } from '../../redux/actions/posts';
import { clearErrors } from '../../redux/actions/auth';
import Spinner from '../../common/Spinner';
// import axios from 'axios';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errors: {}
    };
  }
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  componentWillUnmount() {
    if (this.props.errors) {
      clearErrors();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors) {
    return { errors: nextProps.errors };
    }
  
  return null
}

  onSubmit = (event) => {
    event.preventDefault();

    const { user } = this.props.auth;
    const postId = this.props.post.post._id;
    let userPicture = '';
    if ((user.userpicture !== undefined) && (user.userpicture.length > 2)) {
      userPicture = user.userpicture;
    }
    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar,
      userpicture: userPicture
    };

    this.props.addComment(postId, newComment);
    this.setState({ text: '' });
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  onDeleteClick = (postId, commentId) => {
    this.props.deleteComment(postId, commentId);
  }

  render() {
    const { post, loading } = this.props.post;
    const { text,errors} = this.state;

    let postContent;

    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <PostItem post={post} showActions={false} />
          <CommentForm onChange={this.onChange} onSubmit={this.onSubmit} text={text} errors={errors}/>
          <CommentFeed postId={post._id} comments={post.comments} onDeleteClick={this.onDeleteClick} auth={this.props.auth}/>
        </div>
      );
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/news-feed" className="btn btn-light mb-3">
                Back To Feed
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { getPost, addComment, deleteComment, clearErrors })(Post);
