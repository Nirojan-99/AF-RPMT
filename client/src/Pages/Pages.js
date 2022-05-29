import { Navigate } from "react-router-dom";
import { Route, Routes } from "react-router";
//pages
import SignIn from "./Auth/Login/Signin";
import Signup from "./Auth/Signup/Signup";
import DashBoard from "./DashBoard/DashBoard";
import Submit from "./Submission/Submit";

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
        <Route
          path="/submit/add/:id"
          element={<Submit handler={props.modeHandler} />}
        />
      </Routes>
    </>
  );
}

export default Pages;
