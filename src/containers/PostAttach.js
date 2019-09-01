import React, { useState } from "react"
import { endpoint } from "../utils"

export function usePostAttach() {
  const createAttachment = (attachment,token) => {
    const data = { "asset": attachment }
    console.log(data)
    return fetch(endpoint("/upload"),{
      method: "POST",
      mode: "cors",
      headers: {
          "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data)
    })
    .then(r => r.json())
    .catch(e => console.log(e))
  } 
  return {createAttachment}
}
