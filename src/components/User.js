import React, { useEffect} from "react"
import { CurrentUser } from "../App"
import { Box, Button, Image, Container, Columns, Heading, Level } from 'react-bulma-components'
import styled from 'styled-components'

export function User() {
  let currentUser = CurrentUser.useContainer()
  const style = { textAlign: 'center'}
  useEffect(() => {
    currentUser.validUser()
  },[])
  return (
    <Container>
			<Columns>
				<Columns.Column size={4}>
          <Avatar src="/default_avater.png" />
          <Heading>anharu</Heading> 
          <Heading subtitle><small>@anharu</small></Heading>
        </Columns.Column>
				<Columns.Column>
          <Box style={{"margin-top": 10}}>
            <Level renderAs="nav">
              <Level.Item style={style}>
              <div>
                <Heading renderAs="p" heading>
                    Tweets
                  </Heading>
                  <Heading renderAs="p">3,210</Heading>
                </div>
              </Level.Item>
              <Level.Item style={style}>
              <div>
                <Heading renderAs="p" heading>
                    Likes
                  </Heading>
                  <Heading renderAs="p">321K</Heading>
                </div>
              </Level.Item>
            </Level>
          </Box>
        </Columns.Column>
      </Columns>
    </Container>
  )
}

const Avatar = styled(Image)`
  padding: 10px;
`
