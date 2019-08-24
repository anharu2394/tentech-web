import React, { useEffect} from "react"
import { CurrentUser } from "../App"
import { Navbar, Button, Image } from 'react-bulma-components'
import styled from 'styled-components'

export function Header() {
  let currentUser = CurrentUser.useContainer()
  useEffect(() => {
    currentUser.validUser()
  },[])
  return (
    <Navbar
    >
      <Navbar.Brand>
        <Navbar.Item renderAs="a" href="#">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            alt="Bulma: a modern CSS framework based on Flexbox"
            width="112"
            height="28"
          />
        </Navbar.Item>
        <Navbar.Burger
        />
      </Navbar.Brand>
      <Navbar.Menu >
        <Navbar.Container>
          <Navbar.Item href="#">Second</Navbar.Item>
        </Navbar.Container>
        <Navbar.Container position="end">
          <Avatar size={64} src="/default_avater.png"/>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  )
}

const Avatar = styled(Image)`
  padding: 3px;
`
