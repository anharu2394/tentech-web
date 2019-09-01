import React, { useEffect} from "react"
import { Navbar, Content, Container, Footer as BulmaFooter, Image, Columns } from 'react-bulma-components'

export function Footer() {
  return (
    <BulmaFooter>
			<Container>
				<Content style={{ textAlign: 'center' }}>
					<Columns.Column size={6} offset={3}>
						<Image src="/tentech.svg" />
					</Columns.Column>
					<p>
						<strong>Tentech</strong> by <a href="http://twitter.com/_anharu">Anharu</a>
					</p>
				</Content>
			</Container>
    </BulmaFooter>
  )
}
