import React from "react"
import { LoginForm} from "./LoginForm"
import { CurrentUser } from "../App"
import { Redirect } from "react-router-dom"

export function Login(props) {
  let currentUser = CurrentUser.useContainer()
  console.log(currentUser)
  if (currentUser.loggedIn) {
    return <Redirect to="/" />
  }
  return (
    <div>
      Login!
      <LoginForm loginUser={currentUser.loginUser}/>
    </div>
  )
}
