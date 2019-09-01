import React, { useState } from "react"
import { loginUser } from "../requests"
import { Container, Columns, Card, Tag, Media, Content, Image, Heading, Button, Hero, Section, Form } from 'react-bulma-components'

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
			<Form.Field>
				<Form.Label>メールアドレス</Form.Label>
				<Form.Input type="email" value={data.email} onChange={e => data.setEmail(e.target.value)} placeholder="Your Email"/> <br />
			</Form.Field>
			<Form.Field>
				<Form.Label>パスワード</Form.Label>
				<Form.Input type="password" value={data.password} onChange={e => data.setPassword(e.target.value)} placeholder="Your Password" /> <br />
			</Form.Field>
			<Form.Field>
      	<Button color="info" type="submit" fullwidth={true}>ログイン</Button>
			</Form.Field>
    </form>
  );
}
