import React, { useEffect} from "react"
import { CurrentUser, UserPage } from "../App"
import { Box, Button, Image, Container, Columns, Heading, Level } from 'react-bulma-components'
import styled from 'styled-components'
import { ProductList } from "./ProductList"

export function User(props) {
  let currentUser = CurrentUser.useContainer()
  let userContainer = UserPage.useContainer()
  const { user, products } = userContainer
  console.log(user)
  const style = { textAlign: 'center'}
  useEffect(() => {
    userContainer.fetchUser(props.match.params.user)
      .then(u => {
        console.log(u)
        userContainer.fetchProductsByUser(u.id)
      })
  },[])
  return (
    <Container>
			<Columns>
				<Columns.Column size={4}>
          <Avatar src="/default_avater.png" />
          <Heading>{user.nickname}</Heading> 
          <Heading subtitle><small>@{user.username}</small></Heading>
          <p>よろしく</p>
        </Columns.Column>
				<Columns.Column>
          <Box style={{"marginTop": 10}}>
            <Level renderAs="nav">
              <Level.Item style={style}>
              <div>
                <Heading renderAs="p" heading>
                    Projects
                  </Heading>
                  <Heading renderAs="p">3,210</Heading>
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
