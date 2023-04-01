import * as THREE from "three"
import { consulters } from "scene-preset"
import getQuixelMaterial from "../../materials/getQuixelMaterial"
import { Scene } from "scene-preset/lib/types/consulters"
import PointLightSet from "../../meshes/PointLightSet"

export default function getGalleryPath(pathPositions, pathSize) {
  return {
    path: ({
      object: () =>
        consulters.getProceduralGroup([
          {
            // floor through the path
            dimensions: [pathPositions.length],
            material: getQuixelMaterial({
              multiplyScalar: pathSize,
              name: "Wood_Parquet",
              code: "uenndanl",
              mapNames: ["AO", "Displacement"],
            }),
            geometry: new THREE.BoxBufferGeometry(0.1, pathSize, pathSize),
            getIntersectionMesh: getFloorTable(0),
          },
          {
            // rectangular looking lights
            dimensions: [pathPositions.length],
            material: new THREE.MeshBasicMaterial({ color: "#fff" }),
            geometry: new THREE.BoxBufferGeometry(0.1, pathSize, pathSize),
            getIntersectionMesh: getFloorTable(10),
          },
          {
            // rectangular borders
            dimensions: [pathPositions.length],
            material: new THREE.MeshBasicMaterial({ color: "#fff" }),
            geometry: new THREE.BoxBufferGeometry(0.1, pathSize, pathSize),
            getIntersectionMesh: ([index], mesh) => {
              const meshObject: THREE.Mesh = getFloorTable(-0.01)([index], mesh)

              mesh.scale.set(1, 1.02, 1.02)

              return meshObject
            },
          },
        ]),
    } as unknown) as Scene,
    lights: ({
      object: () =>
        PointLightSet(
          pathPositions
            .filter(
              ({ laneType }, index) => laneType === "corner" || index % 10 === 0
            )
            .map(({ x, z }) => ({
              color: "#fff",
              position: new THREE.Vector3(
                x * pathSize,
                pathSize * 1.5,
                z * pathSize
              ),
              distance: pathSize * 2.5,
              intensity: 6,
              decay: 3,
            }))
        ),
    } as unknown) as Scene,
  }

  function getFloorTable(y: number) {
    return function ([index]: number[], mesh: THREE.Object3D) {
      mesh.position.set(
        pathPositions[index].x * pathSize,
        y,
        pathPositions[index].z * pathSize
      )

      mesh.rotateZ(Math.PI / 2)

      return mesh
    }
  }
}
