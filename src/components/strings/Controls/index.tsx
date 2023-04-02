import React, { useEffect, useState } from "react"
import "./styles.scss"

export default ({
  className = "",
  oneTimeKeys = { w: [], a: [], s: [], d: [] },
  permanentKeys = {},
  canvasId = "",
}: {
  className?: string
  oneTimeKeys?: { [index: string]: Function[] }
  permanentKeys?: { [index: string]: Function[] }
  canvasId?: string
}) => {
  const [unusedOneTimeKeys, setUnusedOneTimeKeys] = useState(
    Object.keys(oneTimeKeys).map(key => key.toLowerCase())
  )
  const [unpressedPermanentKeys, setUnpressedPermanentKeys] = useState(
    Object.keys(permanentKeys).map(key => key.toLowerCase())
  )

  useEffect(() => {
    window.addEventListener("keydown", ({ key }) => {
      const canvas = canvasId
        ? document.getElementById(canvasId)
        : document.getElementsByTagName("canvas")[0]

      if (canvas !== document.activeElement) return

      setUnusedPressedOneTimeKeys({
        oneTimeKeys,
        unusedOneTimeKeys,
        setUnusedOneTimeKeys,
        key,
      })
      setUnusedPressedPermanentKeys({
        permanentKeys,
        unpressedPermanentKeys,
        setUnpressedPermanentKeys,
        key,
      })
    })
  }, [])

  return (
    <div className={`controls ${className}`}>
      <ul
        className={`controls__keys ${
          unusedOneTimeKeys.length === 0 && "controls__used"
        }`}
      >
        {Object.keys(oneTimeKeys).map(key => {
          return (
            <li
              className={`controls__key ${
                unusedOneTimeKeys.indexOf(key) === -1 && " controls__key--used"
              }`}
              key={key}
            >
              {key}
            </li>
          )
        })}
      </ul>
      <ul className="controls__keys">
        {Object.keys(permanentKeys).map(key => {
          return (
            <li
              className={`controls__key ${
                !unpressedPermanentKeys.includes(key) &&
                "controls__key--pressed"
              }`}
              key={key}
            >
              {key}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function setUnusedPressedPermanentKeys({
  permanentKeys,
  unpressedPermanentKeys,
  setUnpressedPermanentKeys,
  key,
}) {
  const availableKeys = Object.keys(permanentKeys)

  if (!availableKeys.includes(key)) return

  unpressedPermanentKeys.splice(unpressedPermanentKeys.indexOf(key), 1)
  setUnpressedPermanentKeys([...unpressedPermanentKeys])
  setTimeout(() => {
    if (unpressedPermanentKeys.includes(key)) return

    unpressedPermanentKeys.push(key)
    setUnpressedPermanentKeys([...unpressedPermanentKeys])
  }, 1e3)
  permanentKeys[key].forEach(element => element())
}

function setUnusedPressedOneTimeKeys({
  oneTimeKeys,
  unusedOneTimeKeys,
  setUnusedOneTimeKeys,
  key,
}) {
  const unusedKeyIndex = unusedOneTimeKeys.indexOf(key.toLowerCase())

  if (unusedKeyIndex === -1) return

  unusedOneTimeKeys.splice(unusedKeyIndex, 1)
  setUnusedOneTimeKeys([...unusedOneTimeKeys])
  oneTimeKeys[key].forEach(element => element())
}
