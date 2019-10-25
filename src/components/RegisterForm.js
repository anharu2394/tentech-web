import React, { useState } from "react"
import requests from "../requests"
import { Field, Label, Input, Checkbox, Control, Help }from 'react-bulma-components/lib/components/form'
import Notification from 'react-bulma-components/lib/components/notification'
import Button from 'react-bulma-components/lib/components/button'
function useRegisterForm() {
  let [inputs, setInputs] = useState({})
  let [username, setUsername] = useState("")
  let [nickname, setNickname] = useState("")
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [accepted, setAccepted] = useState(false)
  let [error, setError] = useState("")
  const handleInputChange = (event) => {
	event.persist();
	if (event.target.name === "accepted") {
		setInputs(inputs => ({...inputs, [event.target.name]: event.target.checked}))
	}
	else{
		setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}))
	}
  }
  return {handleInputChange, inputs, setInputs, username, nickname, email, password, setUsername, setNickname, setEmail, setPassword, accepted, setAccepted, error, setError}
}

export function RegisterForm(props) {
  let {inputs, setError, error, handleInputChange} = useRegisterForm()
  let user = {
    username: inputs.username,
    nickname: inputs.nickname,
    email: inputs.email,
    password: inputs.password
  }
  return (
    <form onSubmit={e => {
        e.preventDefault()
				if (inputs.accepted) {
        	props.createUser(user).catch(() => setError("入力情報が条件を満たしていません"))
				} else {
					setError("利用規約に同意してください")
				}
    }
    }>
			{ !(error === "") && <Notification color="danger">{error}</Notification>}
			<Field>
				<Label>ユーザーネーム</Label>
				<Input type="text" value={inputs.username} name="username" onChange={handleInputChange} /> <br />
				<p>※英数字のみ可能</p>
				<p>※1文字以上</p>
			</Field>
			<Field>
				<Label>ニックネーム</Label>
				<Input type="text" value={inputs.nickname} name="nickname" onChange={handleInputChange} /> <br />
				<p>※1文字以上</p>
			</Field>
			<Field>
				<Label>メールアドレス</Label>
				<Input type="email" value={inputs.email} name="email" onChange={handleInputChange} /> <br />
			</Field>
			<Field>
				<Label>パスワード</Label>
				<Input type="password" value={inputs.password} name="password" onChange={handleInputChange} /> <br />
				<p>※8文字以上</p>
			</Field>
			<Field>
				<Checkbox checked={inputs.accepted} name="accepted" onChange={handleInputChange}>利用規約に同意する。</Checkbox>
			</Field>
			<Field>
				<Button color="info" fullwidth={true} type="submit">登録</Button>
				<p>※登録後、認証メールが送信されます。メールに含まれているリンクをクリックしてメールを認証してください</p>
				<p>※ユーザーの作成に時間がかかることがあります</p>
			</Field>
    </form>
  );
}
