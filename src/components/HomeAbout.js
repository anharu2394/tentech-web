import React, { useEffect} from "react"
import Section from 'react-bulma-components/lib/components/section'
import Container from 'react-bulma-components/lib/components/container'
import Hero from 'react-bulma-components/lib/components/hero'
import Heading from 'react-bulma-components/lib/components/heading'
import Button from 'react-bulma-components/lib/components/button'
import Box from 'react-bulma-components/lib/components/box'
import Columns from 'react-bulma-components/lib/components/columns'
import { CreateProductForm } from "./CreateProductForm";
import { Product, CurrentUser, PostAttach, TagList, ProductList as ProductListContainer } from "../App"
import { Link } from "react-router-dom"
import { ProductList } from "./ProductList"

export function HomeAbout(props) {
  let product = Product.useContainer()
  let user = CurrentUser.useContainer()
  let productListContainer = ProductListContainer.useContainer()
	useEffect(() => {
		productListContainer.fetchRecentProducts()
	},[])
  return (
    <div>
      <Hero color="primary" size="medium">
        <Hero.Body>
          <Container>
            <Heading className="is-size-1-desktop">アウトプットはあなたの強み</Heading>
            <Heading subtitle size={5} className="is-size-4-desktop">
              アウトプットをして、あなたの学んだことを証明しましょう
            </Heading>
            <Heading subtitle size={6} className="is-size-4-desktop">
              コンソールアプリ、Webアプリ、モバイルアプリ。簡単なものから作ってみよう
            </Heading>
          </Container>
        </Hero.Body>
      </Hero>
      <Hero color="info">
        <Hero.Body>
          <Container>
          <Heading size={5} className="is-size-3-desktop">あなたのプロジェクトを投稿しよう！</Heading>
            <Heading subtitle size={6} className="is-size-4-desktop">
              Webアプリ、モバイルアプリ、ライブラリ、なんでも投稿OK
            </Heading>
            <Link to="/signup">
						  <Button size="large">登録する（無料）</Button>
					  </Link>
          </Container>
        </Hero.Body>
      </Hero>
      <Section className="has-text-centered">
        <Container>
          <Heading>作るものが見つからない？</Heading>
					<Heading subtitle>
						簡単な<strong>3つの質問</strong>であなたが作りやすいものを提案します
          </Heading>
					<Link to="/suggestion">
					  <Button size="large" color="info">答える</Button>
					</Link>
        </Container>
      </Section>
      <Hero color="primary" size="medium">
        <Hero.Body>
          <Container>
            <Heading>開発者のモチベーションを上げる3つのリアクション</Heading>
            <Heading subtitle size={4}>
							Tentechに投稿されたプロジェクトには3つのリアクションを付けられます
            </Heading>
            <Columns className="has-text-centered">
							<Columns.Column>
								<Box>
									<div style={{margin:20}}>
										<i className="far fa-heart is-size-1"></i>
									</div>
									<Heading size={5} className="has-text-dark">いいね！</Heading>
								</Box>
							</Columns.Column>
							<Columns.Column>
								<Box>
									<div style={{margin:20}}>
										<i className="far fa-thumbs-up is-size-1"></i>
									</div>
									<Heading size={5} className="has-text-dark">お疲れ様！</Heading>
								</Box>
							</Columns.Column>
							<Columns.Column>
								<Box>
									<div style={{margin:20}}>
										<i className="far fa-star is-size-1"></i>
									</div>
									<Heading size={5} className="has-text-dark">すごいね！</Heading>
								</Box>
							</Columns.Column>
            </Columns>
          </Container>
        </Hero.Body>
      </Hero>
			<Section>
				<Heading>最近の投稿</Heading>
				<ProductList products={productListContainer.recentProducts} size={4} limit={6} setProducts={productListContainer.setRecentProducts} />
				<div className="has-text-centered">
					<Link to="/products">
						<Button size="large" color="info">もっと投稿を見る</Button>
					</Link>
				</div>
			</Section>
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
      <Section className="has-text-centered">
        <Container>
          <Heading>今すぐに投稿しよう</Heading>
					<Heading subtitle>
						ユーザー登録をしたらすぐに投稿できます
          </Heading>
					<Link to="/signup">
						<Button size="large" color="info">登録</Button>
					</Link>
        </Container>
      </Section>
    </div>
  )
}
