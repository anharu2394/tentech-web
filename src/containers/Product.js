import React, { useState } from "react"
import { endpoint } from "../utils"

export function useProduct() {
	let [ product, setProduct ] = useState({title:"", body:""})
	let [ editProduct, setEditProduct ] = useState({title:"", body:""})
	let [ author, setAuthor ] = useState({nickname:"",username:""})
  let createProduct = (product,token) => {
    const data = { "product": product }
    return fetch(endpoint("/products"),{
      method: "POST",
      mode: "cors",
      headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-api-key": token
      },
      body: JSON.stringify(data)
    })
    .then(r => r.json())
    .catch(e => console.log(e))
  } 
  let recreateProduct = (product,token) => {
    const data = { "product": product }
    return fetch(endpoint("/products"),{
      method: "PATCH",
      mode: "cors",
      headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-api-key": token
      },
      body: JSON.stringify(data)
    })
    .then(r => r.json())
    .catch(e => console.log(e))
  } 
	let fetchProduct = (uuid) => {
    return fetch(endpoint("/products/" + uuid),{
      mode: "cors",
    })
    .then(r => r.json())
		.then(j => {
			setProduct(j.product)
			setAuthor(j.user)
			return j
		})
  } 
	
	let fetchEditProduct = (uuid) => {
    return fetch(endpoint("/products/" + uuid),{
      mode: "cors",
    })
    .then(r => r.json())
		.then(j => {
			setEditProduct(j.product)
			return j
		})
  } 
  return {createProduct, recreateProduct, fetchProduct, fetchEditProduct, product, author, editProduct}
}
