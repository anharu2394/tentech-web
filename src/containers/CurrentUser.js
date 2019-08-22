import React, { useState } from "react"
import { createContainer } from "unstated-next"
import { render } from "react-dom"
import { endpoint} from "../utils"

export function useCurrentUser() {
  let [user, setUser] = useState({})
  let [loggedIn, setLoggedIn] = useState(false)
  let [token, setToken] = useState("")
  let createUser = async (user) => {
    let data = { "user": user }
    fetch(endpoint("/users"), {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data)
    }
    )
    .then(res => {
      if (res.ok) {
        loginUser(user.email, user.password) 
      }
    })
  } 
  let loginUser = async (email, password) => {
    let data = { email, password }
    fetch(endpoint("users/login"), {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data)
    })
    .then(res => {
      if (res.ok) {
        let token = res.json().token
        setToken(token)
        setLoggedIn(true)
      }
    })
  }
  return { user, loggedIn, token, createUser, loginUser }
}

