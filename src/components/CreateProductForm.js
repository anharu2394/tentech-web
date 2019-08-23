import React, { useState } from "react"
import { loginUser } from "../requests"
import { withRouter } from 'react-router-dom'
import useReactRouter from 'use-react-router'

function useProductForm() {
  let [title, setTitle] = useState("")
  let [body, setBody] = useState("")
  let [duration, setDuration] = useState(0)
  let [img, setImg] = useState("")
  let [kind, setKind] = useState("")
  let [tags, setTags] = useState([])
  return {title, setTitle, body, setBody, duration, setDuration, img, setImg, kind, setKind, tags, setTags}
}

export const CreateProductForm = withRouter((props)  => {
  let data = useProductForm()
  console.log(props)
  let req_data = {
    title: data.title,
    body: data.body,
    img: data.img,
    duration: Number(data.duration),
    kind: data.kind,
    tags: data.tags
  }
  return (
    <form onSubmit={e => {
      e.preventDefault()
      props.createProduct(req_data,props.token).then(r => {
        console.log(r)
        history.push("/a/products/" + r.product.uuid)      
      })
    }}>
      <label>タイトル</label>
      <input type="text" value={data.title} onChange={e => data.setTitle(e.target.value)} /> <br />
      <label>画像</label>
      <input type="text" value={data.img} onChange={e => data.setImg(e.target.value)} /> <br />
      <label>説明</label>
      <input type="text" value={data.body} onChange={e => data.setBody(e.target.value)} /> <br />
      <label>種類</label>
      <select value={data.kind} onChange={e => data.setKind(e.target.value)} >
        <option value="WebApp">Webアプリ</option>
        <option value="MobileApp">モバイルアプリ</option>
        <option value="DesktopApp">デスクトップアプリ</option>
        <option value="Package">ライブラリ・パッケージ</option>
        <option value="Others">その他</option>
      </select><br />
      <label>かかった時間</label>
      <input type="number" value={data.duration} onChange={e => data.setDuration(e.target.value)} /> <br />
      <button type="submit">投稿</button>
    </form>
  );
})

