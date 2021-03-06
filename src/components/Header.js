import React, { useEffect, useState} from "react"
import { CurrentUser } from "../App"
import Navbar from 'react-bulma-components/lib/components/navbar'
import Button from 'react-bulma-components/lib/components/button'
import styled from 'styled-components'
import { Link } from "react-router-dom"

export function Header() {
  let currentUser = CurrentUser.useContainer()
	let [isActive, isSetActive] = useState(false)
  useEffect(() => {
    currentUser.validUser()
  },[])
  return (
    <Navbar
			active={isActive}
    >
      <Navbar.Brand>
        <Navbar.Item>
          <Link to="/">
						<Image src="/tentech.svg" />	
          </Link>
        </Navbar.Item>
        { currentUser.loggedIn ||
          <Navbar.Item>
            <Link to="/signup">
				  		<Button color="info" size="small">登録する</Button>
				  	</Link>
				  </Navbar.Item>
        }
			<Navbar.Burger
              active={isActive}
            onClick={() => isSetActive(!isActive)}
        />
      </Navbar.Brand>
      <Navbar.Menu active={isActive}>
        <Navbar.Container>
          <Navbar.Item>
						<Link to="/products">
							みんなの投稿
						</Link>
					</Navbar.Item>
          { currentUser.loggedIn &&
            <Navbar.Item >
              <Link to="/home">
                投稿する
              </Link>
            </Navbar.Item>
          }
          { currentUser.loggedIn ||
            <Navbar.Item >
              <Link to="/login">
                ログイン
              </Link>
            </Navbar.Item>
          }
        </Navbar.Container>
        { currentUser.loggedIn &&
          <Navbar.Container position="end">
            <Navbar.Item dropdown hoverable renderAs="div">
              <Wrapper>
                <Avatar src={currentUser.user.avatar || "/default_avater.png"}/>
              </Wrapper>
              <Navbar.Dropdown className="is-right">
                <Navbar.Item href="#">
                　<Link to={"/" + currentUser.user.username} >
                  マイページ
                  </Link>
                </Navbar.Item>
                <Navbar.Item href="/" onClick={() => currentUser.reset()}>
                  <Link>
                  　ログアウト
                  </Link>
                </Navbar.Item>
              </Navbar.Dropdown>
            </Navbar.Item>
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
  height: 80px;
  border-radius: 290486px;
`
const Image = styled.img`
  height: 35px;
`