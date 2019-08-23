import React, { useState } from "react"
import { createContainer } from "unstated-next"
import { render } from "react-dom"
import { endpoint} from "../utils"

export function useCurrentUser() {
  let [user, setUser] = useState({})
  let [loggedIn, setLoggedIn] = useState(false)
  let [token, setToken] = useState("")
  let reset = () => {
    setUser({})
    setLoggedIn(false)
    setToken("")
  }
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
    console.log(data)
    fetch(endpoint("/users/login"), {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data)
    })
    .catch(e => console.log(e.message))
    .then(res => {
      console.log(res)
      if (res.ok) {
        return res.json()
      }
      throw Error()
    })
    .then(json => {
      setToken(json.token)
      setUser(json.user)
      setLoggedIn(true)
      localStorage.setItem("token", json.token)
    })
  }
  let validUser = async () => {
    const token = localStorage.getItem('token')
    if (token === null || token === "") {
      reset()
    }
    fetch(endpoint("/users/validate"), {
        mode: "cors",
        headers: {
          "x-api-key": token
        },
    })
    .catch(e => {
      console.log(e)
      reset()
    })
    .then(res => {
      console.log(res)
      if (res.ok) {
        return res.json()
      }
      throw Error()
      reset()
    })
    .then(json => {
      setToken(token)
      setUser(json.user)
      setLoggedIn(true)
    })
  }
  return { user, loggedIn, token, createUser, loginUser, validUser}
}

