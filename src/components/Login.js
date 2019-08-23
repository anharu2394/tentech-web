import React from "react"
import { LoginForm} from "./LoginForm"
import { CurrentUser } from "../App"

export function Login(props) {
  let currentUser = CurrentUser.useContainer()
  console.log(currentUser)
  return (
    <div>
      Login!
      <LoginForm loginUser={currentUser.loginUser}/>
    </div>
  );
}
