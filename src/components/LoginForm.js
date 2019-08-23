import React, { useState } from "react"
import { loginUser } from "../requests"

function useLoginForm() {
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [data, setData] = useState({})
  return {email, password, data, setEmail, setPassword, setData}
}

export function LoginForm(props) {
  let data = useLoginForm()
  console.log(props)
  return (
    <form onSubmit={e => {
      e.preventDefault()
      props.loginUser(data.email, data.password)
    }}>
      <label>メールアドレス</label>
      <input type="email" value={data.email} onChange={e => data.setEmail(e.target.value)} /> <br />
      <label>パスワード</label>
      <input type="password" value={data.password} onChange={e => data.setPassword(e.target.value)} /> <br />
      <button type="submit">登録</button>
    </form>
  );
}
