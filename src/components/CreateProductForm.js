import React, { useState, useEffect } from "react"
import { loginUser } from "../requests"
import { withRouter } from 'react-router-dom'
import useReactRouter from 'use-react-router'
import { Form, Button, Card, Icon, Level, Content} from 'react-bulma-components'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import Html from 'slate-html-serializer'
import InsertImages from 'slate-drop-or-paste-images'
import { PreviewImg } from "./PreviewImg"
import { PostAttach, TagList } from "../App"
import ImageUploader from 'react-images-upload'
import Select from 'react-select'


const plugins = [
  InsertImages({
    extensions: ['png', 'jpg','jpeg','svg'],
    insertImage: (change, file) => {
      console.log(change)
      return change.insertBlock({
        type: 'image',
        isVoid: true,
        data: { file }
      })
    }
  })
]

const BLOCK_TAGS = {
  blockquote: 'block-quote',
  p: 'paragraph',
  pre: 'code',
  img: 'image',
}

// Add a dictionary of mark tags.
const MARK_TAGS = {
  em: 'italic',
  strong: 'bold',
  u: 'underlined',
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
            url: el.getAttribute("src")
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
          case "image": {
              console.log(obj)
            return (
              <img src={obj.data.get("url")} />
          )
    }
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
          case 'code':
            return <strong>{children}</strong>
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
  let [simple, setSimple] = useState("")
  let [kind, setKind] = useState("WebApp")
  let [status, setStatus] = useState("Completed")
  let [tags, setTags] = useState([])
  let [selectedLang, setSelectedLang] = useState({})
  let [selectedFrame, setSelectedFrame] = useState([])
  return {title, setTitle, body, setBody, duration, setDuration, img, setImg, kind, setKind, tags, setTags, status, setStatus, simple, setSimple, selectedLang, setSelectedLang, selectedFrame, setSelectedFrame}
}

export const CreateProductForm = withRouter((props)  => {
	let editor
  const PostAttachContainer = PostAttach.useContainer()
  const TagListContainer = TagList.useContainer()
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
      case "image": {
        return (
          <PostAttach.Provider>
            <PreviewImg {...props} editor={editor} />
          </PostAttach.Provider>
        )
    }

      default:
        return next()
    }
  }
  let data = useProductForm(initialValue)
  const { history, location, match } = useReactRouter()
    console.log(props)
  let req_data
  useEffect(()=> {
    TagListContainer.fetchTags()
    if ( props.editProduct) {
      const p = props.editProduct
      data.setTitle(p.title)
      data.setBody(html.deserialize(p.body))
      data.setSimple(p.simple)
      data.setImg(p.img)
      data.setDuration(p.duration)
      data.setKind(p.kind)
      data.setStatus(p.status)

    }
  },[props.editProduct])
	useEffect(() => {
		let tags_id = []
		const lang_id = data.selectedLang.id
		if (lang_id) {
			tags_id.push(lang_id)
		}
		const fw_id = data.selectedFrame.id
		if (fw_id) {
			tags_id.push(fw_id)
		}

		data.setTags(tags_id)	
	},[data.selectedLang, data.selectedFrame])
  req_data = {
    title: data.title,
    body: html.serialize(data.body),
    simple: data.simple,
    img: data.img,
    duration: Number(data.duration),
    kind: data.kind,
    status: data.status,
    tags: data.tags
  }
  
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
        data.setImg(j.asset.url)
        const url = j.asset.url
      })
    }

  }
  return (
    <form onSubmit={e => {
      e.preventDefault()
      if (props.editProduct) {
        req_data.uuid = props.editProduct.uuid
      }  
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
				<Form.Label>簡単な説明</Form.Label>
				<Form.Control>
					<Form.Input type="text" value={data.simple} onChange={e => data.setSimple(e.target.value)} /> <br />
				</Form.Control>
      </Form.Field>
			<Form.Field>
				<Form.Control>
					<Form.Label>画像</Form.Label>
					<Form.Input type="text" value={data.img} onChange={e => data.setImg(e.target.value)} /> <br />
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
                  onChange={v => { 
                    data.setBody(v.value)
                    console.log("ss")
                  }}
                  ref={e => editor=e} 
                  renderMark={renderMark}
                  renderBlock={renderBlock}
                  plugins={plugins}
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
					<Form.Label>ステータス</Form.Label>
          <Form.Radio onChange={e => data.setStatus(e.target.value)} checked={data.status === 'New'} value="New">
            構想段階
          </Form.Radio>
          <Form.Radio onChange={e => data.setStatus(e.target.value)} checked={data.status === 'InProgress'} value="InProgress">
            開発中
          </Form.Radio>
          <Form.Radio onChange={e => data.setStatus(e.target.value)} checked={data.status === 'Completed'} value="Completed">
            完成
          </Form.Radio>
        </Form.Control>
      </Form.Field>
      { data.status == "Completed" ? (
			<Form.Field>
				<Form.Control>
					<Form.Label>かかった時間</Form.Label>
					<Form.Input type="number" value={data.duration} onChange={e => data.setDuration(e.target.value)} /> <br />
				</Form.Control>
      </Form.Field>
      ):null
      }
			<Form.Field>
				<Form.Control>
					<Form.Label>使用した言語</Form.Label>
          <Select
        		value={data.selectedLang}
        		onChange={e => data.setSelectedLang(e)}
        		options={TagListContainer.tags.filter(t => t.kind == "lang")}
      		/>
				</Form.Control>
      </Form.Field>
			<Form.Field>
				<Form.Control>
					<Form.Label>使用したフレームワーク</Form.Label>
          <Select
        		value={data.selectedFrame}
        		onChange={e => data.setSelectedFrame(e)}
        		options={TagListContainer.tags.filter(t => t.kind == "fw")}
      		/>
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

