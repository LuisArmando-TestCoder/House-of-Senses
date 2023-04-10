import React, { useEffect, useState } from "react"
import {
  GlobalWrapper,
  Canvas3D,
  Controls,
  WheelParallelogramMenu,
} from "../../strings"

let isReallyMenuOpen = true;

export default () => {
  const [isMenuOpen, setIsMenuOpen] = useState(isReallyMenuOpen)

  return (
    <GlobalWrapper title="Scenes | Home">
      <Canvas3D id="home" scenes={["home", "gallery"]} />
      <Controls
        permanentKeys={{
          m: [switchMenu(isMenuOpen, setIsMenuOpen)],
        }}
      />
      <WheelParallelogramMenu
        itemsAmount={8}
        distance={110}
        width={140}
        height={85}
        offset={3}
        isMenuOpen={isMenuOpen}
      />
    </GlobalWrapper>
  )
}

function switchMenu(isMenuOpen, setIsMenuOpen) {
  return () => {
	// react bug: re-render initialized the state as the same instead of changing
    setIsMenuOpen(!isReallyMenuOpen)
	isReallyMenuOpen = !isReallyMenuOpen;
  }
}
