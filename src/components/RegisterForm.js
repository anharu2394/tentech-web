import React, { useState } from "react"

function useRegisterForm() {
  let [username, setUsername] = useState("")
  let [nickname, setNickname] = useState("")
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  return {username, nickname, email, password, setUsername, setNickname, setEmail, setPassword}
}

export function RegisterForm(props) {
  let data = useRegisterForm()
  return (
    <div>
      <label>ユーザーネーム</label>
      <input type="text" value={data.username} onChange={e => data.setUsername(e.target.value)} /> <br />
      <label>ニックネーム</label>
      <input type="text" value="A" /> <br />
      <label>メールアドレスa</label>
      <input type="email" value="A" /> <br />
      <label>パスワード</label>
      <input type="password" value="A" /> <br />

    </div>
  );
}
