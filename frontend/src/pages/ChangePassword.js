import { useState } from "react";
import { useNavigate } from "react-router";
import { changePassword } from "../actions/passwordAction";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [enteredEmail, setEnteredEmail] = useState("");

  const onChangeEmailHandler = (e) => {
    e.preventDefault();
    setEnteredEmail(e.target.value);
  };

  const onSubmitEmailHandler = (e) => {
    e.preventDefault();
    dispatch(changePassword(enteredEmail));
    navigate("/");
  };

  return (
    <>
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
          <button className="btn-submit" type="submit">
            Submit
          </button>
        </form>
        <span className="separator">
          <span className="line" />
          <p>or</p>
          <span className="line" />
        </span>
        <NavLink to="/auth/sign-up">Create new account</NavLink>
      </div>
      <div className="form-wrapper">
        <NavLink to="/auth/login">Back to login</NavLink>
      </div>
    </>
  );
};

export default ChangePassword;
