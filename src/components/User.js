import React, { useEffect} from "react"
import { CurrentUser, UserPage } from "../App"
import { Box, Button, Image, Container, Columns, Heading, Level, Section } from 'react-bulma-components'
import styled from 'styled-components'
import { ProductList } from "./ProductList"
import { Link } from "react-router-dom"

export function User(props) {
  let currentUser = CurrentUser.useContainer()
  let userContainer = UserPage.useContainer()
  let { user, products } = userContainer
  products = products.map(p => {
    p.username = user.username
    p.nickname = user.nickname
    p.bio = user.bio
    p.avatar = user.avatar
    return p
  })
  console.log(user)
  const style = { textAlign: 'center'}
  const isMypage = ( user.id === currentUser.user.id)
  useEffect(() => {
    userContainer.fetchUser(props.match.params.user)
      .then(u => {
        console.log(u)
        userContainer.fetchProductsByUser(u.id)
      })
      .catch(e => console.log(e))
  },[])
  return (
    <Container>
			<Columns>
				<Columns.Column size={4}>
          <Section>
            <Avatar src={user.avatar ? user.avatar : "/default_avater"} />
            <Heading>{user.nickname}</Heading> 
            <Heading subtitle><small>@{user.username}</small></Heading>
            <p>{user.bio ? user.bio : "よろしく"}</p>
            { isMypage && <Link to={"/" + user.username + "/edit"}><Button fullwidth={true} color="dark">編集</Button></Link>}
          </Section>
        </Columns.Column>
				<Columns.Column>
          <Box style={{"marginTop": 10}}>
            <Level renderAs="nav">
              <Level.Item style={style}>
              <div>
                <Heading renderAs="p" heading>
                    Projects
                  </Heading>
                  <Heading renderAs="p">{products.length}</Heading>
                </div>
              </Level.Item>
              <Level.Item style={style}>
              <div>
                <Heading renderAs="p" heading>
                    Reactions
                  </Heading>
                  <Heading renderAs="p">321K</Heading>
                </div>
              </Level.Item>
            </Level>
          </Box>
          <ProductList products={products} />
        </Columns.Column>
      </Columns>
    </Container>
  )
}

const Avatar = styled(Image)`
  padding: 10px;
`
