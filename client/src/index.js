import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";

String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

ReactDOM.render(
  <div className="core">
    <Router>
      <App>
        <Redirect from="/" to="/looking-glass"/>
        <Route key="index" exact path="/looking-glass" component={DashboardPage} />
      </App>
    </Router>
  </div>,
  document.getElementById("root")
); // If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();
