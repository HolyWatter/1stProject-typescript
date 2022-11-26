import React from 'react';
import Signupform from './SignUpForm';
import Signupcontent from './SignUpContent';
import './Signup.scss';

const Signup = () => {
  return (
    <div className="signUp">
      <Signupform />
      <Signupcontent />
    </div>
  );
};
export default Signup;
