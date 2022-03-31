import { useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { login } from "../../actions/loginAction";

const Login = ({ login }) => {
  const [enteredData, setEnteredData] = useState({ email: "", password: "" });

  const { enteredEmail, enteredPassword } = enteredData;

  const onChangeHandler = (e) => {
    const updatedData = { ...enteredData, [e.target.id]: e.target.value };

    setEnteredData(updatedData);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    login(enteredData.email, enteredData.password);
  };

  return (
    <>
      <div className="form-wrapper">
        <h1>Log In</h1>
        <div className="form">
          <form className="form" onSubmit={onSubmitHandler}>
            <input
              id="email"
              name="email"
              placeholder="Email"
              type="email"
              value={enteredEmail}
              onChange={onChangeHandler}
              required
            />
            <input
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              value={enteredPassword}
              onChange={onChangeHandler}
              required
            />
            <button
              className="btn-submit"
              type="submit"
              onSubmit={onSubmitHandler}
            >
              Log In
            </button>
          </form>
          <span>or</span>
          <button className="btn-social" type="button">
            Log In with Facebook
          </button>
          <NavLink className="reset-password" to="/auth/reset-password">
            Forgot password?
          </NavLink>
        </div>
      </div>
      <div className="form-wrapper">
        <p>Don't have an account?</p>
        <NavLink to="/auth/sign-up">Sign up</NavLink>
      </div>
    </>
  );
};

export default connect(null, { login })(Login);