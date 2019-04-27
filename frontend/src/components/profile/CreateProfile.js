import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../common/TextFieldGroup';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import InputGroup from '../../common/InputGroup';
import SelectListGroup from '../../common/SelectListGroup';
import { createProfile } from '../../redux/actions/handleProfile';
import { clearErrors } from '../../redux/actions/auth';
import UploadImage from '../profile/UploadImage';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: '',
      picture: '',
      location: '',
      status: '',
      strongat: '',
      weakat: '',
      phonenumber: '',
      contactemail: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {}
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    }
    return null
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors })
    }
  }

  componentWillUnmount() {
    if (this.props.errors) {
      clearErrors();
    }
  }

  onSubmit = (event) => {
    event.preventDefault();

    const profileData = {
      handle: this.state.handle,
      picture: this.state.picture,
      location: this.state.location,
      status: this.state.status,
      strongat: this.state.strongat,
      weakat: this.state.weakat,
      phonenumber: this.state.phonenumber,
      contactemail: this.state.contactemail,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { errors } = this.state;

        const socialInputs = (
        <div>
          <InputGroup
            placeholder="Place A Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Place A Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Place A Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />

          <InputGroup
            placeholder="Place A YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="Place An Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );

    // Select options for status
    const selectListStatusOpts = [
      { label: '* Select your current Status', value: 0 },
      { label: 'High School Student', value: 'High School Student' },
      { label: 'College/University Student', value: 'College/University Student' },
      { label: 'Graduated', value: 'Graduated' },
      { label: 'Other', value: 'Other' }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <h2 className="lead text-center">Upload your profile picture</h2>
              <div className="row">
              <div className="col-sm-4 m-auto"></div>
              <UploadImage/>
              <div className="col-sm-4 m-auto"></div>
              </div>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname"
                />
                <SelectListGroup
                  placeholder="* Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={selectListStatusOpts}
                  error={errors.status}
                  info="Your current academic status"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city & state suggested (eg. Tel-Aviv, Israel)"
                />
                <TextFieldGroup
                  placeholder="* Willing to help with"
                  name="strongat"
                  value={this.state.strongat}
                  onChange={this.onChange}
                  error={errors.strongat}
                  info="Mention the subjects/skills you are strong at, so members will ask you for help, use comma seprated values
                  (eg. Math,Programming,History)"
                />
                <TextFieldGroup
                  placeholder="Looking for help with"
                  name="weakat"
                  value={this.state.weakat}
                  onChange={this.onChange}
                  error={errors.weakat}
                  info="Mention the subjects/skills you want to get help with, so members will reach you, use comma seprated values
                  (eg. Math,Programming,History)"
                />
                <TextFieldGroup
                  placeholder="Mobile Phone Number"
                  name="phonenumber"
                  value={this.state.phonenumber}
                  onChange={this.onChange}
                  error={errors.phonenumber}
                  info="Your mobile number"
                />
                 <TextFieldGroup
                  placeholder="Email Address"
                  name="contactemail"
                  value={this.state.contactemail}
                  onChange={this.onChange}
                  error={errors.contactemail}
                  info="An active email address"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />

                <div className="mb-3"></div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info dark-purple btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  handleProfile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  handleProfile: state.handleProfile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, clearErrors })(
  withRouter(CreateProfile)
);
