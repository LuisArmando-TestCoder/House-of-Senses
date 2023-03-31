import React from "react"
import { GlobalWrapper, Canvas3D } from "../components/strings"

export default () => {
  return (
    <GlobalWrapper title='Scenes | Home'>
      <Canvas3D id="home" scenes={["home"]}/>
    </GlobalWrapper>
  )
}
