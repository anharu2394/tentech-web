import React, { useState, useEffect } from "react"
import { loginUser } from "../requests"
import { withRouter } from 'react-router-dom'
import useReactRouter from 'use-react-router'
import { Form, Button} from 'react-bulma-components'
import { Editor } from 'slate-react'
import { Value } from 'slate'

const initialValue = Value.fromJSON({
  document: {
  	nodes: [
    	{
				object: 'block',
				type: 'paragraph',
				nodes: [
					{
						object: 'text',
						text: 'A line of text in a paragraph.',
					},
				],
			},
  	],
	},
})

function useProductForm() {
  let [title, setTitle] = useState("")
  let [body, setBody] = useState(initialValue)
  let [duration, setDuration] = useState(0)
  let [img, setImg] = useState("")
  let [kind, setKind] = useState("")
  let [tags, setTags] = useState([])
  return {title, setTitle, body, setBody, duration, setDuration, img, setImg, kind, setKind, tags, setTags}
}


export const CreateProductForm = withRouter((props)  => {
  let data = useProductForm(initialValue)
  console.log(props)
  const { history, location, match } = useReactRouter()
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
			<Form.Field>
				<Form.Label>タイトル</Form.Label>
				<Form.Control>
					<Form.Input type="text" value={data.title} onChange={e => data.setTitle(e.target.value)} /> <br />
				</Form.Control>
      </Form.Field>
			<Form.Field>
				<Form.Control>
					<Form.Label>画像</Form.Label>
					<Form.Input type="text" value={data.img} onChange={e => data.setImg(e.target.value)} /> <br />
				</Form.Control>
      </Form.Field>
			<Form.Field>
				<Form.Control>
      <Form.Label>説明</Form.Label>
      <Editor value={data.body} onChange={v => data.setBody(v.value)} /> <br />
				</Form.Control>
      </Form.Field>
			<Form.Field>
				<Form.Control>
					<Form.Label>種類</Form.Label>
					<Form.Select value={data.kind} onChange={e => data.setKind(e.target.value)} >
						<option value="WebApp">Webアプリ</option>
						<option value="MobileApp">モバイルアプリ</option>
						<option value="DesktopApp">デスクトップアプリ</option>
						<option value="Package">ライブラリ・パッケージ</option>
						<option value="Others">その他</option>
					</Form.Select><br />
				</Form.Control>
      </Form.Field>
			<Form.Field>
				<Form.Control>
					<Form.Label>かかった時間</Form.Label>
					<Form.Input type="number" value={data.duration} onChange={e => data.setDuration(e.target.value)} /> <br />
				</Form.Control>
      </Form.Field>
			<Form.Field>
				<Form.Control>
      		<Button type="submit">投稿</Button>
				</Form.Control>
      </Form.Field>
    </form>
  );
})

