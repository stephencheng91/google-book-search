import React, { Component } from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import search from "./pages/search";
import saved from "./pages/saved";

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <div>
          <Route exact path="/" component={search} />
          <Route exact path="/search" component={search} />
          <Route exact path="/saved" component={saved} />
        </div>
      </Router>
    );
  }
}

export default App;
