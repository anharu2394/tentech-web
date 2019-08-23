import React, { useState } from "react"
import requests from "../requests"

function useRegisterForm() {
  let [username, setUsername] = useState("")
  let [nickname, setNickname] = useState("")
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  return {username, nickname, email, password, setUsername, setNickname, setEmail, setPassword}
}

export function RegisterForm(props) {
  let data = useRegisterForm()
  let user = {
    username: data.username,
    nickname: data.nickname,
    email: data.email,
    password: data.password
  }
  console.log(props)
  return (
    <form onSubmit={() => props.createUser(user)}>
      <label>ユーザーネーム</label>
      <input type="text" value={data.username} onChange={e => data.setUsername(e.target.value)} /> <br />
      <label>ニックネーム</label>
      <input type="text" value={data.nickname} onChange={e => data.setNickname(e.target.value)} /> <br />
      <label>メールアドレス</label>
      <input type="email" value={data.email} onChange={e => data.setEmail(e.target.value)} /> <br />
      <label>パスワード</label>
      <input type="password" value={data.password} onChange={e => data.setPassword(e.target.value)} /> <br />
      <button type="submit">登録</button>
    </form>
  );
}
