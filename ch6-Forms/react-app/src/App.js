import React from "react";
import { Switch, Route } from "react-router-dom";
import LoginForm from "./components/loginForm";
import Register from "./components/registerForm";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={LoginForm}></Route>
        <Route path="/register" component={Register}></Route>
      </Switch>
    </div>
  );
}

export default App;
