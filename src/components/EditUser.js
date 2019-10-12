import React, { useEffect} from "react"
import { CurrentUser, UserPage, PostAttach,TagList } from "../App"
import { EditUserForm } from "./EditUserForm"
import Container from 'react-bulma-components/lib/components/container'
import Columns from 'react-bulma-components/lib/components/columns'
import Heading from 'react-bulma-components/lib/components/heading'
import Section from 'react-bulma-components/lib/components/section'

export function EditUser(props) {
  let currentUser = CurrentUser.useContainer()
  let userContainer = UserPage.useContainer()
  const { user, products } = userContainer
  const isMypage = ( user.id === currentUser.user.id)
  useEffect(() => {
    userContainer.fetchUser(props.match.params.user)
      .then(u => {
        console.log(u)
        userContainer.fetchProductsByUser(u.id)
      })
      .catch(e => console.log(e))
  },[])
  if (isMypage) {
    return(
      <div>
        <Section>
          <Container>
            <Columns.Column size={4} offset={4}>
              <Heading className="has-text-grey">プロフィール</Heading>
              <PostAttach.Provider>
                <TagList.Provider>
                  <EditUserForm user={currentUser.user} editUser={currentUser.editUser}/>
                </TagList.Provider>
              </PostAttach.Provider>
            </Columns.Column>
          </Container>
        </Section>
      </div>
    )
  }else {
    return <div>Not found</div>
  }
}
