import React, { useEffect} from "react"
import { CurrentUser } from "../App"

export function Header() {
  let currentUser = CurrentUser.useContainer()
  return (
    <div>
      This is Home!
    </div>
  )
}
