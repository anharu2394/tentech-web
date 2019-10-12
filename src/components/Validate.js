import React, { useEffect} from "react"
import { RegisterForm} from "./RegisterForm"
import { CurrentUser } from "../App"
import { Redirect } from "react-router-dom"
import Container from 'react-bulma-components/lib/components/container'
import Heading from 'react-bulma-components/lib/components/heading'
import Columns from 'react-bulma-components/lib/components/columns'
import { Link } from "react-router-dom"
import { endpoint} from "../utils"

export function Validate(props) {
  useEffect(()=> {
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
