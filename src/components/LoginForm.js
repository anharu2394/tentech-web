import React, { useState } from "react"
import { loginUser } from "../requests"
import { Field, Label, Input }from 'react-bulma-components/lib/components/form'
import Button from 'react-bulma-components/lib/components/button'
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
			<Field>
				<Label>メールアドレス</Label>
				<Input type="email" value={data.email} onChange={e => data.setEmail(e.target.value)} placeholder="Your Email"/> <br />
			</Field>
			<Field>
				<Label>パスワード</Label>
				<Input type="password" value={data.password} onChange={e => data.setPassword(e.target.value)} placeholder="Your Password" /> <br />
			</Field>
			<Field>
      	<Button color="info" type="submit" fullwidth={true}>ログイン</Button>
			</Field>
    </form>
  );
}
