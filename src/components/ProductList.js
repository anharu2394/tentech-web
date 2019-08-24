import React, { useEffect} from "react"
import { CurrentUser } from "../App"
import { Navbar, Button, Image } from 'react-bulma-components'
import styled from 'styled-components'

export function ProductList(props) {
  let currentUser = CurrentUser.useContainer()
  useEffect(() => {
  },[])
  return (
    <div>
      
    </div>
  )
}

const Avatar = styled(Image)`
  padding: 3px;
`
