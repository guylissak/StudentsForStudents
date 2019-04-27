import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../../common/TextFieldGroup';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import SelectListGroup from '../../common/SelectListGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEducation } from '../../redux/actions/handleProfile';
import { clearErrors } from '../../redux/actions/auth';
import isEmpty from '../../common/utils/isEmpty';

class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: '',
      levelofeducation: '',
      fieldofstudy: '',
      from: '',
      to: '',
      current: false,
      description: '',
      errors: {},
      disabled: false
    };
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
  }

  componentWillUnmount() {
    if (this.props.errors) {
      clearErrors();
    }
  }

  onSubmit = (event) => {
    event.preventDefault();

    const eduData = {
      school: this.state.school,
      levelofeducation: this.state.levelofeducation,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    this.props.addEducation(eduData, this.props.history);
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  onCheck = () => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render() {
    const selectListEduOpts = [
        { label: '* Select Level Of Education', value: 0 },
        { label: 'High School', value: 'High School' },
        { label: 'High School Graduated', value: 'High School Graduated' },
        { label: 'Associate Degree', value: 'Associate Degree' },
        { label: 'Bachelor Degree', value: 'Bachelor Degree' },
        { label: 'Master Degree', value: 'Master Degree' },
        { label: 'Doctoral Degree', value: 'Doctoral Degree' },
        { label: 'Other', value: 'Other' }
      ];

    const { errors } = this.state;

    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add your education status
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* School"
                  name="school"
                  value={this.state.school}
                  onChange={this.onChange}
                  error={errors.school}
                  info="Add your school/college/bootcamp name"
                />
                 <SelectListGroup
                  placeholder="* Level Of Education"
                  name="levelofeducation"
                  value={this.state.levelofeducation}
                  onChange={this.onChange}
                  options={selectListEduOpts}
                  error={errors.levelofeducation}
                  info="Your level of education type"
                />
                <TextFieldGroup
                  placeholder="* Field of Study"
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
                  onChange={this.onChange}
                  error={errors.fieldofstudy}
                  info="Your major/program"
                />
                <h6>* From Date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                  info="The date you started at this school"
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={this.state.disabled ? 'disabled' : ''}
                  info="Your graduation date (if you have not graduated select current)"
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current School
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Program/Major Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell us about the program that you attend/attended"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-success dark-purple btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  handleProfile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  handleProfile: state.handleProfile,
  errors: state.errors
});

export default connect(mapStateToProps, { addEducation, clearErrors })(
  withRouter(AddEducation)
);
