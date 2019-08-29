import React, { useEffect} from "react"
import { CurrentUser } from "../App"
import { Navbar, Button, Image, Card, Content, Media, Heading, Columns } from 'react-bulma-components'
import styled from 'styled-components'
import { Link } from "react-router-dom"

export function ProductList(props) {
  let currentUser = CurrentUser.useContainer()
  console.log(props)
  useEffect(() => {
  },[])
  return (
    <Columns>
      {
        props.products.map(p => (
          <Columns.Column size={6}>
            <Link to={"/a/products/" + p.uuid} >
              <StyledCard key={p.id} className="large">
								<Wrapper>
                <StyledCardImage src={p.img} />
								</Wrapper>
                <Card.Content>
                    <Heading>{p.title}</Heading>
                    <p>{p.simple}</p>
                    <Media>
                      <Media.Item renderAs="figure" position="left">
                        <Image renderAs="p" size={32} alt="32x32" src={p.avatar} />
                      </Media.Item>
                      <Media.Item>
                        <Content>
                          <p>
                            <strong>{p.nickname}</strong> <small>@{p.username}</small>
                            <br/>
                            {p.bio}
                          </p> 
                        </Content>
                      </Media.Item>
                    </Media>
                </Card.Content>
              </StyledCard>
            </Link>
          </Columns.Column>
        ))
      } 
    </Columns>
  )
}

const Avatar = styled(Image)`
  padding: 3px;
`
