import { Route, Routes } from "react-router";
import { Navigate } from "react-router-dom";
import React, { Suspense } from "react";
import classes from "./App.module.css";
import * as Loader from "react-loader-spinner";

import Layout from "./components/layout/Layout";
import MainLayout from "./components/layout/MainLayout";
import LoginLayout from "./components/layout/LoginLayout";

const Home = React.lazy(() => import("./pages/Home"));
const Profile = React.lazy(() => import("./pages/Profile"));
const SignUp = React.lazy(() => import("./pages/Signup"));
const Login = React.lazy(() => import("./pages/Login"));
const ChangePassword = React.lazy(() => import("./pages/ChangePassword"));
const ChangePasswordConfirm = React.lazy(() =>
  import("./pages/ChangePasswordConfirm")
);
const ActivateAccount = React.lazy(() => import("./pages/ActivateAccount"));

const App = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className={classes.loader}>
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
            <Route path="/profile/:user" element={<Profile />} />
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Suspense>
    </MainLayout>
  );
};

export default App;
