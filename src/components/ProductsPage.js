import React, { useEffect} from "react"
import Heading from 'react-bulma-components/lib/components/heading'
import Section from 'react-bulma-components/lib/components/section'
import Container from 'react-bulma-components/lib/components/container'
import styled from 'styled-components'
import { Product, CurrentUser, PostAttach, TagList, ProductList as ProductListContainer } from "../App"
import { Link } from "react-router-dom"
import { ProductList } from "./ProductList"

export function ProductsPage(props) {
  let productListContainer = ProductListContainer.useContainer()
	useEffect(() => {
		productListContainer.fetchRecentProducts()
		productListContainer.fetchPopularProducts()
	},[])
  return (
    <div>
      <Section>
        <Container>
          <Heading>最近の投稿</Heading>
          <ProductList products={productListContainer.recentProducts} size={4} limit={27} setProducts={productListContainer.setRecentProducts}/>   
        </Container>
      </Section>
      <Section>
        <Container>
          <Heading>人気な投稿</Heading>
          <ProductList products={productListContainer.popularProducts} size={4} limit={27} setProducts={productListContainer.setPopularProducts} />   
        </Container>
      </Section>
    </div>
  )
}
