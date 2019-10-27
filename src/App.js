import React from 'react'
import ScrollToTop from './components/ScrollToTop'
import { Home } from './components/Home'
import { HomeAbout } from './components/HomeAbout'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Signin } from './components/Signin'
import { Login } from './components/Login'
import { User } from './components/User'
import { EditUser } from './components/EditUser'
import { EditProduct } from './components/EditProduct'
import { Product as ProductComponent } from './components/Product'
import { ProductsPage } from './components/ProductsPage'
import { Suggestion } from './components/Suggestion'
import { Validate } from './components/Validate'
import logo from './logo.svg'
import './App.scss'
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom"
import { useCurrentUser } from "./containers/CurrentUser"
import { useProduct } from "./containers/Product"
import { useUser } from "./containers/User"
import { usePostAttach } from "./containers/PostAttach"
import { useTagList } from "./containers/TagList"
import { useProductList } from "./containers/ProductList"
import { createContainer } from "unstated-next"
import history from './history'
import styled from 'styled-components'

export let CurrentUser = createContainer(useCurrentUser)
export let Product = createContainer(useProduct)
export let UserPage = createContainer(useUser)
export let PostAttach = createContainer(usePostAttach)
export let TagList = createContainer(useTagList)
export let ProductList = createContainer(useProductList)

function App() {
  return (
    <Router>
			<ScrollToTop>
				<Wrapper>
					<CurrentUser.Provider>
						<Product.Provider>
							<TagList.Provider>
								<ProductList.Provider>
									<Header />
									<Switch>
										<Route path="/:user/products/:uuid" exact component={ProductComponent } />
										<Route path="/" exact component={HomeAbout} />
										<Route path="/home" exact component={Home} />
										<Route path="/signup" exact component={Signin} />
										<Route path="/login" exact component={Login} />
										<Route path="/products" exact component={ProductsPage} />
										<Route path="/suggestion" exact component={Suggestion} />
										<Route path="/validate/:token" exact component={Validate} />
										<Route path="/:user/products/:uuid/edit" exact component={EditProduct } />
										<UserPage.Provider>
											<Route path="/:user/edit" exact component={EditUser } />
											<Route path="/:user" exact component={User } />
										</UserPage.Provider>
									</Switch>
									<Footer />
								</ProductList.Provider>
							</TagList.Provider>
						</Product.Provider>
					</CurrentUser.Provider>
				</Wrapper>
			</ScrollToTop>
    </Router>
  )
}

const Wrapper = styled.div`
	background: #ECF0F3;
`
export default App
