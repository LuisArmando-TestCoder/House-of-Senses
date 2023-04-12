import React, { useEffect, useState } from "react"
import {
  GlobalWrapper,
  Canvas3D,
  Controls,
  WheelParallelogramMenu,
} from "../../strings"
import {
  faPenNib,
  faCode,
  faPaintBrush,
  faBook,
  faShapes,
  faMusic,
  faPerson,
  faLink
} from "@fortawesome/free-solid-svg-icons"

let isReallyMenuOpen = true

export default () => {
  const [isMenuOpen, setIsMenuOpen] = useState(isReallyMenuOpen)

  useEffect(() => {
    window.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "Escape" && isReallyMenuOpen) {
        switchMenu(setIsMenuOpen)()
      }
    })
  }, [])

  return (
    <>
      <Canvas3D id="home" scenes={["home", "gallery"]} />
      <Controls
        permanentKeys={{
          m: [switchMenu(setIsMenuOpen)],
        }}
      />
      <WheelParallelogramMenu
        itemsAmount={8}
        distance={110}
        width={140}
        height={85}
        offset={3}
        isMenuOpen={isMenuOpen}
        menu={[
          {
            icon: faPenNib,
            name: "Poems",
            action: () => {},
          },
          {
            icon: faPaintBrush,
            name: "Art",
            action: () => {},
          },
          {
            icon: faCode,
            name: "Shaders",
            action: () => {},
          },
          {
            icon: faShapes,
            name: "Scenes",
            action: () => {},
          },
          {
            icon: faBook,
            name: "Essays",
            action: () => {},
          },
          {
            icon: faMusic,
            name: "Songs",
            action: () => {},
          },
          {
            icon: faPerson,
            name: "Contact",
            action: () => {},
          },
          {
            icon: faLink,
            name: "Projects",
            action: () => {},
          },
        ]}
        onOptionSelected={switchMenu(setIsMenuOpen)}
      />
    </>
  )
}

function switchMenu(setIsMenuOpen) {
  return () => {
    // react bug: re-render initialized the state as the same instead of changing
    setIsMenuOpen(!isReallyMenuOpen)
    isReallyMenuOpen = !isReallyMenuOpen
  }
}
