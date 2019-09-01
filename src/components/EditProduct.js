import React, { useEffect} from "react"
import { Section, Hero, Container, Heading } from 'react-bulma-components'
import { CreateProductForm } from "./CreateProductForm";
import { Product, CurrentUser } from "../App"
import { PostAttach, TagList } from "../App"

export function EditProduct(props) {
  let product = Product.useContainer()
  let user = CurrentUser.useContainer()
  useEffect(() => {
    product.fetchEditProduct(props.match.params.uuid)
  },[])
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
      <PostAttach.Provider>
      <TagList.Provider>
        <CreateProductForm createProduct={product.recreateProduct} token={user.token} editProduct={product.editProduct} />
      </TagList.Provider>
      </PostAttach.Provider>
			</Container>
    </div>
  )
}
