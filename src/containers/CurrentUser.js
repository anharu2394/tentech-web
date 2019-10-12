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
    localStorage.setItem("token", "")
  }
  let createUser = async (user) => {
    let data = { "user": user }
    return fetch(endpoint("/users"), {
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
			throw new Error(res)
    })
  } 
  let editUser = async (user, id) => {
    let data = { "user": user }
    fetch(endpoint("/users/" + id), {
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
      }
    })
  } 
  let loginUser = async (email, password) => {
    let data = { email, password }
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
      if (res.ok) {
        return res.json()
      }
      throw Error(res.statusText)
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
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      throw Error(res.statusText)
      reset()
    })
    .then(json => {
      setToken(token)
      setUser(json.user)
      setLoggedIn(true)
    })
    .catch(e => {
      reset()
    })
  }
  return { user, loggedIn, token, createUser, loginUser, validUser, editUser, reset}
}

