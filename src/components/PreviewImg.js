import React, { useState, useEffect } from "react"
import { PostAttach } from "../App"
export function PreviewImg(props) {
  const { node } = props
  const { data } = node
  const { attributes } = props
  const PostAttachContainer = PostAttach.useContainer()
  const [url, setUrl] = useState(data.get("url")? data.get("url"): "")
  const [isUploaded, setIsUploaded] = useState(data.get("isUploaded")? true: false)
  useEffect(() => {
    const file = data.get('file')  
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = reader.result.replace(/^.*,/, '')
        const all = "abcdefghijklmnopqrstuvwxyz0123456789"
        let r = ""
        for(var i=0; i<20; i++){
          r += all[Math.floor(Math.random()*all.length)];
        }
        const data = {
          "key": r + "." + file.name.split(".")[1],
          "attachment": base64,
          "content_type": file.type 
        }
        if (!isUploaded) {
          PostAttachContainer.createAttachment(data,"").then(j => {
            setUrl(j.asset.url)
            const url = j.asset.url
            console.log(node.key)
            setIsUploaded(true)
           props.editor.replaceNodeByKey(props.node.key,{
              object: "block",
              type: 'image',
              isVoid: true,
              data: { file, url, isUploaded: true}
            })
          })
        }
      }
      reader.readAsDataURL(file)
    }
  },[])
  return(
    <img {...attributes} src={url} />
  )
}
