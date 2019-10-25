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
  let [errors, setErrors] = useState({username: null, nickname: null, email: null, password: null})
  let [oks, setOks] = useState({username: false, nickname: false, email: false, password: false})
  const handleInputChange = (event) => {
    event.persist();
    if (event.target.name === "accepted") {
      setInputs(inputs => ({...inputs, [event.target.name]: event.target.checked}))
    }
    else{
      setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}))
    }
  }
  const validate = (event) => {
    event.persist();
    switch (event.target.name) {
      case "nickname":
        if (!inputs.nickname) {
          setErrors({...errors, nickname: "ニックネームを入力してください"}) 
          setOks({...oks, nickname: false})
          break
        }
        if (inputs.nickname.length < 1 && inputs.nickname.length > 50) {
          setErrors({...errors, nickname: "文字数を1以上50以下にしてください"}) 
          setOks({...oks, nickname: false})
          break
        }
        setErrors({...errors, nickname: null})
        setOks({...oks, nickname: true})
        break
      case "password":
        if (!inputs.password) {
          setErrors({...errors, password: "パスワードを入力してください"}) 
          setOks({...oks, password: false})
          break
        }
        if (inputs.password.length < 8) {
          setErrors({...errors, password: "文字数を8以上にしてください"}) 
          setOks({...oks, password: false})
          break
        }
        setErrors({...errors, password: null})
        setOks({...oks, password: true})
        break
    }
  }
  return {handleInputChange, validate, inputs, setInputs, username, nickname, email, password, setUsername, setNickname, setEmail, setPassword, accepted, setAccepted, error, setError, errors, oks}
}

export function RegisterForm(props) {
  let {inputs, setError, error, errors, oks, handleInputChange, validate} = useRegisterForm()
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
        <Control>
				  <Input type="text" value={inputs.username} name="username" onChange={handleInputChange} required minlength="1" maxlength="15"/> <br />
        </Control>
				<p>※英数字のみ可能</p>
				<p>※1文字以上</p>
			</Field>
			<Field>
				<Label>ニックネーム</Label>
        <Control>
				  <Input type="text" value={inputs.nickname} name="nickname" color={errors.nickname ? "danger" : oks.nickname && "success"}onChange={handleInputChange} onBlur={validate} required minlength="1" maxlength="50"/> <br />
        </Control>
				<p>※1文字以上</p>
        { errors.nickname && <Help color="danger">{errors.nickname}</Help>}
			</Field>
			<Field>
				<Label>メールアドレス</Label>
        <Control>
				  <Input type="email" value={inputs.email} name="email" onChange={handleInputChange} onBlur={validate} required/> <br />
        </Control>
				<p>※1文字以上</p>
			</Field>
			<Field>
				<Label>パスワード</Label>
        <Control>
				  <Input type="password" value={inputs.password} name="password" color={errors.password ? "danger" : oks.password && "success"} onChange={handleInputChange} onBlur={validate} required minlength="8"/> <br />
        </Control>
				<p>※8文字以上</p>
        { errors.password && <Help color="danger">{errors.password}</Help>}
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
