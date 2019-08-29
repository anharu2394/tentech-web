import React, { useState } from "react"
import { endpoint } from "../utils"

export function useTagList() {
	let [ tags, setTags ] = useState([])
  let fetchTags = () => {
    return fetch(endpoint("/tags"),{
      mode: "cors",
    })
    .then(r => r.json())
    .then(j => {
			const got_tags = j.tags.map(t =>{
				t.value = t.name
				t.label = t.name
				return t
			})
			setTags(got_tags)
			})
    .catch(e => console.log(e))
  } 
  return { tags, setTags, fetchTags}
}
