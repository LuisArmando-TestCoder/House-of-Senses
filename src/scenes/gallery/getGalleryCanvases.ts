import * as THREE from "three"
import { consulters } from "scene-preset"
import Image from "../../meshes/Image"
import Victor from "victor"
import { CanvasState } from "scene-preset/lib/types/state"
import { Scene, Scenes, SceneExport } from "scene-preset/lib/types/consulters"
import { RoomPosition, LaneType } from "./getPathPositions"

type LaneName =
  | "frontal0"
  | "frontal1"
  | "side-lane0"
  | "side-lane1"
  | "corner0"
  | "corner1"

export default function getCanvases({ pathPositions, pathSize, getImage, displacement }) {
  return {
    canvases: ({
      object: () =>
        consulters.getProceduralGroup([
          {
            // canvases
            dimensions: [pathPositions.length, 2],
            // corners, side-lanes and frontals have
            // ... always two spots in which an art work can be placed
            material: new THREE.MeshStandardMaterial({ color: "#fff" }),
            geometry: new THREE.BoxBufferGeometry(
              pathSize / 2,
              pathSize / 2,
              0.1
            ),
            getIntersectionMesh: async (
              [index, pair]: number[],
              object: THREE.Object3D
            ) => {
              if (index > 0 && index < pathPositions.length - 1) {
                const mesh = object as THREE.Mesh
                try {
                  const { mesh: image, aspectRatio } = await Image(
                    getImage(index, pair),
                    // `./images/pictures/img (${index * 2 + pair}).jpg`,
                    pathSize / 2
                  )

                  mesh.material = image.material
                  mesh.scale.x *= aspectRatio

                  const wrapper = new THREE.Group()

                  wrapper.add(mesh)
                  wrapper.name = "canvasWrapper"

                  const { x, z } = pathPositions[index]

                  wrapper.position.set(x * pathSize, 5, z * pathSize)

                  const canvasPosition = getCanvas(index, pair as 0 | 1)
                    .position

                  mesh.position.x += canvasPosition.x ?? 0
                  mesh.position.z += canvasPosition.z ?? 0

                  const canvasRotation = getCanvas(index, pair as 0 | 1)
                    .rotation

                  mesh.rotateY(canvasRotation)

                  return (wrapper as unknown) as THREE.Object3D<Event>
                } catch (error) {
                  console.error(error)
                }
              }
            },
          },
        ]),
      onAnimation: ({ object3D }: SceneExport, canvasState: CanvasState) => {
        object3D.children.forEach((wrapper, index) => {
          const {
            children: [mesh],
          } = wrapper
          const distanceToUser = getObject3DGroundDistance(
            wrapper,
            canvasState.camera
          )

          mesh.material.transparent = true
          mesh.material.opacity = Math.min(1, 1 / (distanceToUser / 10) ** 2)
        })
      },
    } as unknown) as Scene,
  }

  function getCanvas(index: number, pair: 0 | 1) {
    const laneType: LaneType = pathPositions[index].laneType
    const laneName = (laneType + pair) as LaneName

    return {
      rotation: getRotation(),
      position: getPosition(),
    }

    function getRotation(): number {
      const cornerRotation = getCanvasRealRotation(
        pathPositions,
        index,
        pair as 0 | 1
      )
      const laneRotations = {
        frontal0: -Math.PI / 2,
        frontal1: Math.PI / 2,
        "side-lane0": 0,
        "side-lane1": Math.PI,
        corner0: cornerRotation,
        corner1: cornerRotation,
      }

      return laneRotations[laneName]
    }

    function getPosition() {
      const cornerPosition = {
        x: getCornerPosition(index, "x", pair as 0 | 1),
        z: getCornerPosition(index, "z", pair as 0 | 1),
      }
      const isFrontal = laneName[0] === "f"
      const lanePosition = {
        [isFrontal ? "x" : "z"]: displacement * -Math.sign(pair - 0.5),
      }
      const lanePositions = {
        frontal0: lanePosition,
        frontal1: lanePosition,
        "side-lane0": lanePosition,
        "side-lane1": lanePosition,
        corner0: cornerPosition,
        corner1: cornerPosition,
      }

      return lanePositions[laneName]
    }

    function getCornerPosition(
      index: number,
      axis: "x" | "z",
      pair: 0 | 1
    ): number {
      const cornerPosition =
        (pathPositions[index][axis] -
          (pathPositions[index + Math.sign(pair - 0.5)]?.[axis] ??
            pathPositions[index][axis])) *
        displacement

      return cornerPosition
    }

    function getCanvasRealRotation(
      pathPositions: RoomPosition[],
      index: number,
      pair: 0 | 1
    ): number {
      return (
        Math.PI / (pair + 1) -
        (Math.PI / 2) * +(pathPositions[index - 1].laneType === "side-lane")
      )
    }
  }
}


function getObject3DGroundDistance(
    { position: { x: x1, z: z1 } },
    { position: { x: x2, z: z2 } }
  ) {
    var vec1 = new Victor(x1, z1)
    var vec2 = new Victor(x2, z2)
  
    return Math.abs(vec1.distance(vec2))
  }