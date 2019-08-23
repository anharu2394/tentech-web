import React, { useState, useEffect } from "react"
import { loginUser } from "../requests"
import { withRouter } from 'react-router-dom'
import useReactRouter from 'use-react-router'
import { Form, Button, Card, Icon, Level, Content} from 'react-bulma-components'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import Html from 'slate-html-serializer'
const BLOCK_TAGS = {
  blockquote: 'quote',
  p: 'paragraph',
  pre: 'code',
}

// Add a dictionary of mark tags.
const MARK_TAGS = {
  em: 'italic',
  strong: 'bold',
  u: 'underline',
}

const rules = [
  {
    deserialize(el, next) {
      const type = BLOCK_TAGS[el.tagName.toLowerCase()]
      if (type) {
        return {
          object: 'block',
          type: type,
          data: {
            className: el.getAttribute('class'),
          },
          nodes: next(el.childNodes),
        }
      }
    },
    serialize(obj, children) {
      if (obj.object == 'block') {
        switch (obj.type) {
          case 'code':
            return (
              <pre>
                <code>{children}</code>
              </pre>
            )
          case 'paragraph':
            return <p className={obj.data.get('className')}>{children}</p>
          case 'block-quote':
            return <blockquote>{children}</blockquote>
          case 'heading-two':
            return <h2>{children}</h2>
          case 'numbered-list':
            return <ol>{children}</ol>
          case 'bulleted-list':
             return <ul>{children}</ul>
          case 'list-item':
            return <li>{children}</li>
        }
      }
    },
  },
  // Add a new rule that handles marks...
  {
    deserialize(el, next) {
      const type = MARK_TAGS[el.tagName.toLowerCase()]
      if (type) {
        return {
          object: 'mark',
          type: type,
          nodes: next(el.childNodes),
        }
      }
    },
    serialize(obj, children) {
      if (obj.object == 'mark') {
        switch (obj.type) {
          case 'bold':
            return <strong>{children}</strong>
          case 'italic':
            return <em>{children}</em>
          case 'underlined':
            return <u>{children}</u>
        }
      }
    },
  },
]
const html = new Html({ rules })

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
  const onBlockClick = (event, type) => {
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
  const renderBlock = (props, editor, next) => {
    const { attributes, children, node } = props

    switch (node.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>
      case 'list-item':
        return <li {...attributes}>{children}</li>
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>
      default:
        return next()
    }
  }
  let data = useProductForm(initialValue)
  console.log(props)
  const { history, location, match } = useReactRouter()
  let req_data = {
    title: data.title,
    body: html.serialize(data.body),
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
					<Card>
						<Card.Header>
							<Level>
								<Level.Item>
									<Button type="button" onMouseDown={e => onMarkClick(e,'bold')}>
                    <icon className="fas fa-bold" />
									</Button>
								</Level.Item>
								<Level.Item>
									<Button type="button" onMouseDown={e => onMarkClick(e,'italic')}>
                    <icon className="fas fa-italic" />
									</Button>
								</Level.Item>
								<Level.Item>
									<Button type="button" onMouseDown={e => onMarkClick(e,'underlined')}>
                    <icon className="fas fa-underline" />
									</Button>
								</Level.Item>
								<Level.Item>
									<Button type="button" onMouseDown={e => onBlockClick(e,'block-quote')}>
                    <icon className="fas fa-quote-right" />
									</Button>
								</Level.Item>
								<Level.Item>
									<Button type="button" onMouseDown={e => onBlockClick(e,'heading-two')}>
                    <icon className="fas fa-heading" />
									</Button>
								</Level.Item>
								<Level.Item>
									<Button type="button" onMouseDown={e => onBlockClick(e,'list-item')}>
                    <icon className="fas fa-list-ul" />
									</Button>
								</Level.Item>
								<Level.Item>
								</Level.Item>
							</Level>
						</Card.Header>
						<Card.Content>
              <Content>
                <Editor 
                  value={data.body}
                  onChange={v => data.setBody(v.value)}
                  ref={e => editor=e} 
                  renderMark={renderMark}
                  renderBlock={renderBlock}
                />
              </Content>
						</Card.Content>
					</Card>
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

