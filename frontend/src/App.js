import { Route, Routes } from "react-router";
import React, { Suspense } from "react";
import { checkAuthentication } from "./actions/checkAuthenticationAction";
import { loadUser } from "./actions/loginAction";

import * as Loader from "react-loader-spinner";

import { connect } from "react-redux";
import Layout from "./components/layout/Layout";
import MainLayout from "./components/layout/MainLayout";
import LoginLayout from "./components/layout/LoginLayout";

const Home = React.lazy(() => import("./pages/Home"));
const SignUp = React.lazy(() => import("./pages/Signup"));
const Login = React.lazy(() => import("./pages/Login"));
const Profile = React.lazy(() => import("./pages/Profile"));
const ChangePassword = React.lazy(() => import("./pages/ChangePassword"));
const ChangePasswordConfirm = React.lazy(() =>
  import("./pages/ChangePasswordConfirm")
);
const ActivateAccount = React.lazy(() => import("./pages/ActivateAccount"));

const App = () => {
  const style = { display: "flex", justifyContent: "center" };
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div style={style}>
            <Loader.TailSpin color="#4c4c4c" height={70} width={70} />
          </div>
        }
      >
        <Routes>
          <Route path="/auth" element={<LoginLayout />}>
            <Route path="/auth/sign-up" element={<SignUp />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/reset-password" element={<ChangePassword />} />
            <Route
              path="/auth/password/reset/confirm/:uid/:token"
              element={<ChangePasswordConfirm />}
            />
            <Route
              path="/auth/activate/:uid/:token"
              element={<ActivateAccount />}
            />
          </Route>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Suspense>
    </MainLayout>
  );
};

export default connect(null, { checkAuthentication, loadUser })(App);
