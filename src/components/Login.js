import React from "react"
import { LoginForm} from "./LoginForm"
import { CurrentUser } from "../App"
import { Redirect } from "react-router-dom"
import { Container, Columns, Card, Tag, Media, Content, Image, Heading, Button, Hero, Section, Form, Box} from 'react-bulma-components'
import { Link } from "react-router-dom"

export function Login(props) {
  let currentUser = CurrentUser.useContainer()
  if (currentUser.loggedIn) {
    return <Redirect to="/home" />
  }
  return (
    <div>
			<Container className="has-text-centered">
				<Columns.Column size={4} offset={4}>
					<Box>
						<Heading className="has-text-gray">
							ログイン
						</Heading>
						<LoginForm loginUser={currentUser.loginUser}/>
					</Box>
					<p>アカウントを持っていませんか？</p>
					<Link to="/signup"><Button size="medium">登録</Button></Link>
				</Columns.Column>
			</Container>
    </div>
  )
}
