import React from "react"
import { RegisterForm} from "./RegisterForm"
import { CurrentUser } from "../App"
import { Redirect } from "react-router-dom"
import Container from 'react-bulma-components/lib/components/container'
import Heading from 'react-bulma-components/lib/components/heading'
import Button from 'react-bulma-components/lib/components/button'
import Box from 'react-bulma-components/lib/components/box'
import Columns from 'react-bulma-components/lib/components/columns'
import { Link } from "react-router-dom"

export function Signin(props) {
  let currentUser = CurrentUser.useContainer()
	if (currentUser.loggedIn) {
	return <Redirect to="/home" />
	}
  return (
    <div>
			<Container className="has-text-centered">
				<Columns.Column size={4} offset={4}>
					<Box>
						<Heading>新規登録</Heading>
						<RegisterForm createUser={currentUser.createUser}/>
					</Box>
					<p>登録済みですか？</p>
					<Link to="/login"><Button size="medium">ログイン</Button></Link>
				</Columns.Column>
			</Container>
    </div>
  );
}
