import React from "react"
import { RegisterForm} from "./RegisterForm"
import { CurrentUser } from "../App"

export function Signin(props) {
  let currentUser = CurrentUser.useContainer()
  console.log(currentUser)
  return (
    <div>
      Login!
      <RegisterForm createUser={currentUser.createUser}/>
    </div>
  );
}
