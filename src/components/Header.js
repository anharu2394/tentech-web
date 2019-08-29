import React, { useEffect} from "react"
import { CurrentUser } from "../App"
import { Navbar, Button, Image } from 'react-bulma-components'
import styled from 'styled-components'
import { Link } from "react-router-dom"

export function Header() {
  let currentUser = CurrentUser.useContainer()
  useEffect(() => {
    currentUser.validUser()
  },[])
  console.log(currentUser)
  return (
    <Navbar
    >
      <Navbar.Brand>
        <Navbar.Item>
          <Link to="/">
            <img
              src="https://bulma.io/images/bulma-logo.png"
              alt="Bulma: a modern CSS framework based on Flexbox"
              width="112"
              height="28"
            />
          </Link>
        </Navbar.Item>
        <Navbar.Burger
        />
      </Navbar.Brand>
      <Navbar.Menu >
        <Navbar.Container>
          <Navbar.Item href="#">みんなの投稿</Navbar.Item>
        </Navbar.Container>
        { currentUser.loggedIn &&
          <Navbar.Container position="end">
            <Wrapper>
            <Link to={"/" + currentUser.user.username} >
              <Avatar src={currentUser.user.avatar}/>
            </Link>
            </Wrapper>
          </Navbar.Container>
        }
      </Navbar.Menu>
    </Navbar>
  )
}

const Wrapper = styled.div`
  height: 5rem;
`
const Avatar = styled.img`
  padding: 3px;
  display: block;
  max-width: 100%;

  max-height: 100%;
  border-radius: 290486px;
`
