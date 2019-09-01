import React, { useState } from "react"
import { endpoint } from "../utils"

export function useProductList() {
  let [ recentProducts, setRecentProducts ] = useState([])
  let [ popularProducts, setPopularProducts ] = useState([])
  let fetchRecentProducts = () => {
		return fetch(endpoint("/products/recent"),{
						mode: "cors",
				})
    .then(r => r.json())
		.then(j => {
			setRecentProducts(j.products)
		})
    .catch(e => console.log(e))
  } 
  let fetchPopularProducts = () => {
		return fetch(endpoint("/products/popular"),{
						mode: "cors",
				})
    .then(r => r.json())
		.then(j => {
			setPopularProducts(j.products)
		})
    .catch(e => console.log(e))
  } 
	return { recentProducts,setRecentProducts, popularProducts, setPopularProducts,fetchRecentProducts, fetchPopularProducts}
}
