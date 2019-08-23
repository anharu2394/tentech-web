import React, { useState } from "react"
import { endpoint } from "../utils"

export function useProduct() {
	let [ product, setProduct ] = useState({})
	let [ author, setAuthor ] = useState({})
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
	let fetchProduct = (uuid) => {
    return fetch(endpoint("/products/" + uuid),{
      mode: "cors",
    })
    .then(r => r.json())
		.then(j => {
			setProduct(j.product)
			setAuthor(j.author)
		})
    .catch(e => console.log(e))
  } 
	
  return {createProduct, fetchProduct, product, author}
}
