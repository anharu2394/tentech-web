import React, { useEffect} from "react"
import { Section, Hero, Container, Heading } from 'react-bulma-components'

export function Home() {
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
              どんなに小さいプロジェクトでもまずは投稿するのが第一歩
            </Heading>
          </Container>
        </Hero.Body>
      </Hero>
      This is Home!
    </div>
  )
}
