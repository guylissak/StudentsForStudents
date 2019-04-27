import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser, clearErrors } from '../redux/actions/auth';
import loginIcon from '../img/loginIcon.png';
import isEmpty from '../common/utils/isEmpty';
import InputGroup from '../common/InputGroup';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuth) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillUnmount() {
    if (this.props.errors) {
      clearErrors();
    }
  }

static getDerivedStateFromProps(nextProps, prevState) {
    if (!isEmpty(nextProps.errors)) {
      return { errors: nextProps.errors };
    }
    return null
  }
 
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors })
    }
    if (this.props.auth.isAuth) {
      this.props.history.push('/dashboard');
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { email, password} = this.state;
    const userData = {
        // ES6 syntax
      email,
      password
    };

    this.props.loginUser(userData);
  }

  onChange = (event) => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your StudentsForStudents account
              </p>
              <div className="d-flex justify-content-center">
              <img alt="" className="icons" src={loginIcon}/>
              </div>
              <form noValidate onSubmit={this.onSubmit}>
                <InputGroup
                placeholder="Email Address"
                name="email"
                type = "email"
                icon="fas fa-envelope"
                value={this.state.email}
                onChange={this.onChange}
                error={errors.email}
                />
                <InputGroup
                placeholder="Password"
                name="password"
                type = "password"
                icon="fas fa-lock"
                value={this.state.password}
                onChange={this.onChange}
                error={errors.password}
                />
                <input type="submit" className="btn btn-success dark-purple btn-block mt-4" value="Get Started!"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser, clearErrors })(Login);
