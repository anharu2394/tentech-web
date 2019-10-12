import React, { useState } from "react"
import { createContainer } from "unstated-next"
import { render } from "react-dom"
import { endpoint} from "../utils"

const initialUser = {
  "activated": false,
  "activated_at": null,
  "email": "",
  "id": 0,
  "nickname": "",
  "username": ""
}
export function useUser() {
  let [user, setUser] = useState(initialUser)
  let [products, setProducts] = useState([])
	let [reactions, setReactions] = useState([])
  let reset = () => {
    setUser({})
  }
  let fetchUser = async (username) => {
    return fetch(endpoint("/users/" + username), {
        mode: "cors",
    }
    )
    .then(res => {
      if (res.ok) {
        return res.json()
      }
    })
    .then(j => {
      setUser(j.user)
      return j.user
    })
    .catch(e => console.log(e))
  } 
  let fetchProductsByUser = async (user_id) => {
    return fetch(endpoint("/users/" + user_id + "/products"), {
        mode: "cors",
    }
    )
    .then(res => {
      if (res.ok) {
        return res.json()
      }
    })
    .then(j => {
      setProducts(j.products) 
      return j.products
    })
  } 
  let fetchReactionsByUser = async (user_id) => {
    return fetch(endpoint("/users/" + user_id + "/reactions"), {
        mode: "cors",
    }
    )
    .then(res => {
      if (res.ok) {
        return res.json()
      }
    })
    .then(j => {
      setReactions(j.map(r => Object.assign(r[1],{user:r[2]}, {product:r[0]}))) 
    })
  } 
  return { user, fetchUser, fetchProductsByUser, fetchReactionsByUser,products, setProducts, reactions, setReactions}
}
