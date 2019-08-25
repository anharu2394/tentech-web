import React, { useState, useEffect} from "react"
import { CurrentUser, Product as ProductContainer } from "../App"
import { Container, Columns, Card, Media, Content, Image, Heading, Button } from 'react-bulma-components'
import styled from 'styled-components'
import useReactRouter from 'use-react-router'
import dompurify from 'dompurify'
import { Link } from "react-router-dom"

export function Product(props) {
  let currentUser = CurrentUser.useContainer()
  let productContainer = ProductContainer.useContainer()
  let [notfound, setNotfound] = useState(false) 
	const { product, author } = productContainer
  const { history, location, match } = useReactRouter()
	console.log(history)
  const sanitizer = dompurify.sanitize
	useEffect(() => {
		productContainer.fetchProduct(props.match.params.uuid)
			.then(j => {
				history.push("/" +j.user.username + "/products/" + props.match.params.uuid)
				})
			.catch(e => {
        console.log(e)
        setNotfound(true)
      })
	},[])
  if (notfound) {
    return(<div>Not Found</div>)
  }
  return (
		<Container>
			<Columns>
				<Columns.Column size={9}>
						<StyledCard>
							<Card.Header>
								<Card.Header.Title><Heading size={4}>{product.title}</Heading></Card.Header.Title>
							</Card.Header>
							<Card.Content>
								<Media>
									<Media.Item renderAs="figure" position="left">
										<Image renderAs="p" size={64} alt="64x64" src="http://bulma.io/images/placeholders/128x128.png" />
									</Media.Item>
									<Media.Item>
										<Content>
											<p>
												<strong>{author.nickname}</strong> <small>@{author.username}</small>
											</p>
										</Content>
									</Media.Item>
                  { currentUser.user.id == author.id ? (
									<Media.Item renderAs="figure" position="right">
                    <Link><Button>編集する</Button></Link>
									</Media.Item>
                  ):null
                  }
								</Media>
                <div dangerouslySetInnerHTML={{ __html: sanitizer(product.body) }} />
							</Card.Content>
						</StyledCard>
        </Columns.Column>
				<Columns.Column>
            <p className="bd-notification is-success">First Column</p>
        </Columns.Column>
			</Columns>
		</Container>
  )
}

const StyledCard = styled(Card)`
	margin-top: 30px;
`
