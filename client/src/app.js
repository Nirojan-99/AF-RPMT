import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

//pages
import Footer from "./Components/Footer";
import Pages from "./Pages/Pages";

function app() {
  const Tmode = useSelector((state) => state.mode.mode);
  const [mode, setMode] = useState(Tmode);

  const modeHandler = (value) => {
    setMode(value);
  };
  return (
    <>
      <Router>
        <Pages mode={mode} modeHandler={modeHandler} />
      </Router>
      <Footer />
    </>
  );
}

export default app;
