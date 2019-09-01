import React, { useEffect} from "react"
import { RegisterForm} from "./RegisterForm"
import { CurrentUser } from "../App"
import { Redirect } from "react-router-dom"
import { Container, Columns, Card, Tag, Media, Content, Image, Heading, Button, Hero, Section, Form, Box } from 'react-bulma-components'
import { Link } from "react-router-dom"
import { endpoint} from "../utils"

export function Validate(props) {
  useEffect(()=> {
    console.log(props.match.params.token)
    fetch(endpoint("/users/activate?token=" + props.match.params.token))
  },[])
  return (
    <div>
			<Container className="has-text-centered">
				<Columns.Column size={4} offset={4}>
						<Heading>メール認証しました</Heading>
				</Columns.Column>
			</Container>
    </div>
  );
}
