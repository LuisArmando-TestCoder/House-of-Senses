import React, { LegacyRef, useEffect, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import "./styles.scss"

type ParallelogramsWheelMenuSetup = {
  itemsAmount: number
  distance: number
  width: number
  height: number
}

type Position = "static" | "relative" | "absolute" | "sticky" | "fixed"

interface Props extends ParallelogramsWheelMenuSetup {
  isMenuOpen: boolean
  offset?: number
  menu?: {
    icon: IconDefinition | null
    name: string
    action: Function
  }[]
  onOptionSelected?: Function
}

type ParallelogramMenuOption = {
  transform: string
  position: string
  top: string
  left: string
}

type EventListenerTrigger = (
  this: Window,
  ev: WindowEventMap[keyof WindowEventMap]
) => any

const ParallelogramsWheelMenu: React.FC<Props> = ({
  itemsAmount = 8,
  distance = 110,
  width = 140,
  height = 85,
  isMenuOpen,
  offset = 3,
  menu = [...new Array(8)].map((_, i) => ({
    icon: null,
    name: "",
    action: () => console.log(i),
  })),
  onOptionSelected = () => console.log("Option Selected"),
}: Props) => {
  const parallelogramWheelMenuOptionsRef = useRef()
  const { clipPath, pathData } = getParallelogramData(width, height)
  let menuIndex
  let isMouseDown

  const mousemove = (event: MouseEvent) => {
    const parallelograms = getParallelograms(parallelogramWheelMenuOptionsRef)

    if (!parallelograms) return

    parallelograms.forEach(parallelogram => {
      parallelogram.classList.remove("parallelogram--hover")
      parallelogram.style.transform = "scale(1)"
    })

    if (!isMenuOpen) return

    const { index, distanceToCenterOfScreen } = getParallelogramUtils({
      event,
      parallelograms,
      itemsAmount,
      offset,
    })
    parallelograms[index].classList.add("parallelogram--hover")
    parallelograms[index].style.transform = `scale(${
      1 + Math.log(distanceToCenterOfScreen) / 40
    })`

    // if (menuIndex === index) return

    // parallelograms[menuIndex]?.classList.remove("parallelogram--active")

    // menuIndex = index

    // if (isMouseDown) {
    //   parallelograms[menuIndex]?.classList.add("parallelogram--active")
    // }
  }

  const mousedown = (event: MouseEvent) => {
    isMouseDown = true

    if (!isMenuOpen) return

    const parallelograms = getParallelograms(parallelogramWheelMenuOptionsRef)

    const { index } = getParallelogramUtils({
      event,
      parallelograms,
      itemsAmount,
      offset,
    })

    if (!parallelograms) return

    parallelograms.forEach(parallelogram => {
      parallelogram.classList.remove("parallelogram--hover")
      parallelogram.style.transform = "scale(1)"
    })

    // parallelograms?.[menuIndex || index].classList.add("parallelogram--active")
  }

  const mouseup = (event: MouseEvent) => {
    isMouseDown = false

    if (!isMenuOpen) return

    const parallelograms = getParallelograms(parallelogramWheelMenuOptionsRef)

    // parallelograms?.forEach(parallelogram => {
    //   parallelogram.classList.remove("parallelogram--active")
    // })

    const { index } = getParallelogramUtils({
      event,
      parallelograms,
      itemsAmount,
      offset,
    })

    menu[menuIndex || index]?.action?.()
    onOptionSelected(menu[menuIndex || index])

    // parallelograms?.forEach(parallelogram => {
    //   parallelogram.classList.remove("parallelogram--active")
    // })
  }

  return (
    <div
      onMouseDown={
        (mousedown as unknown) as React.MouseEventHandler<HTMLDivElement>
      }
      onMouseUp={
        (mouseup as unknown) as React.MouseEventHandler<HTMLDivElement>
      }
      onMouseMove={
        (mousemove as unknown) as React.MouseEventHandler<HTMLDivElement>
      }
      tabIndex={0}
      className={`wheel-menu ${isMenuOpen || "wheel-menu--hide"}`}
      ref={
        (parallelogramWheelMenuOptionsRef as unknown) as
          | LegacyRef<HTMLDivElement>
          | undefined
      }
    >
      <div className="wheel-menu__position">
        {getParallelogramsWheelMenuOptions({
          itemsAmount,
          distance,
          width,
          height,
        }).map(({ transform, position, top, left }, index) => {
          return (
            <div
              key={index}
              style={{
                position: position as Position,
                top,
                left,
              }}
              className="parallelogram"
            >
              <span
                className="parallelogram__icon"
                style={{
                  top: `${Math.min(width, height) / 1.5}px`,
                  left: `${Math.min(width, height) / 2}px`,
                }}
              >
                <FontAwesomeIcon
                  icon={menu[index]?.icon as IconDefinition}
                  width={Math.min(width, height) / 2}
                  height={Math.min(width, height) / 2}
                />
              </span>
              <svg
                style={{
                  transform,
                  clipPath,
                }}
                width={width * 0.9}
                height={height}
              >
                <path
                  d={pathData}
                  stroke="white"
                  strokeWidth={1}
                  fill="transparent"
                ></path>
              </svg>
              {/* icon */}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function getParallelograms(
  parallelogramWheelMenuOptionsRef: React.MutableRefObject<undefined>
): HTMLElement[] | undefined {
  const parallelogramChildren = ((parallelogramWheelMenuOptionsRef.current as unknown) as HTMLElement)
    ?.children?.[0]?.children
  if (!parallelogramChildren) return

  const parallelograms = [...parallelogramChildren] as HTMLElement[]

  return parallelograms
}

function getParallelogramUtils({ event, parallelograms, itemsAmount, offset }) {
  const dx = event.clientX - window.innerWidth / 2
  const dy = event.clientY - window.innerHeight / 2
  const distanceToCenterOfScreen = Math.sqrt(dx * dx + dy * dy)
  let index = 0
  let deg = Math.atan2(dy, dx) + (5 / itemsAmount) * Math.PI

  while (deg < 0) deg += Math.PI * 2

  index = Math.floor(((deg / Math.PI) * itemsAmount) / 2) + 1
  index = (index + offset) % itemsAmount

  parallelograms[index].classList.add("parallelogram--hover")
  parallelograms[index].style.transform = `scale(${
    1 + Math.log(distanceToCenterOfScreen) / 40
  })`

  return {
    index,
    distanceToCenterOfScreen,
  }
}

function getParallelogramsWheelMenuOptions({
  itemsAmount,
  distance,
  width,
  height,
}: ParallelogramsWheelMenuSetup): ParallelogramMenuOption[] {
  const parallelogramMenuOptions: ParallelogramMenuOption[] = []

  for (let index = 0; index < itemsAmount; index++) {
    const parallelogramRatio = width / height

    parallelogramMenuOptions.push({
      transform: `rotate(${(index / itemsAmount) * 360}deg)`,
      position: "absolute",
      top: `${Math.floor(
        Math.sin(
          ((-index + (itemsAmount % 2) + (itemsAmount % 2 || itemsAmount / 4)) /
            itemsAmount) *
            Math.PI *
            2
        ) *
          distance *
          0.5 *
          parallelogramRatio
      )}px`,
      left: `${Math.floor(
        Math.cos(
          ((-index + (itemsAmount % 2) + (itemsAmount % 2 || itemsAmount / 4)) /
            itemsAmount) *
            Math.PI *
            2
        ) *
          -distance *
          0.5 *
          parallelogramRatio
      )}px`,
    })
  }

  return parallelogramMenuOptions
}

function getParallelogramData(size: number, height: number) {
  const x = size / 10 + 1,
    y = height / 10,
    curve = size * 0.05
  // Create SVG element
  const clipPath = "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)"

  // Define path data for parallelogram with rounded corners
  const pathData = `M${x + size * 0.2} ${y} A${curve} ${curve}, 0, 0, 1, ${
    x + curve + size * 0.2
  } ${y - height * 0.05} L${x + size * 0.45} ${
    y - height * 0.05
  } A${curve} ${curve}, 0, 0, 1, ${x + size * 0.5} ${y} L${x + size * 0.7} ${
    y + height * 0.8
  } A${curve} ${curve}, 0, 0, 1, ${x + size * 0.65} ${y + height * 0.85} L${
    x + curve
  } ${y + height * 0.85} A${curve} ${curve}, 0, 0, 1, ${x} ${
    y + height * 0.8
  } Z`

  return {
    clipPath,
    pathData,
  }
}

export default ParallelogramsWheelMenu
