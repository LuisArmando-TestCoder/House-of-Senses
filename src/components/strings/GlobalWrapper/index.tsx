import React from "react"
import { Helmet } from "react-helmet"
import { RecoilRoot } from "recoil"
import RecoilOutside from "recoil-outside"
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fas } from '@fortawesome/free-solid-svg-icons'
// import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons'
// import { faHatCowboy } from '@fortawesome/pro-thin-svg-icons'
// import { faHatChef } from '@fortawesome/sharp-solid-svg-icons'
// import { faPlateUtensils } from '@fortawesome/sharp-regular-svg-icons'
// import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

// library.add(fas, faTwitter, faFontAwesome, faHatCowboy, faHatChef, faPlateUtensils)

import "./styles.scss"

export default ({ children, title, ...properties }) => {
  const HelmetWrapper = Helmet as React.ComponentType<{ title: string }>

  return (
    <RecoilRoot>
      <RecoilOutside />
      <HelmetWrapper title={title} />
      <main className="global-wrapper" {...properties}>{children}</main>
    </RecoilRoot>
  )
}
