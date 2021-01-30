import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { PrivateRouting } from "./components";
import "./assets/main.css";

// Components import
import { Home, Login, Signup } from "./pages";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Signup} />
        <PrivateRouting path="/" exact component={Home} />
      </Router>
    </Provider>
  );
};

export default App;
