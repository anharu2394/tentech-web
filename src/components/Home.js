import React, { useEffect} from "react"
import { Section, Hero, Container, Heading } from 'react-bulma-components'
import { CreateProductForm } from "./CreateProductForm";
import { Product, CurrentUser } from "../App"

export function Home(props) {
  let product = Product.useContainer()
  let user = CurrentUser.useContainer()
  return (
    <div>
      <Hero color="primary" size="medium">
        <Hero.Body>
          <Container>
            <Heading>あなたのプロジェクトを投稿しよう！</Heading>
            <Heading subtitle size={4}>
              Webアプリ、モバイルアプリ、ライブラリ、なんでも投稿OK
            </Heading>
            <Heading subtitle size={4}>
              どんなに小さいプロジェクトでも投稿するのが第一歩
            </Heading>
          </Container>
        </Hero.Body>
      </Hero>
			<Container>
      <CreateProductForm createProduct={product.createProduct} token={user.token} history={props.history} />
			</Container>
    </div>
  )
}
