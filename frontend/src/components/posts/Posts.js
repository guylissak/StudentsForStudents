import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import PostItem from './PostItem';
import Spinner from '../../common/Spinner';
import { getPosts, addPost, deletePost, addLike, removeLike } from '../../redux/actions/posts';
import { clearErrors } from '../../redux/actions/auth';


class Posts extends Component {
    constructor() {
    super();
    this.state = {
        text: '',
        errors: {}
    };
  }

  componentDidMount() {
    this.props.getPosts();
  }

  componentWillUnmount() {
    if (this.props.errors) {
      clearErrors();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.errors) {
          // will always return the errors status (also clean) as long as the object is not null
      return { errors: nextProps.errors };
      }
    
    return null
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { user } = this.props.auth;
    let userPicture = '';
    if ((user.userpicture !== undefined) && (user.userpicture.length > 2)) {
        userPicture = user.userpicture;
    }

    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar,
      userpicture: userPicture
    };

    this.props.addPost(newPost);
    this.setState({ text: '' });
  }

  onChange = (event) => { 
  const { name, value } = event.target; 
    this.setState({ [name]: value });
  }

  onDeleteClick = (id) => {
    this.props.deletePost(id);
  }

  onLikeClick = (id) => {
    this.props.addLike(id);
  }

  onUnlikeClick = (id) => {
    this.props.removeLike(id);
  }

  findUserLike = (likes)  => {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }


  render() {
    const { posts, loading } = this.props.post;
    const {errors, text} = this.state;
    let postsContent;

    if (posts === null || loading) {
      postsContent = <Spinner />;
    } else {
        postsContent = posts.map(post => <PostItem key={post._id} post={post} auth={this.props.auth}
            onDeleteClick={this.onDeleteClick} onLikeClick={this.onLikeClick} onUnlikeClick={this.onUnlikeClick} 
            findUserLike={this.findUserLike} text={text} showActions={true}
        />);
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm errors={errors} onChange={this.onChange} onSubmit={this.onSubmit} text={text}/>
              {postsContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { getPosts, addPost, deletePost, addLike, removeLike, clearErrors })(Posts);
