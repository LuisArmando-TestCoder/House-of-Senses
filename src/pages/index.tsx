import React from "react"
import { GlobalWrapper, Canvas3D, Controls } from "../components/strings"

export default () => {
  return (
    <GlobalWrapper title='Scenes | Home'>
      <Canvas3D id="home" scenes={["home", "gallery"]}/>
      <Controls permanentKeys={{
        m: []
      }}/>
    </GlobalWrapper>
  )
}
