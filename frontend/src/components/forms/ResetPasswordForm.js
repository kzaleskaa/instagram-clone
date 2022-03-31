import { useState } from "react";
import { useNavigate } from "react-router";

import { changePassword } from "../../actions/passwordAction";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const ResetPasswordForm = ({ changePassword }) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const navigate = useNavigate();

  const onChangeEmailHandler = (e) => {
    e.preventDefault();

    setEnteredEmail(e.target.value);
  };

  const onSubmitEmailHandler = (e) => {
    e.preventDefault();

    changePassword(enteredEmail);
    navigate("/");
  };

  return (
    <div className="form-wrapper">
      <h1>Change Password</h1>
      <p>
        Enter your email address and we'll send you a link to reset your
        password.
      </p>
      <form className="form" onSubmit={onSubmitEmailHandler}>
        <input
          type="email"
          placeholder="Your Email Address"
          onChange={onChangeEmailHandler}
        />
        <button
          className="btn-submit"
          type="submit"
          onSubmit={onSubmitEmailHandler}
        >
          Submit
        </button>
      </form>
      <p>or</p>
      <NavLink to="/auth/sign-up">Create new account</NavLink>
      <NavLink to="/auth/login">Back to login</NavLink>
    </div>
  );
};

export default connect(null, { changePassword })(ResetPasswordForm);