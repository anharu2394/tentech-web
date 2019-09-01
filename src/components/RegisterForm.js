import React, { useState } from "react"
import requests from "../requests"
import { Container, Columns, Card, Tag, Media, Content, Image, Heading, Button, Hero, Section, Form, Notification} from 'react-bulma-components'

function useRegisterForm() {
  let [username, setUsername] = useState("")
  let [nickname, setNickname] = useState("")
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
	let [accepted, setAccepted] = useState(false)
  let [error, setError] = useState("")
  return {username, nickname, email, password, setUsername, setNickname, setEmail, setPassword, accepted, setAccepted, error, setError}
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
    <form onSubmit={e => {
        e.preventDefault()
				if (data.accepted) {
        	props.createUser(user).catch(() => data.setError("入力情報が条件を満たしていません"))
				} else {
					data.setError("利用規約に同意してください")
				}
    }
    }>
			{ !(data.error === "") && <Notification color="danger">{data.error}</Notification>}
			<Form.Field>
				<Form.Label>ユーザーネーム</Form.Label>
				<Form.Input type="text" value={data.username} onChange={e => data.setUsername(e.target.value)} /> <br />
				<p>※英数字のみ可能</p>
				<p>※1文字以上</p>
			</Form.Field>
			<Form.Field>
				<Form.Label>ニックネーム</Form.Label>
				<Form.Input type="text" value={data.nickname} onChange={e => data.setNickname(e.target.value)} /> <br />
				<p>※1文字以上</p>
			</Form.Field>
			<Form.Field>
				<Form.Label>メールアドレス</Form.Label>
				<Form.Input type="email" value={data.email} onChange={e => data.setEmail(e.target.value)} /> <br />
			</Form.Field>
			<Form.Field>
				<Form.Label>パスワード</Form.Label>
				<Form.Input type="password" value={data.password} onChange={e => data.setPassword(e.target.value)} /> <br />
				<p>※8文字以上</p>
			</Form.Field>
			<Form.Field>
				<Form.Checkbox checked={data.accepted} onChange={e => data.setAccepted(e.target.checked)}>利用規約に同意する。</Form.Checkbox>
			</Form.Field>
			<Form.Field>
				<Button color="info" fullwidth={true} type="submit">登録</Button>
				<p>※登録後、認証メールが送信されます。メールに含まれているリンクをクリックしてメールを認証してください</p>
				<p>※ユーザーの作成に時間がかかることがあります</p>
			</Form.Field>
    </form>
  );
}
