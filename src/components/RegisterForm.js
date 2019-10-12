import React, { useState } from "react"
import requests from "../requests"
import { Field, Label, Input, Checkbox }from 'react-bulma-components/lib/components/form'
import Notification from 'react-bulma-components/lib/components/notification'
import Button from 'react-bulma-components/lib/components/button'
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
			<Field>
				<Label>ユーザーネーム</Label>
				<Input type="text" value={data.username} onChange={e => data.setUsername(e.target.value)} /> <br />
				<p>※英数字のみ可能</p>
				<p>※1文字以上</p>
			</Field>
			<Field>
				<Label>ニックネーム</Label>
				<Input type="text" value={data.nickname} onChange={e => data.setNickname(e.target.value)} /> <br />
				<p>※1文字以上</p>
			</Field>
			<Field>
				<Label>メールアドレス</Label>
				<Input type="email" value={data.email} onChange={e => data.setEmail(e.target.value)} /> <br />
			</Field>
			<Field>
				<Label>パスワード</Label>
				<Input type="password" value={data.password} onChange={e => data.setPassword(e.target.value)} /> <br />
				<p>※8文字以上</p>
			</Field>
			<Field>
				<Checkbox checked={data.accepted} onChange={e => data.setAccepted(e.target.checked)}>利用規約に同意する。</Checkbox>
			</Field>
			<Field>
				<Button color="info" fullwidth={true} type="submit">登録</Button>
				<p>※登録後、認証メールが送信されます。メールに含まれているリンクをクリックしてメールを認証してください</p>
				<p>※ユーザーの作成に時間がかかることがあります</p>
			</Field>
    </form>
  );
}
