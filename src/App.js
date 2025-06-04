import React from "react";
import Nav from "./comp/nav";
import Footer from "./comp/footer";
import { BrowserRouter } from "react-router-dom";
import Rout from "./comp/rout";
import './comp/global.css'

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Rout />
      <Footer />
    </BrowserRouter>
  );
}
export default App;