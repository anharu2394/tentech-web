import React, { useEffect, useState} from "react"
import { CurrentUser } from "../App"
import { Navbar, Button, Image } from 'react-bulma-components'
import styled from 'styled-components'
import { Link } from "react-router-dom"

export function Header() {
  let currentUser = CurrentUser.useContainer()
	let [isActive, isSetActive] = useState(false)
  useEffect(() => {
    currentUser.validUser()
  },[])
  console.log(currentUser)
  return (
    <Navbar
			active={isActive}
    >
      <Navbar.Brand>
        <Navbar.Item>
          <Link to="/">
						<img src="/tentech.svg" />	
          </Link>
        </Navbar.Item>
			<Navbar.Burger
              active={isActive}
            onClick={() => isSetActive(!isActive)}
        />
      </Navbar.Brand>
      <Navbar.Menu active={isActive}>
        <Navbar.Container>
          <Navbar.Item >
						<Link to="/products">
							みんなの投稿
						</Link>
					</Navbar.Item>
        </Navbar.Container>
        { currentUser.loggedIn &&
          <Navbar.Container position="end">
            <Wrapper>
            <Link to={"/" + currentUser.user.username} >
              <Avatar src={currentUser.user.avatar || "/default_avater.png"}/>
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
