import React from "react";
import { Provider } from "react-redux";
import { HashRouter as Router, Route } from "react-router-dom";
import store from "store/store";
import UserManagement from "containers/UserManagement";

import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Provider store={store}>
        <Router basename="/">
          <Route path="/" exact component={UserManagement} />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
