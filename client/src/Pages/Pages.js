import { Navigate } from "react-router-dom";
import { Route, Routes } from "react-router";
import SignIn from "./Auth/Login/Signin";

function Pages(props) {
  return (
    <>
      <Routes>
        <Route path="/auth/login" element={<SignIn handler={props.modeHandler} />} />
      </Routes>
    </>
  );
}

export default Pages;
