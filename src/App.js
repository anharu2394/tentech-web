import React from 'react'
import { Home } from './components/Home'
import { Header } from './components/Header'
import { Signin } from './components/Signin'
import { Login } from './components/Login'
import logo from './logo.svg'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom"
import { useCurrentUser } from "./containers/CurrentUser"
import { createContainer } from "unstated-next"

export let CurrentUser = createContainer(useCurrentUser)
function App() {
  return (
    <Router>
      <div>
        <CurrentUser.Provider>
          <Header />
          <Route path="/" exact component={Home} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/login" exact component={Login} />
        </CurrentUser.Provider>
      </div>
    </Router>
  )
}

export default App
