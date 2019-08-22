import React from 'react';
import { Home } from './components/Home';
import { Signin } from './components/Signin';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useCurrentUser } from "./containers/CurrentUser";

function App() {
  let currentUser = useCurrentUser
  return (
    <Router>
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
      </div>
    </Router>
  );
}

export default App;
