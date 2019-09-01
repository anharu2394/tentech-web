import React, { useState, useEffect} from "react"
import { CurrentUser, Product as ProductContainer, TagList } from "../App"
import { Container, Columns, Card, Tag, Media, Content, Image, Heading, Button, Hero, Section } from 'react-bulma-components'
import styled from 'styled-components'
import useReactRouter from 'use-react-router'
import dompurify from 'dompurify'
import { Link } from "react-router-dom"

export function Product(props) {
  let currentUser = CurrentUser.useContainer()
  let productContainer = ProductContainer.useContainer()
  let TagListContainer = TagList.useContainer()
  let [notfound, setNotfound] = useState(false) 
	const { product, author, reactions } = productContainer
  const { history, location, match } = useReactRouter()
  const sanitizer = dompurify.sanitize
	const lang = TagListContainer.tags.filter( t => product.tags.find(i => i === t.id)).find(t => t.kind == "lang") || {}
	const fw = TagListContainer.tags.filter( t => product.tags.find(i => i === t.id)).find(t => t.kind == "fw") || {}
	console.log(product.tags)
	useEffect(() => {
		TagListContainer.fetchTags()
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
                <Section>
                  <Heading size={3}>{product.title}</Heading>
                  <Heading subtitle size={5}>
                    {product.simple}
                  </Heading>
                </Section>
							</Card.Header>
							<Card.Content>
								<Link to={"/" + author.username} >
									<Media>
										<Media.Item renderAs="figure" position="left">
											<Image renderAs="p" size={64} alt="64x64" src={author.avatar} />
										</Media.Item>
										<Media.Item>
											<Content>
												<p>
													<strong>{author.nickname}</strong> <small>@{author.username}</small>
													<br />
													{author.bio}
												</p>
											</Content>
										</Media.Item>
										{ currentUser.user.id == author.id ? (
										<Media.Item renderAs="figure" position="right">
											<Link to={location.pathname + "/edit"}><Button>編集する</Button></Link>
										</Media.Item>
										):null
										}
									</Media>
								</Link>
								<Content>
                  <div dangerouslySetInnerHTML={{ __html: sanitizer(product.body) }} />
								</Content>
							</Card.Content>
						</StyledCard>
        </Columns.Column>
				<Columns.Column>
					<StyledCard>
						<Card.Header>
							<Card.Header.Title>使用した言語</Card.Header.Title>
						</Card.Header>
						<Card.Content>
						{lang.name ||　"なし"}
						</Card.Content>
					</StyledCard>
					<StyledCard>
						<Card.Header>
							<Card.Header.Title>使用したフレームワーク</Card.Header.Title>
						</Card.Header>
						<Card.Content>
						{fw.name || "なし"}
						</Card.Content>
					</StyledCard>
					<StyledCard>
						<Card.Header>
							<Card.Header.Title>リアクション</Card.Header.Title>
						</Card.Header>
						<Card.Content>
							<p className="is-size-5"><i className="far fa-heart"></i>いいね {reactions.filter(r => r.kind == "good").length}</p>
							<p className="is-size-5"><i className="far fa-thumbs-up"></i>お疲れ様 {reactions.filter(r => r.kind == "goodjob").length}</p>
							<p className="is-size-5"><i className="far fa-star"></i>すごいね{reactions.filter(r => r.kind == "awesome").length}</p>
						</Card.Content>
					</StyledCard>
        </Columns.Column>
			</Columns>
		</Container>
  )
}

const StyledCard = styled(Card)`
	margin-top: 30px;
`
