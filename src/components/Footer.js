import React, { useEffect} from "react"
import { Navbar, Content, Container, Footer as BulmaFooter } from 'react-bulma-components'

export function Footer() {
  return (
    <BulmaFooter>
			<Container>
				<Content style={{ textAlign: 'center' }}>
					<p>
						<strong>Tentech</strong> by <a href="http://twitter.com/_anharu">Anharu</a>
					</p>
				</Content>
			</Container>
    </BulmaFooter>
  )
}
