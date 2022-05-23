import { Navigate } from "react-router-dom";
import { Route, Routes } from "react-router";
//pages
import SignIn from "./Auth/Login/Signin";
import Signup from "./Auth/Signup/Signup";

function Pages(props) {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashBoard handler={props.modeHandler} />} />
        <Route
          path="/auth/login"
          element={<SignIn handler={props.modeHandler} />}
        />
        <Route
          path="/auth/signup"
          element={<Signup handler={props.modeHandler} />}
        />
      </Routes>
    </>
  );
}

export default Pages;
