import React, { useEffect} from "react"
import { Icon, Notification,Tag, Navbar, Button, Image, Card, Content, Media, Heading, Columns } from 'react-bulma-components'
import styled from 'styled-components'
import { Link } from "react-router-dom"

export function ReactionList({ reactions }) {
	const date = epoch => {
		let d = new Date(0)
		d.setUTCSeconds(epoch)
		const diff = new Date() - d
   	const elapsed = new Date(diff);
		let m
		if (elapsed.getUTCFullYear() - 1970) {
      m = elapsed.getUTCFullYear() - 1970 + '年前';
    } else if (elapsed.getUTCMonth()) {
    	m = elapsed.getUTCMonth() + 'ヶ月前';
		} else if (elapsed.getUTCDate() - 1) {
			m = elapsed.getUTCDate() - 1 + '日前';
		} else if (elapsed.getUTCHours()) {
			m = elapsed.getUTCHours() + '時間前';
		} else if (elapsed.getUTCMinutes()) {
			m = elapsed.getUTCMinutes() + '分前';
		} else {
			m = elapsed.getUTCSeconds() + 'たった今';
		}
		return m
	}
  return <div>
      {
        reactions.map(r => 
          <Notification>
            <Media>
              <Media.Item renderAs="figure" position="left">
								<Image renderAs="p" size={64} alt="64x64" src={r.user.avatar} />
							</Media.Item>
							<Media.Item>
            		<strong>{r.user.nickname}</strong>が<strong>{r.product.title}</strong>にいいね！しました
							<small>{date(r.created_at.secs_since_epoch)}</small>
							</Media.Item>
              <Media.Item renderAs="figure" position="right">
								<Image renderAs="p" size={64} alt="64x64" src={r.product.img} />
							</Media.Item>
            </Media>
          </Notification>
        )
      }
    </div>
}
