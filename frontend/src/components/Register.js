import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser, clearErrors } from '../redux/actions/auth';
import signupIcon from '../img/signupIcon.png'
import isEmpty from '../common/utils/isEmpty';
import InputGroup from '../common/InputGroup';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
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

  onChange = event => {
    const { name, value} = event.target;
    this.setState({ [name]: value });
  }

  onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    console.log("render")
    const { errors } = this.state;
    // could have removed errors from this.state and do instead
    // const { errors } = this.props;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your StudentsForStudents account and join us!
              </p>
              <div className="d-flex justify-content-center">
              <img alt="" style={{width:'64px', marginBottom: '10px', marginTop: '10px'}} src={signupIcon}/>
              </div>
              <form noValidate onSubmit={this.onSubmit}>
              <InputGroup
                placeholder="User Name"
                name="name"
                icon="fas fa-user-graduate"
                value={this.state.name}
                onChange={this.onChange}
                error={errors.name}
                />
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
                <InputGroup
                placeholder="Confirm Password"
                name="password2"
                type = "password"
                icon="fas fa-lock"
                value={this.state.password2}
                onChange={this.onChange}
                error={errors.password2}
                />
                <input type="submit" className="btn btn-success dark-purple btn-block mt-4" value="Join Us!"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

//by here the values from the reducer are being set to props and being connected to the component
const mapStateToProps = state => { 
  console.log("first")
return({
  auth: state.auth,
  errors: state.errors
});}

export default connect(mapStateToProps, { registerUser, clearErrors })(withRouter(Register));
