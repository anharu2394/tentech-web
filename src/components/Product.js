import React, { useEffect} from "react"
import { CurrentUser, Product as ProductContainer } from "../App"
import { Container } from 'react-bulma-components'

export function Product() {
  let currentUser = CurrentUser.useContainer()
  let product = ProductContainer.useContainer()
  return (
		<Container>
		</Container>
  )
}
