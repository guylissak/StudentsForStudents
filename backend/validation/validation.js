const isEmpty = require('./isEmpty');
const Validator = require('validator');

// @description   validate register inputs
const validateRegister = data => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'You must confirm password';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must be the same';
  }

  // if there are any errors isValid will be set to false
  return {
    errors,
    isValid: isEmpty(errors)
  };
};


// @description   validate login inputs
const validateLogin = data => {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const validateProfile = data => {
  let errors = {};
  // verify all the required fileds are not empty
  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.strongat = !isEmpty(data.strongat) ? data.strongat : '';

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle needs to between 2 and 40 characters';
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required';
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = 'Status is required';
  }

  if (Validator.isEmpty(data.strongat)) {
    errors.strongat = 'Specify the fields of studies you are willing to help with';
  }

  if (!isEmpty(data.contactemail)) {
    if (!Validator.isEmail(data.contactemail)) {
      errors.contactemail = 'Not a valid Email';
    }
  }

  if (!isEmpty(data.phonenumber)) {
    if (!Validator.isMobilePhone(data.phonenumber)) {
      errors.phonenumber = 'Not a valid phone number';
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid URL';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const validateEducation = data => {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : '';
  data.levelofeducation = !isEmpty(data.levelofeducation) ? data.levelofeducation : '';
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if (Validator.isEmpty(data.school)) {
    errors.school = 'School is required';
  }

  if (Validator.isEmpty(data.levelofeducation)) {
    errors.levelofeducation = 'Level of education is required';
  }

  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = 'Field of study is required';
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = 'From date is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const validatePost = data => {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = 'Post must be between 10 and 300 characters';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const validateComment = data => {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = 'Comment must be between 10 and 300 characters';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = {
    validateRegister,
    validateLogin,
    validateProfile,
    validateEducation,
    validatePost,
    validateComment
};