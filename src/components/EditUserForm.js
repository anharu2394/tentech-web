import React, { useEffect, useState} from "react"
import { CurrentUser, UserPage } from "../App"
import { PostAttach } from "../App"
import { Field, Label, Input, Textarea, Control }from 'react-bulma-components/lib/components/form'
import Button from 'react-bulma-components/lib/components/button'
import ImageUploader from 'react-images-upload'
import useReactRouter from 'use-react-router'

function useProductForm(user) {
  let [nickname, setNickname] = useState(user.nickname)
  let [avatar, setAvatar] = useState(user.avatar)
  let [bio, setBio] = useState(user.bio ? user.bio : "よろしく!")
  let [password, setPassword] = useState(user.password)
  let [username, setUsername] = useState(user.username)
  let [email, setEmail] = useState(user.email)
  return {nickname, setNickname, avatar, setAvatar, bio, setBio, password, setPassword, username, setUsername, email, setEmail}
}

export function EditUserForm(props) {
  const { user } = props
  const data = useProductForm(user)
  const PostAttachContainer = PostAttach.useContainer()
  const { history, location, match } = useReactRouter()
  const onImageDrop = (f) => {
    const reader = new FileReader()
    f = f[0]
    reader.readAsDataURL(f)
    reader.onload = () => {
      const base64 = reader.result.replace(/^.*,/, '')
      const all = "abcdefghijklmnopqrstuvwxyz0123456789"
      let r = ""
      for(var i=0; i<20; i++){
        r += all[Math.floor(Math.random()*all.length)];
      }
      const post_data = {
        "key": r + "." + f.name.split(".")[1],
        "attachment": base64,
        "content_type": f.type 
      }
      PostAttachContainer.createAttachment(post_data,"").then(j => {
        data.setAvatar(j.asset.url)
        const url = j.asset.url
      })
    }

  }
  useEffect(() => {
  },[user])
  console.log(data)
  return(
      <div>
        <form onSubmit={e => {
          e.preventDefault()
          props.editUser(data, user.id).then(j => {
            history.push("/" + user.username)      
          })
        }}>
          <Field>
            <Label>
            ニックネーム
            </Label>
            <Control>
					    <Input type="text" value={data.nickname} onChange={e => data.setNickname(e.target.value)} /> <br />
    
            </Control>
          </Field>
          <Field>
            <Label>
            アイコン画像
            </Label>
            <Control>
					    <Input type="text" value={data.avatar} onChange={e => data.setAvatar(e.target.value)} /> <br />
          <ImageUploader
                  className="file"
                	withIcon={true}
                	withPreview={true}
                	buttonText='画像を選ぶ'
                  label="画面やロゴマークを登録してね"
                	onChange={onImageDrop}
                	imgExtension={['.jpg', '.gif', '.png', '.svg']}
                	maxFileSize={5242880}
            />
    
            </Control>
          </Field>
          <Field>
            <Label>
              自己紹介
            </Label>
            <Control>
					    <Textarea placeholder="自己紹介を書いてみよう" value={data.bio} onChange={e => data.setBio(e.target.value)} /> <br />
    
            </Control>
          </Field>
        <Field>
          <Control>
            <Button type="submit" fullwidth={true} color="info">更新</Button>
          </Control>
        </Field>
        </form>
      </div>
  )
}
