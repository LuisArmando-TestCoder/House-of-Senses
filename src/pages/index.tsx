import React from "react"
import  * as Components from "../components"

export default () => {
  return (
    <Components.strings.GlobalWrapper title="Scenes | Home">
      <Components.atoms.InteractiveArtCanvas/>
    </Components.strings.GlobalWrapper>
  )
}
