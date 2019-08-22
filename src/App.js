import React from 'react'
import { Home } from './components/Home'
import { Signin } from './components/Signin'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { useCurrentUser } from "./containers/CurrentUser"
import { createContainer } from "unstated-next"

export let CurrentUser = createContainer(useCurrentUser)
function App() {
  return (
    <Router>
      <div>
        <CurrentUser.Provider>
          <Route path="/" exact component={Home} />
          <Route path="/signin" exact component={Signin} />
        </CurrentUser.Provider>
      </div>
    </Router>
  )
}

export default App
