import React, { useEffect, useState } from "react"
import { RegisterForm} from "./RegisterForm"
import { CurrentUser } from "../App"
import { Redirect } from "react-router-dom"
import { Progress, Container, Columns, Card, Tag, Media, Content, Image, Heading, Button, Hero, Section, Form, Box } from 'react-bulma-components'
import { Link } from "react-router-dom"
import { endpoint} from "../utils"
import { ProductList } from "./ProductList"

export function Suggestion(props) {
  function next() {
    if (!(page === 2)) {
      setPage(page + 1)
    }
    else {
      setViewSug(true)
      fetch(endpoint("/suggestion"), {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data)
      })
      .then(r => {
        if (r.ok) {
          return r.json()
        }
      })
      .then(j => {
        setSug(j.suggestion)
      })
      .catch(e => console.log(e))
    }
    window.scrollTo(0,0)
  }
  let currentUser = CurrentUser.useContainer()
  let [page, setPage] = useState(0) 
  let [viewSug, setViewSug] = useState(false)
  let [data, setData] = useState({long:0, lang:"Python", kind:"WebApp"})
  let [long, setLong] = useState(0)
  let [lang, setLang] = useState("Python")
  let [kind, setKind] = useState("WebApp")
  let [sug, setSug] = useState({body:"",title:"",learning_url:[],working_url:[],producgs:[]})
  useEffect(() => {
    setData(Object.assign(data, {long}))
  },[long])
  useEffect(() => {
    setData(Object.assign(data, {lang}))
  },[lang])
  useEffect(() => {
    setData(Object.assign(data, {kind}))
  },[kind])
  const questions = [
    {
      "body": "あなたのプログラミング歴は？", 
      "comp": <Container className="is-size-5">
        <Box>
          <Form.Radio checked={long === 0} onChange={() => setLong(0)} value={0}>
            1年未満
          </Form.Radio>
        </Box>
        <Box>
          <Form.Radio checked={long === 1} onChange={() => setLong(1)} value={1}>
            1年以上2年未満
          </Form.Radio>
        </Box>
        <Box>
          <Form.Radio checked={long === 2} onChange={() => setLong(2)} value={2}>
            2年以上
          </Form.Radio>
        </Box>
      </Container>
    },
    {
      "body": "どのプログラミング言語を使ったことがある？" ,
      "comp": <Container className="is-size-5">
        <Box>
          <Form.Radio checked={lang === "Python"} onChange={() => setLang("Python")} value="Python">
            Python
          </Form.Radio>
        </Box>
        <Box>
          <Form.Radio checked={lang === "Ruby"} onChange={() => setLang("Ruby")} value="Ruby">
            Ruby
          </Form.Radio>
        </Box>
        <Box>
          <Form.Radio checked={lang === "Java"} onChange={() => setLang("Java")} value="Java">
            Java
          </Form.Radio>
        </Box>
        <Box>
          <Form.Radio checked={lang === "PHP"} onChange={() => setLang("PHP")} value="PHP">
            PHP
          </Form.Radio>
        </Box>
        <Box>
          <Form.Radio checked={lang === "JavaScript"} onChange={() => setLang("JavaScript")} value="JavaScript">
            JavaScript
          </Form.Radio>
        </Box>
        <Box>
          <Form.Radio checked={lang === "other"} onChange={() => setLang("other")} value="other">
            その他
          </Form.Radio>
        </Box>
        <Box>
          <Form.Radio checked={lang === "no"} onChange={() => setLang("no")} value="no">
            やったことがない
          </Form.Radio>
        </Box>
      </Container>
    },
    {
      "body": "興味のあるジャンルは？" ,
      "comp": <Container className="is-size-5">
        <Box>
          <Form.Radio checked={kind === "WebApp"} onChange={() => setKind("WebApp")} value={"WebApp"}>
            Webアプリ
          </Form.Radio>
        </Box>
        <Box>
          <Form.Radio checked={kind === "MobileApp"} onChange={() => setKind("MobileApp")} value={"MobileApp"}>
          モバイルアプリ
          </Form.Radio>
        </Box>
        <Box>
          <Form.Radio checked={kind === "other"} onChange={() => setKind("other")} value={"other"}>
            その他
          </Form.Radio>
        </Box>
      </Container>
    },
  ]
  return (
    <div>
      <Section>
        <Container className="has-text-centered">
          <Progress max={3} value={viewSug ? 3 : page} color="primary" size="large" />
          {viewSug ||
           <div>
          <Heading>{questions[page].body}</Heading>
          {questions[page].comp}
          <Button onClick={() => next()} size="large">次へ</Button>
          </div>
          }
        </Container>
      </Section>
      { viewSug &&
      <Section>
        <Container className="has-text-centered">
          <Heading>提案</Heading>
          <Heading size={4}>{sug.title}</Heading>
          <p>以下を見て、言語を学習することをおすすめします</p>
          { sug.learning_url.map(l => <p><a href={l}>{l}</a></p>)}
          <Box>
            <Heading size={6}>{sug.body}</Heading>
            { sug.working_url.map(l => <p><a href={l}>{l}</a></p>)}
          </Box>
        </Container>
      </Section>}
      { viewSug &&
        <Section>
          <Container>
          <Heading>関連した投稿</Heading>   
          <ProductList products={sug.products || []} />
          </Container>
        </Section>
      }
    </div>
  );
}
