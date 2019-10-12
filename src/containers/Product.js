import React, { useState } from "react"
import { endpoint } from "../utils"

export function useProduct() {
	let [ product, setProduct ] = useState({title:"", body:"",tags:[]})
	let [ reactions, setReactions ] = useState([])
	let [ editProduct, setEditProduct ] = useState({title:"", body:"",tags:[]})
	let [ author, setAuthor ] = useState({nickname:"",username:""})
  let createProduct = (product,token) => {
    const data = { product: product }
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
    const data = product
    return fetch(endpoint("/products/" + product.uuid),{
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
			j.product.tags = j.tag_ids
			setProduct(j.product)
			setAuthor(j.user)
			setReactions(j.reactions)
			return j
		})
  } 
	
	let fetchEditProduct = (uuid) => {
    return fetch(endpoint("/products/" + uuid),{
      mode: "cors",
    })
    .then(r => r.json())
		.then(j => {
			j.product.tags = j.tag_ids
			setEditProduct(j.product)
			return j
		})
  } 
  return {createProduct, recreateProduct, fetchProduct, fetchEditProduct, product, author, editProduct,reactions, setReactions}
}
