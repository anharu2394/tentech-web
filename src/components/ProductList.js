import React, { useEffect} from "react"
import { CurrentUser, TagList } from "../App"
import Tag from 'react-bulma-components/lib/components/tag'
import Image from 'react-bulma-components/lib/components/image'
import Card from 'react-bulma-components/lib/components/card'
import Content from 'react-bulma-components/lib/components/content'
import Media from 'react-bulma-components/lib/components/media'
import Heading from 'react-bulma-components/lib/components/heading'
import Columns from 'react-bulma-components/lib/components/columns'
import styled from 'styled-components'
import { Link } from "react-router-dom"
import { endpoint} from "../utils"

function StatusTag({status: status}) {
	switch (status) {
		case 'Completed':
			return 	<Tag color="success">完成</Tag>	
		case 'InProgress':
			return 	<Tag color="danger">開発中</Tag>	
		case 'New':
			return 	<Tag color="info">構想段階</Tag>	
	}

}

function onReactionClick(kind,product_id,token,products,setProducts) {
		if (token === "" || !token) {
			return
		}
    fetch(endpoint("/products/" + product_id + "/reaction/add"),{
      method: "POST",
      mode: "cors",
      headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-api-key": token
      },
      body: JSON.stringify({kind})
    })
    .then(r => {
			if (r.ok) {
				const new_products = products.map(p => {
					if (p.id === product_id) {
						p.reactions.push({kind})	
					}
					return p
				})	
				setProducts(new_products)
			}
		})
    .catch(e => console.log(e))
}
export function ProductList(props) {
  let currentUser = CurrentUser.useContainer()
  let TagListContainer = TagList.useContainer()
  console.log(props)
	let products
	if (props.limit) {
		products = props.products.slice(0,props.limit)
	}else {
		products = props.products
	}
  useEffect(() => {
		TagListContainer.fetchTags()
  },[])
  return (
    <Columns>
      {
        products.map(p => {
				const tagList = TagListContainer.tags.filter(t => p.tag_ids.find(i => i === t.id)) || []			
				return (
          <Columns.Column size={props.size || 6}>
              <StyledCard key={p.id} className="large">
            <Link to={"/" + p.user.username + "/products/" + p.uuid} >
								<Wrapper>
                <StyledCardImage src={p.img} />
								</Wrapper>
                <Card.Content>
										<Tag.Group>
											<StatusTag status={p.status} />
										</Tag.Group>
                    <Heading size={4}>{p.title}</Heading>
										<Tag.Group>
											{ tagList.map( t => <Tag>{t.name}</Tag>)}
										</Tag.Group>
                    <p>{p.simple}</p>
										<Link to={"/" + p.user.username}>
											<Media>
												<Media.Item renderAs="figure" position="left">
													<Image renderAs="p" size={32} alt="32x32" src={p.user.avatar} />
												</Media.Item>
												<Media.Item>
													<Content>
														<p className="has-text-dark">
															<strong>{p.user.nickname}</strong> <small>@{p.user.username}</small>
															<br/>
															{p.user.bio}
														</p> 
													</Content>
												</Media.Item>
											</Media>
										</Link>
                </Card.Content>
            </Link>
										<Tag.Group className="are-medium">
											<Tag color="primary" className="is-medium" onClick={() => onReactionClick("good",p.id,currentUser.token,props.products,props.setProducts)}>
												<i className="far fa-heart"></i>{p.reactions.filter(r => r.kind === "good").length}
											</Tag>
											<Tag color="primary" className="is-medium" onClick={() => onReactionClick("goodjob",p.id,currentUser.token,props.products,props.setProducts)}>
												<i className="far fa-thumbs-up"></i>{p.reactions.filter(r => r.kind === "goodjob").length}
											</Tag>
											<Tag color="primary" className="is-medium" onClick={() => onReactionClick("awesome",p.id,currentUser.token,props.products,props.setProducts)}>
													<i className="far fa-star"></i>{p.reactions.filter(r => r.kind === "awesome").length}
											</Tag>
										</Tag.Group>
              </StyledCard>
          </Columns.Column>
        )})
      } 
    </Columns>
  )
}

const StyledCard = styled(Card)`
  height:500px;
`
const Wrapper = styled.div`
  width:100%;
	text-align:center;
`
const StyledCardImage = styled.img`
  height:150px;
	idth:100%;
	object-fit: contain;
	margin:auto;
`
const Avatar = styled(Image)`
  padding: 3px;
`
