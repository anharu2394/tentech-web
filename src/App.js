import React from 'react'
import { Home } from './components/Home'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Signin } from './components/Signin'
import { Login } from './components/Login'
import { User } from './components/User'
import { EditProduct } from './components/EditProduct'
import { Product as ProductComponent } from './components/Product'
import logo from './logo.svg'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom"
import { useCurrentUser } from "./containers/CurrentUser"
import { useProduct } from "./containers/Product"
import { useUser } from "./containers/User"
import { createContainer } from "unstated-next"
import history from './history'
import styled from 'styled-components'

export let CurrentUser = createContainer(useCurrentUser)
export let Product = createContainer(useProduct)
export let UserPage = createContainer(useUser)

function App() {
  return (
    <Router>
      <Wrapper>
        <CurrentUser.Provider>
          <Product.Provider>
            <Header />
            <Route path="/" exact component={Home} />
            <Route path="/signin" exact component={Signin} />
            <Route path="/login" exact component={Login} />
            <UserPage.Provider>
              <Route path="/:user" exact component={User } />
            </UserPage.Provider>
            <Route path="/:user/products/:uuid/edit" exact component={EditProduct } />
            <Route path="/:user/products/:uuid" exact component={ProductComponent } />
						<Footer />
          </Product.Provider>
        </CurrentUser.Provider>
      </Wrapper>
    </Router>
  )
}

const Wrapper = styled.div`
	background: #ECF0F3;
`
export default App
