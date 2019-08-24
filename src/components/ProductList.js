import React, { useEffect} from "react"
import { CurrentUser } from "../App"
import { Navbar, Button, Image, Card, Content, Media, Heading, Columns } from 'react-bulma-components'
import styled from 'styled-components'

export function ProductList(props) {
  let currentUser = CurrentUser.useContainer()
  console.log(props)
  useEffect(() => {
  },[])
  return (
    <Columns>
      {
        props.products.map(p => (
          <Columns.Column size={4}>
            <Card key={p.id}>
              <Card.Image size="4by3" src="http://bulma.io/images/placeholders/1280x960.png" />
              <Card.Content>
                <Content>
                  <Heading>{p.title}</Heading>
                </Content>
              </Card.Content>
            </Card>
          </Columns.Column>
        ))
      } 
    </Columns>
  )
}

const Avatar = styled(Image)`
  padding: 3px;
`
