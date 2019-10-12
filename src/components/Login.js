import React from "react"
import { LoginForm} from "./LoginForm"
import { CurrentUser } from "../App"
import { Redirect } from "react-router-dom"
import Container from 'react-bulma-components/lib/components/container'
import Heading from 'react-bulma-components/lib/components/heading'
import Button from 'react-bulma-components/lib/components/button'
import Box from 'react-bulma-components/lib/components/box'
import Columns from 'react-bulma-components/lib/components/columns'
import { Link } from "react-router-dom"

export function Login(props) {
  let currentUser = CurrentUser.useContainer()
  console.log(currentUser)
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
