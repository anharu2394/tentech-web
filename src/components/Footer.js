import React, { useEffect} from "react"
import Content from 'react-bulma-components/lib/components/content'
import BulmaFooter from 'react-bulma-components/lib/components/footer'
import Container from 'react-bulma-components/lib/components/container'
import Image from 'react-bulma-components/lib/components/image'
import Columns from 'react-bulma-components/lib/components/columns'
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
