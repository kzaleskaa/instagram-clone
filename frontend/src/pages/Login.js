import LoginForm from "../components/forms/LoginForm";

import { useNavigate } from "react-router";

import { useEffect } from "react";

import { connect } from "react-redux";

import { checkAuthentication } from "../actions/checkAuthenticationAction";
import { loadUser } from "../actions/loginAction";

const Login = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return <LoginForm />;
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { checkAuthentication, loadUser })(
  Login
);