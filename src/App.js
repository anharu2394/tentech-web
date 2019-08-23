import React from 'react'
import { Home } from './components/Home'
import { Header } from './components/Header'
import { Signin } from './components/Signin'
import { Login } from './components/Login'
import { Product as ProductComponent } from './components/Product'
import logo from './logo.svg'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom"
import { useCurrentUser } from "./containers/CurrentUser"
import { useProduct } from "./containers/Product"
import { createContainer } from "unstated-next"
import history from './history'

export let CurrentUser = createContainer(useCurrentUser)
export let Product = createContainer(useProduct)

function App() {
  return (
    <Router>
      <div>
        <CurrentUser.Provider>
          <Product.Provider>
            <Header />
            <Route path="/" exact component={Home} />
            <Route path="/signin" exact component={Signin} />
            <Route path="/login" exact component={Login} />
            <Route path="/:user/products/:uuid" exact component={ProductComponent} />
          </Product.Provider>
        </CurrentUser.Provider>
      </div>
    </Router>
  )
}

export default App
