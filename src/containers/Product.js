import React, { useState } from "react"
import { endpoint } from "../utils"

export function useProduct() {
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
  return {createProduct}
}
