import { endpoint } from "./utils"

export const createUser = async (user) => {
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
      return loginUser(user.email, user.password) 
    }
  })
}

export const loginUser = async (email, password) => {
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
      return res.json()
    })
}
