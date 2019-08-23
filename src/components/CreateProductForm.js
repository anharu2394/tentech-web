import React, { useState, useEffect } from "react"
import { loginUser } from "../requests"
import { withRouter } from 'react-router-dom'
import useReactRouter from 'use-react-router'
import { Form, Button, Card, Icon, Level} from 'react-bulma-components'
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
	let editor
  const DEFAULT_NODE = 'paragraph'
	const onMarkClick = (e, type) => {
		e.preventDefault()
		editor.toggleMark(type)
	}
  const hasBlock = type => {
    return data.body.blocks.some(node => node.type === type)
  }
  const onClickBlock = (event, type) => {
    event.preventDefault()

    const { value } = editor
    const { document } = value

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = hasBlock(type)
      const isList = hasBlock('list-item')

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type)
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = hasBlock('list-item')
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type)
      })

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else if (isList) {
        editor
          .unwrapBlock(
            type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          )
          .wrapBlock(type)
      } else {
        editor.setBlocks('list-item').wrapBlock(type)
      }
    }
  }

	const renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props
      switch (mark.type) {
            case 'bold':
                return <strong {...attributes}>{children}</strong>
            case 'code':
                return <code {...attributes}>{children}</code>
            case 'italic':
                return <em {...attributes}>{children}</em>
            case 'underlined':
                return <u {...attributes}>{children}</u>
            default:
              return next()
      }
	}
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

