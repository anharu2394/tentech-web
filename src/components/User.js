import React, { useEffect, useState} from "react"
import { CurrentUser, UserPage, TagList } from "../App"
import { Box, Button, Image, Notification, Container, Columns, Heading, Level, Section } from 'react-bulma-components'
import styled from 'styled-components'
import { ProductList } from "./ProductList"
import { ReactionList } from "./ReactionList"
import { Link } from "react-router-dom"
import { endpoint} from "../utils"

export function User(props) {
	function resendMail({	token}) {
		fetch(endpoint("/users/resend"), {
					mode: "cors",
					headers: {
						"x-api-key": token
					},
					method: "POST",	
		})
		.then(r => {
			if(r.ok) {
				setSended("success")
			}
			else{
				setSended("error")
			}
		})
		.catch(e => {
			setSended("error")
		})
	}
  let currentUser = CurrentUser.useContainer()
  let userContainer = UserPage.useContainer()
	let [currentTab, setCurrentTab] = useState("projects")
  let { user, products, reactions, setProducts } = userContainer
	let [ isError, setIsError ] = useState(false)
	let [ sended, setSended] = useState("")
  products = products.map(p => {
		p.user = user
    return p
  })
  const style = { textAlign: 'center'}
  const isMypage = ( user.id === currentUser.user.id)
  useEffect(() => {
    userContainer.fetchUser(props.match.params.user)
      .then(u => {
        console.log(u)
        userContainer.fetchProductsByUser(u.id)
        userContainer.fetchReactionsByUser(u.id)
      })
      .catch(e => setIsError(true))
  },[])
	useEffect(() => {
		setCurrentTab(props.location.hash.substring(1) || "projects")
	},[])
	useEffect(() => {
		window.location.hash = "#" + currentTab
	},
	[currentTab])
	if (isError === true) {
		return (
			<Container>
				<p>ユーザーが見つかりません</p>
			</Container>
		)
	}
  return (
    <Container>
			{ isMypage && !user.activated && sended === "" && <Notification color="warning">
				メール認証が済んでいません <Button onClick={() => resendMail(currentUser)}>認証メールを再送信</Button>
				</Notification>
			}
			{ sended === "success" && <Notification color="success">
				認証メールを再送信しました！{user.email}をチェックしてください
			</Notification>
			}
			{ sended === "error" && <Notification color="success">
				認証メールの送信に失敗しました。もう一度、再送信できます。
				<Button onClick={() => resendMail(currentUser)}>認証メールを再送信</Button>
			</Notification>
			}
			<Columns>
				<Columns.Column size={4}>
          <Section>
            <Avatar src={user.avatar ? user.avatar : "/default_avater.png"} />
            <Heading>{user.nickname}</Heading> 
            <Heading subtitle><small>@{user.username}</small></Heading>
            <p>{user.bio ? user.bio : "よろしく"}</p>
            { isMypage && <Link to={"/" + user.username + "/edit"}><Button fullwidth={true} color="dark">編集</Button></Link>}
          </Section>
        </Columns.Column>
				<Columns.Column>
          <Box style={{"marginTop": 10}}>
            <Level renderAs="nav">
              <Level.Item style={style} onClick={() => setCurrentTab("projects")}>
              <div>
                <Heading renderAs="p" heading>
                    Projects
                  </Heading>
                  <Heading renderAs="p">{products.length}</Heading>
                </div>
              </Level.Item>
              <Level.Item style={style} onClick={() => setCurrentTab("reactions")}>
              <div>
                <Heading renderAs="p" heading>
                    Reactions
                  </Heading>
                  <Heading renderAs="p">{reactions.length}</Heading>
                </div>
              </Level.Item>
            </Level>
          </Box>
					{ currentTab === "projects" &&
					<TagList.Provider>
						<Heading size={4}>
							プロジェクト一覧
						</Heading>
          	<ProductList products={products} setProducts={setProducts} />
					</TagList.Provider>
					}
					{ currentTab === "reactions" &&
						<div>
							<Heading size={4}>
							最近のもらったリアクション
							</Heading>
							<ReactionList reactions={reactions} />
						</div>
					}
        </Columns.Column>
      </Columns>
    </Container>
  )
}

const Avatar = styled(Image)`
  padding: 10px;
`
