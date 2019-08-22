import React from "react"
import { RegisterForm} from "./RegisterForm"
import { CurrentUser } from "../App"

export function Signin(props) {
  let currentUser = CurrentUser.useContainer()
  console.log(currentUser)
  return (
    <div>
      This is Home!
      {currentUser.loggedIn}
      <RegisterForm createUser={currentUser.createUser}/>
    </div>
  );
}
